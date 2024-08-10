import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import axios from "axios";

const { PYTHON_SERVER_URL } = process.env;
async function getMeaningfulTitle(text: any) {
  try {
    const API_KEY = "yhgbdgjkutrwdghtyu";
    const response = await axios.post(
      `${PYTHON_SERVER_URL}/get_title`,
      { text : text },
      {
        headers: {
          "api-key": API_KEY,
        },
      }
    );
    return response.data.title;
  } catch (error) {
    console.error("Error fetching meaningful title:", error);
    throw new Error("Error fetching meaningful title");
  }
}

export async function GET(req: NextRequest) {
  try {
    // Get the token from the request
    const token = await getToken({ req });
    // Check if the token exists and contains user information
    if (token) {
      // Extract user ID from the token
      const userId = token.id;

      console.log({userId});
      // Fetch chats associated with the user from the database
      let userChats = await db.chat.findMany({
        where: {
          user_id: userId,
        } as any,
      });
      for (let chat of userChats) {
        const messages = await db.message.findMany({
          where: {
            chat_id: chat.id,
          },
          orderBy: {
            createdAt: "asc",
          },
          take: 1, // Take only the first message
        });

        if (messages.length > 0 ) {
          const firstMessageText = messages[0].text;
          // Fetch meaningful title for the first message
          const title = await getMeaningfulTitle(firstMessageText);
          chat.name = title;
        } else {
          chat.name = chat.name; // If no messages, use chat name
        }
      }
      // Return the list of user's chats as a JSON response
      return NextResponse.json({ chats: userChats });
    } else {
      // Handle case where user is not authenticated
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    // Handle errors and return an appropriate response
    console.error("Error fetching user chats:", error);
    return NextResponse.json(
      { error: "Error fetching user chats" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = (await getToken({ req })) as { id: string } | null;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const name = "new chat";
    const newChat = await db.chat.create({
      data: {
        name,
        createdAt: new Date(), // Set the creation date to the current date and time
        updatedAt: new Date(), // Set the update date to the current date and time
        user: { connect: { id: token.id } }, // Connect the chat to the user who initiated the request
      },
    });

    return NextResponse.json({ chat: newChat }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { chatId: string } }
) {
  try {
    const chatId = params.chatId;
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if the chat exists
    const existingChat = await db.chat.findUnique({
      where: {
        id: String(chatId),
      },
    });

    if (!existingChat) {
      return NextResponse.json({ message: "Chat not found" }, { status: 404 });
    }

    // Delete the chat
    await db.chat.delete({
      where: {
        id: String(chatId),
      },
    });

    return NextResponse.json(
      { message: "Chat deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
