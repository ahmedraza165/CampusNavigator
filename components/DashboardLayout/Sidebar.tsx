import React, { Fragment, useState } from "react";
import SidebarItems from "@/components/DashboardLayout/SidebarItems";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";

const Sidebar = ({
  closeSidebar,
  setCloseSidebar,
  onChatSelect,
  handleNewChatProp,
  fetchChats,
  chats,
  newChat,
  selectedChat,
}: {
  closeSidebar: any;
  setCloseSidebar: (value: any) => void;
  onChatSelect: (chat: any) => void;
  handleNewChatProp: () => void;
  fetchChats: () => void;
  chats: any;
  newChat: any;
  selectedChat: any;
}) => {
  // Function to handle the selected chat from SidebarItems
  const handleChatSelect = (chat: any) => {
    onChatSelect(chat);
  };
  return (
    <div className={"relative"}>
      <div
        className={`hidden md:fixed md:inset-y-0 md:z-50 md:flex
           md:w-72 md:flex-col relative duration-200 ${
             closeSidebar ? "-translate-x-[250px]" : "translate-x-0"
           }`}
      >
        {/* DashboardLayout component, swap this element with another sidebar if you like */}

        <div className={`flex h-full w-full`}>
          <div className="absolute inset-y-0 left-0 flex max-w-[288px] w-full bg-gray-900 shadow-xl">
            <div className="flex flex-col w-full h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold text-white">
                 Campus Navigator
                </h2>
              </div>
              <div className={`flex-grow overflow-y-auto`}>
                <SidebarItems
                  onChatSelect={handleChatSelect}
                  handleNewChatProp={handleNewChatProp}
                  fetchChats={fetchChats}
                  chats={chats}
                  newChat={newChat}
                  selectedChat={selectedChat}
                />
              </div>
            </div>
          </div>
          {/*</Transition>*/}

          <div className={"flex items-center"}>
            <div>
              <div
                onClick={() => setCloseSidebar(!closeSidebar)}
                className="flex h-[72px] w-8 items-center justify-center group cursor-pointer"
              >
                <div className="">
                  {!closeSidebar && (
                    <div className="group-hover:hidden h-6 w-1 rounded-full bg-gray-200"></div>
                  )}
                  {!closeSidebar && (
                    <ChevronLeft
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Open sidebar"
                      className={`group-hover:block hidden w-9 h-9 text-gray-900`}
                    />
                  )}
                  <ChevronRight
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Close sidebar"
                    className={`${
                      closeSidebar ? "block" : "hidden"
                    } w-9 h-9 text-gray-900`}
                  />
                  <Tooltip id="my-tooltip" place={"right"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
