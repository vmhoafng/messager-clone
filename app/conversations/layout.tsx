import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import { fullConversationType } from "../types";
import { User } from "@prisma/client";
export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    //@ts-ignore
    <Sidebar>
      <div className="h-full">
        <ConversationList
          users={users as Array<User>}
          initialItems={conversations as Array<fullConversationType>}
        />
        {children}
      </div>
    </Sidebar>
  );
}
