import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { fullConversationType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (
  conversation: fullConversationType | { users: Array<User> }
) => {
  const session = useSession();
  const currentUserEmail = session.data?.user?.email;
  const otherUser = useMemo(() => {
    // TODO: check if want to use cloud message
    const otherUser = conversation.users
    // .filter(
    //   (user) => user.email !== currentUserEmail
    // );
    return otherUser;
  }, [currentUserEmail, conversation.users]);
  
  return otherUser[0];
};

export default useOtherUser;
