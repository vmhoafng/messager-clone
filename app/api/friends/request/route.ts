// api/addFriend.js
import getCurrentUser from "@/app/actions/getCurrentUser";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
interface IParams {
  friendId: string;
  updateFriendsRequestSend: string[];
  updateFriendsRequest: string[];
}
const prisma = new PrismaClient();

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { updateFriendsRequestSend, updateFriendsRequest, friendId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // Check if the user and friend IDs exist in the database
    const friend = await prisma.user.findUnique({ where: { id: friendId } });

    if (!currentUser || !friend) {
      return new NextResponse("User or friend not found", { status: 404 });
    }

    // Update the user's friends list with the new friend
    await prisma.user.update({
      where: { id: friendId },
      data: {
        friendsRequest: {
          // Add the friend ID to the existing friends list
          push: currentUser.id,
        },
      },
    });
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        friendsRequestSend: {
          // Add the friend ID to the existing friends list
          push: friendId,
        },
      },
    });
    return new NextResponse("Friend added successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
