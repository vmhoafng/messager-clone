"use client";
import { User } from "@prisma/client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import Avatar from "@/app/components/Avatar";

interface UserItemProps {
  data: User;
}
const UserItem: React.FC<UserItemProps> = ({ data }) => {
  console.log(data);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);
  return (
    <div
      onClick={handleClick}
      className="
        w-full
        relative
        flex
        items-center
        space-x-3
        bg-white
        p-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer"
    >
      <Avatar user={data} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div
            className="
                flex
                justify-between
                items-center
                mb-1"
          >
            <span
              className="
                text-sm 
                font-medium 
                text-gray-900"
            >
              {data.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserItem;
