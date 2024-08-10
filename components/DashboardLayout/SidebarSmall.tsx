import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SidebarItems from "@/components/DashboardLayout/SidebarItems";

const SidebarSmall = ({
  sidebarOpen,
  setSidebarOpen,
  onChatSelect,
  handleNewChatProp,
  fetchChats,
  chats,
  newChat,
  selectedChat,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  onChatSelect: (chat: any) => void;
  handleNewChatProp: () => void;
  fetchChats: () => void;
  chats: any;
  newChat: any;
  selectedChat: any;
}) => {
  // Function to handle the selected chat from SidebarItems
  const handleChatSelect = (chat: any) => {
    if (chat) {
      setSidebarOpen(false);
      onChatSelect(chat);
    }
  };

  const handleNewChat = () => {
    // Call the function to handle creating a new chat
    handleNewChatProp();
    // Close the sidebar
    setSidebarOpen(false);
};

  // Function to handle the creation of a new chat

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="absolute inset-y-0 left-0 flex max-w-[288px] w-full bg-gray-900 shadow-xl">
            <div className="flex flex-col w-full h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold text-white">
                  PakistanLaw AI
                </h2>
                <button className="p-2" onClick={() => setSidebarOpen(false)}>
                  <XMarkIcon
                    className="h-6 w-6 text-gray-600"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto">
                <SidebarItems
                  selectedChat={selectedChat}
                  onChatSelect={handleChatSelect}
                  handleNewChatProp={handleNewChat}
                  fetchChats={fetchChats}
                  chats={chats}
                  newChat={newChat}
                />
              </div>
              <div className="flex items-center justify-center p-4">
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default SidebarSmall;
