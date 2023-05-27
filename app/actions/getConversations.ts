import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
const getConversations = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return [];
  try {
    const conversation = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: { has: currentUser.id },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });
    return conversation;
  } catch (error: any) {
    return null;
  }
};
export default getConversations;
