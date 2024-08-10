import {cn} from "@/lib/utils";
import {PenSquare, MoreHorizontal, Trash} from "lucide-react";
import ProfileDropdown from "@/components/DashboardLayout/ProfileDropdown";
import React from "react";
import {useState, useEffect, useRef} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";
import Chat from "@/app/(dashboard)/(chatbot)/chat/page";

const navigation = [
    {name: "Dashboard", href: "#", icon: HomeIcon, current: true},
    // {name: 'Team', href: '#', icon: UsersIcon, current: false},
    // {name: 'Projects', href: '#', icon: FolderIcon, current: false},
    // {name: 'Calendar', href: '#', icon: CalendarIcon, current: false},
    // {name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false},
    // {name: 'Reports', href: '#', icon: ChartPieIcon, current: false},
];

const SidebarItems = ({
                          onChatSelect,
                          handleNewChatProp,
                          fetchChats,
                          chats,
                          newChat, selectedChat
                      }: {
    onChatSelect: (chat: any) => void;
    handleNewChatProp: () => void;
    fetchChats: () => void;
    chats: any;
    newChat: any;
    selectedChat: any
}) => {
    const [editingChat, setEditingChat] = useState(null); // State to track the chat being edited
    const [newChatName, setNewChatName] = useState("");
    const inputRef: any = useRef<HTMLInputElement>(null);
    const [openPopOver, setOpenPopOver] = useState(null); // State to track
    const popoverRef: any = useRef(null);


    const handleChatSelect = (chat: any) => {
        onChatSelect(chat);
    };

    useEffect(() => {
        fetchChats();
    }, []);

    useEffect(() => {
        if (chats.length > 0) {
            handleChatSelect(newChat);
        }
    }, [newChat]);

    useEffect(() => {
        if (editingChat !== null && inputRef.current !== null) {
            inputRef.current.focus(); // Focus on the input field if it exists
        }
    }, [editingChat]);


    useEffect(() => {
        function handleClickOutside(event: any) {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setOpenPopOver(null);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popoverRef]);

    const handleDeleteChat = async (chatId: any) => {
        try {
            await axios.delete(`/api/chat/${chatId}`);
            toast.success("Chat deleted successfully!");
            fetchChats();
        } catch (error) {
            console.error("Error deleting chat:", error);
            toast.error("Error deleting chat");
        }
    };
    const handleDropdownToggle = (chat: any) => {
        console.log(chat)
        setNewChatName(chat.name);
        setOpenPopOver(openPopOver === chat?.id ? null : chat?.id);
    };


    const handleUpdateChat = (chat: any) => {
        setEditingChat(chat?.id);
        handleDropdownToggle(chat);
        inputRef.current.focus();

    };

 const handleRenameChat = async (chatId: any) => {
    try {
      if (!newChatName) {
        toast.error("Chat name cannot be empty");
        return;
      }
      await axios.put(`/api/chat/${chatId}`, { name: newChatName });
      toast.success("Chat name updated successfully!");
      setEditingChat(null); // Exit editing mode
      setNewChatName(""); // Clear the new chat name input
      fetchChats(); // Fetch updated chats
    } catch (error) {
      console.error("Error updating chat name:", error);
      toast.error("Error updating chat name");
    } 
  };
  
    const groupChatsByDate = () => {
        const groupedChats: { [key: string]: any[] } = {
            today: [],
            yesterday: [],
            past7Days: [],
            past30Days: [],
            lastYear: [],
        };

        const now = new Date();

        chats.forEach((chat: any) => {
            const createdAt = new Date(chat.createdAt);
            const diffTime = Math.abs(now.getTime() - createdAt.getTime());
            const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)); // Difference in hours

            if (diffHours <= 24) {
                groupedChats.today.push(chat);
            } else if (diffHours <= 48) {
                groupedChats.yesterday.push(chat);
            } else if (diffHours <= 24 * 7) {
                // Within the past 7 days (168 hours)
                groupedChats.past7Days.push(chat);
            } else if (diffHours <= 24 * 30) {
                // Within the past 30 days (720 hours)
                groupedChats.past30Days.push(chat);
            } else {
                groupedChats.lastYear.push(chat);
            }
        });

        return groupedChats;
    };

    const onBlur = (chat: any) => {
        if (newChatName !== chat?.name) {
            handleRenameChat(chat.id);

        }
        setEditingChat(null)
    }


    return (
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 h-full">


            <div className="-mx-2 space-y-1 mt-5">
                <a
                    href="#"
                    onClick={handleNewChatProp}
                    className="text-gray-400 hover:text-white hover:bg-gray-800 flex items-center justify-between gap-2 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                >
                    <span className="flex items-center gap-2">New Chat</span>
                    <PenSquare className="h-4 w-4"/>
                </a>
            </div>
            <div
                className="flex-grow overflow-y-auto bg-gray-900  pb-20 h-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
                style={{maxHeight: "calc(100vh - 100px)", width: "100%"}}
            >
                <ul className="flex flex-col gap-y-5 mt-3">
                    {Object.entries(groupChatsByDate()).map(([group, chats]) => {
                        if (chats.length === 0) return null; // If no chats in this group, skip rendering
                        let groupName = "";
                        switch (group) {
                            case "today":
                                groupName = "Today";
                                break;
                            case "yesterday":
                                groupName = "Yesterday";
                                break;
                            case "past7Days":
                                groupName = "Previous 7 Days";
                                break;
                            case "past30Days":
                                groupName = "Previous 30 Days";
                                break;
                            case "lastYear":
                                groupName = "Last Year";
                                break;
                            default:
                                groupName = group;
                        }
                        return (
                            <li key={group} className="text-white">
                                <h2 className="text-white mt-5 mb-3">{groupName}</h2>
                                {chats.reverse().map((chat: any) => (
                                    <div
                                        key={chat.id}
                                        className={`text-gray-400 cursor-pointer flex items-center justify-between px-4 py-2 gap-1 rounded-md relative mb-3 
                ${selectedChat?.id === chat.id
                                            ? "bg-gray-700"
                                            : "bg-gray-800 hover:bg-gray-700"
                                        }`}
                                        onClick={() => handleChatSelect(chat)}
                                    >
                                        {editingChat === chat.id ? (
                                            <input
                                                onBlur={() => onBlur(chat)}
                                                ref={inputRef}
                                                type="text"
                                                value={newChatName}
                                                onChange={(e) => setNewChatName(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleRenameChat(chat.id);
                                                    }
                                                }}
                                                className="text-white bg-transparent outline-none w-full rounded-sm outline-0 placeholder-gray-400
                                                 focus:border focus:border-gray-600"
                                                placeholder="Enter new chat name"
                                            />
                                        ) : (
                                            <span className="text-white line-clamp-1">
                                                {chat?.name}
                                                {/*{chat.name.split(" ").slice(0, 3).join(" ")} {chat.name.split(" ").length > 3 ? "..." : ""}*/}
                                            </span>
                                        )}
                                        <button onClick={() => handleDropdownToggle(chat)}>
                                            <MoreHorizontal className="h-5 w-5 text-gray-400 hover:text-white"/>
                                        </button>
                                        {openPopOver === chat?.id && (
                                            <div
                                                ref={popoverRef}
                                                className="absolute right-1 top-1 mt-8 w-40 bg-white rounded-md shadow-lg z-10">
                                                <ul className="py-1">
                                                    <li
                                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center justify-start text-black text border-l"
                                                        onClick={() => handleUpdateChat(chat)}
                                                    >
                                                        <PenSquare className="h-4 w-4 mr-2 text-black"/>
                                                        Rename
                                                    </li>
                                                    <li
                                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center justify-start text-red-600"
                                                        onClick={() => handleDeleteChat(chat.id)}
                                                    >
                                                        <Trash className="h-4 w-4 mr-2"/>
                                                        Delete
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <aside className="absolute bottom-0 left-0 right-0">
                <ProfileDropdown/>
            </aside>
        </div>
    );
};

export default SidebarItems;
