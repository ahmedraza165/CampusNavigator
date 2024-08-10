import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import { toast } from "react-toastify";

export async function GET(
  req: NextRequest,
  { params }: { params: { chatId: any } }
) {
  try {
    // Extract chatId from params
    const chatId = params.chatId;
    const pythonurl = process.env.PYTHON_SERVER_URL;
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if there are messages related to the provided chat ID
    const messages = await db.message.findMany({
      where: {
        chat_id: chatId,
      },
    });

    // If no messages are found, return null
    if (!messages || messages.length === 0) {
      return NextResponse.json({ messages: [] , pythonurl });
    }

    // Return the fetched messages as a JSON response
    return NextResponse.json({ messages , pythonurl });
  } catch (error: any) {
    // Handle other errors and return an appropriate response
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Error fetching messages" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { chatId: any } }
): Promise<void | NextResponse> {
  try {
    // Extract chatId from params
    const chatId = params.chatId;
    const API_KEY = 'yhgbdgjkutrwdghtyu';
    const body = await req.json();
    const { message, response } = body;

    const savedMessage = await db.message.create({
      data: {
        text: message,
        role: "user",
        chat: {
          connect: { id: params.chatId },
        },
      },
    });

    const savedChatbotResponse = await db.message.create({
      data: {
        text: response,
        role: "assistant",
        chat: {
          connect: { id: params.chatId },
        },
      },
    });

    return NextResponse.json({
      chatbotResponse: savedChatbotResponse.text,
    });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({
      error: "Error saving message",
    }, { status: 500 });
  }
}
