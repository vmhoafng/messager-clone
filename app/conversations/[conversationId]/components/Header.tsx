"use client";
import React, { useMemo } from "react";
import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
interface HeaderProps {
  conversation: Conversation & { users: Array<User> };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return conversation.users.length;
    }
    return "Active";
  }, [conversation]);
  return (
    <div
      className="
        bg-white
        w-full
        flex
        justify-between
        items-center
        border-b-[1px]
        sm:px-4
        py-3
        px-4
        lg:px-6
        shadow-sm"
    >
      <div className="flex gap-3 items-center">
        <Link
          className="
            lg:hidden
            block
            text-sky-500
            hover:text-sky-600
            transition
            cursor-pointer"
          href={"/conversations"}
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />
        <div
          className="
            flex
            flex-col"
        >
          <span
            className="
                font-semibold"
          >
            {conversation.name || otherUser.name}
          </span>
          <div
            className="
                text-sm
                font-light
                text-neutral-500
                "
          >
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className="
            text-sky-500
            hover:text-sky-600
            transition
            cursor-pointer"
      />
    </div>
  );
};
export default Header;
