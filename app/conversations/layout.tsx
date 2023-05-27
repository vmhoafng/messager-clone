import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import getConversations from "../actions/getConversations";
import { fullConversationType } from "../types";
export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  return (
    //@ts-ignore
    <Sidebar>
      <div className="h-full">
        <ConversationList
          initialItems={conversations as Array<fullConversationType>}
        />
        {children}
      </div>
    </Sidebar>
  );
}
