"use client";
import { fullConversationType } from "@/app/types";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";

interface ConversationItemProps {
  data: fullConversationType;
  selected?: boolean;
}
const ConversationItem: React.FC<ConversationItemProps> = ({
  data,
  selected,
}) => {
  return <div>ConversationItem</div>;
};

export default ConversationItem;
