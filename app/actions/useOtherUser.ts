import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { fullConversationType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (
  conversation: fullConversationType | { users: Array<User> }
) => {
  const session = useSession();
  const currentUserEmail = session?.data?.user?.email;
  const otheUser = useMemo(() => {
    const otheUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );
    return otheUser;
  }, [currentUserEmail, conversation.users]);
  
  return otheUser;
};

export default useOtherUser;
