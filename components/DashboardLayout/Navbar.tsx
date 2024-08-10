import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { LogOut, PenSquare } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

type PropsType = {
  setSidebarOpen: (open: boolean) => void;
  handleNewChatProp: () => void;
};

const Navbar = ({ setSidebarOpen, handleNewChatProp }: PropsType) => {
  return (
    <div
      className="fixed backdrop-blur-sm top-0 z-40 left-0 md:left-[16rem] right-0
             bg-white/90 flex flex-col md:flex-row items-center pb-2"
    >
      <div
        className={
          "flex md:hidden items-center justify-between w-full shadow  px-4 sm:px-6 lg:px-8 "
        }
      >
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex items-center justify-center flex-grow">
          <button
            onClick={handleNewChatProp}
            className={cn(
              "text-gray-400 flex items-center group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
            )}
          >
              <span className={"text-gray-700 text-md"}>New Chat</span>
              
          </button>
        </div>
        <PenSquare className={"h-4 w-4 ml-auto"} />{" "}
      </div>
      <div
        className={
          "flex items-center gap-x-4 sm:gap-x-6 w-full  px-4 sm:px-6 lg:px-8 py-2  mt-2"
        }
      >
        <div className="flex flex-1 gap-x-4 justify-between lg:gap-x-6">
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={"ghost"} type="button"
                                        className="-m-2.5 py-3 px-3 text-gray-900 font-semibold text-xl flex items-center gap-2">

                                    <span> ChatGPT 3.5  </span>
                                    <ChevronDown className={'w-4 h-4 text-gray-900'}/>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className=" bg-white border-0 p-1 w-44 border">

                                <DropdownMenuItem
                                    className={'hover:bg-gray-200 focus:bg-gray-200 focus:text-black  text-gray-900 group flex gap-x-3 p-2 w-full text-left rounded-sm text-sm leading-6 font-semibold'}>

                                        <span>
                                            GPT 3.5v
                                        </span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className={'bg-gray-300'}/>
                                <DropdownMenuItem
                                    className={'hover:bg-gray-200 focus:bg-gray-200 focus:text-black text-gray-900 group flex gap-x-3 p-2 w-full text-left rounded-sm text-sm leading-6 font-semibold'}>

                                        <span>
                                            GPT 4v
                                        </span>
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu> */}

            {/*profle dropdown*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
