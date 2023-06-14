"use client";
import React, { useState } from "react";
import { fullConversationType, fullMessageType } from "@/app/types";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";
import { format } from "date-fns";
import Image from "next/image";
import useOtherUser from "@/app/hooks/useOtherUser";
import ImageModal from "@/app/components/modals/ImageModal";
interface MessageItemProps {
  isLast?: boolean;
  data: fullMessageType;
  conversation: fullConversationType;
}

const MessageItem: React.FC<MessageItemProps> = ({
  isLast,
  data,
  conversation,
}) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const otheUser = useOtherUser(conversation);
  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");
  const container = clsx(
    `flex gap-3 py-2 px-4 items-end`,
    isOwn && "justify-end"
  );
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-0", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );
  return (
    <div className={container}>
      {!isOwn && (
        <div className={avatar}>
          <Avatar user={data.sender} />
        </div>
      )}
      <div className={body}>
        <div className="flex items-center gap-1">
          {!isOwn && (
            <div className="text-sm text-gray-500">{data.sender.name}</div>
          )}
          {/* <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-500">
            {format(new Date(data.createdAt), "p")}
          </div> */}
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              onClick={() => setImageModalOpen(true)}
              alt="image"
              src={data.image}
              height={288}
              width={288}
              className="
                object-cover
                cursor-pointer
                hover:scale-110
                transition
                translate"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          //   <div
          //     className="
          //         text-xs
          //         font-light
          //         text-gray-500"
          //   >{`Seen by:${seenList}`}</div>
          <div className="pt-1">
            <Avatar user={otheUser} small={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
