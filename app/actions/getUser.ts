import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";
const getUser = async () => {
  const session = await getSession();
  try {
    if (!session?.user?.email) return [];

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        // NOT: {
        //   email: session.user.email,
        // },
      },
    });

    if (!users) return null;

    return users;
  } catch (error: any) {
    return [];
  }
};
export default getUser;
