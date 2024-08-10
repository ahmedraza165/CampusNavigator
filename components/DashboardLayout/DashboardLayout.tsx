'use client'
import React, {Fragment, useState} from 'react'

import SidebarSmall from "@/components/DashboardLayout/SidebarSmall";
import Navbar from "@/components/DashboardLayout/Navbar";
import { toast } from 'react-toastify';
import axios from "axios";
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import("@/components/DashboardLayout/Sidebar"), {
    ssr: false
})

type PropsType =  {
    children: React.ReactNode,
    onChatSelect: (chat: any) => void,
    handleNewChatProp: () => void;
    fetchChats: () => void;
    chats: any
    newChat: any
    selectedChat: any
}

export default function DashboardLayout({ children, onChatSelect,handleNewChatProp,
    fetchChats,
    chats,
    newChat, selectedChat}:PropsType) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [closeSidebar, setCloseSidebar] = useState(false);

    // Function to handle the selected chat from Sidebar
    const handleChatSelect = (chat: any) => {
        onChatSelect(chat);
    };

    return (
        <>
            <SidebarSmall
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                onChatSelect={handleChatSelect}
                handleNewChatProp={handleNewChatProp}
                fetchChats={fetchChats}
                chats={chats}
                newChat={newChat}
                selectedChat={selectedChat}
            />

            {/*Static sidebar for desktop*/}
            <Sidebar
                closeSidebar={closeSidebar}
                setCloseSidebar={setCloseSidebar}
                onChatSelect={handleChatSelect}
                handleNewChatProp={handleNewChatProp}
                fetchChats={fetchChats}
                chats={chats}
                newChat={newChat}
                selectedChat={selectedChat}
            />

            <div className={`${closeSidebar ? '' : 'md:pl-72'} flex flex-col h-[100dvh]`}>
                <div className='flex-grow-0'>

                    <Navbar
                        handleNewChatProp={handleNewChatProp}
                        setSidebarOpen={setSidebarOpen}
                    />
                </div>
                <main className="py-5 bg-white grow">
                    {children}
                </main>
            </div>

        </>
    )
}