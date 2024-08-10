import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getToken } from 'next-auth/jwt';


export async function DELETE(req: NextRequest, { params }: { params: { chatId: string } }) {
    try {
        const chatId = params.chatId;
        const token = await getToken({ req });

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // Check if the chat exists
        const existingChat = await db.chat.findUnique({
            where: {
                id: chatId,
            },
        });

        if (!existingChat) {
            return NextResponse.json({ message: 'Chat not found' }, { status: 404 });
        }

        // Check if there are messages associated with the chat
        const existingMessages = await db.message.findMany({
            where: {
                chat_id: chatId,
            },
        });

        // Delete the messages first, if they exist
        if (existingMessages && existingMessages.length > 0) {
            await db.message.deleteMany({
                where: {
                    chat_id: chatId,
                },
            });
        }

        // Delete the chat
        await db.chat.delete({
            where: {
                id: chatId,
            },
        });

        return NextResponse.json({ message: 'Chat and associated messages deleted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { chatId: string } }) {
    try {
        const  {chatId}  = params;

        // Parse the request body to extract the name field
        const body = await req.json();

        // Check if the name field is present in the request body
        if (!body.name) {
            return NextResponse.json(
                {
                    message: "Name field is required in the request body",
                },
                { status: 400 }
            );
        }

        const { name } = body;

        // Check authentication token
        const token = await getToken({ req });
        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // Check if the chat exists
        const existingChat = await db.chat.findUnique({
            where: {
                id: String(chatId),
            },
        });

        if (!existingChat) {
            return NextResponse.json({ message: 'Chat not found' }, { status: 404 });
        }

        // Update the chat name
        await db.chat.update({
            where: {
                id: String(chatId),
            },
            data: {
                name: name,
            },
        });

        return NextResponse.json({ message: 'Chat name updated successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
