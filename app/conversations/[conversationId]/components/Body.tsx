"use client";
import useConversation from "@/app/hooks/useConversation";
import { fullConversationType, fullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
interface BodyProps {
  initialMessage: Array<fullMessageType>;
  conversation: fullConversationType;
}

const Body: React.FC<BodyProps> = ({ initialMessage, conversation }) => {
  const [messages, setMessages] = useState(initialMessage);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);
  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView;
    const messageHandler = (message: fullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) return current;
        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView;
    };
    const updateMessageHandler = (newMessage: fullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) return newMessage;
          return currentMessage;
        })
      );
    };
    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex flex-col flex-1 pt-4 ">
      {messages.map((message, i) => (
        <MessageItem
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
          conversation={conversation}
        />
      ))}
      <div ref={bottomRef} className="pt-5" />
    </div>
  );
};

export default Body;
