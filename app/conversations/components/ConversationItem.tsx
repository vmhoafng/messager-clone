"use client";
import { fullConversationType } from "@/app/types";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";

interface ConversationItemProps {
  data: fullConversationType;
  selected?: boolean;
}
const ConversationItem: React.FC<ConversationItemProps> = ({
  data,
  selected,
}) => {
  const session = useSession();
  const otheUser = useOtherUser(data);
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const message = data.messages || [];
    return message[message.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return (
      seenArray.filter((user) => {
        user.email === userEmail;
      }).length !== 0
    );
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "send an image";
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return "Start new conversation";
  }, [lastMessage]);
  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
        w-full
        relative
        p-3
        flex
        items-center
        space-x-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer`,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <Avatar user={otheUser} />
      <div>
        <div
          className="
              w-full
              flex
              justify-between
              items-center
              mb-1"
        >
          <p
            className="
              text-md
              font-medium
              text-gray-900"
          >
            {data.name || otheUser.name}
          </p>
          {lastMessage?.createdAt && (
            <p
              className="
                  text-xs
                  text-gray-400
                  font-light"
            >
              {format(new Date(lastMessage.createdAt), "p")}
            </p>
          )}
        </div>
        <p
          className={clsx(
            `
            truncate
            text-sm`,
            hasSeen ? "text-gray-500" : "text-black font-medium"
          )}
        >
          {lastMessageText}
        </p>
      </div>
    </div>
  );
};

export default ConversationItem;
