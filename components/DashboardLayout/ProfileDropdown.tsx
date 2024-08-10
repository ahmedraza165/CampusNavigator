"use client";

import * as React from "react";
import { Avatar } from "@mui/material";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const userNavigation = [
  {
    id : "1",
    name: "Your profile",
    href: "/settings",
    icon: <User className="mr-2 h-4 w-4" />,
  },
  {
    id : "2",
    name: "Settings",
    href: "/settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
];

const ProfileDropdown = () => {
  const { data: session }: any = useSession();

  const getUserInitials = () => {
    if (session?.user) {
      // Destructure firstName and lastName with fallback values
      const { firstName = '', lastName = '' } = session?.user;
      let initials = "";

      if (firstName) initials += firstName[0].toUpperCase();
      if (lastName) initials += lastName[0].toUpperCase();

      return initials;
  }

  return "";
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            "bg-gray-800 text-white group flex items-center gap-x-3 rounded-md p-2 w-full text-left  text-sm leading-6 font-semibold"
          }
        >
          <Avatar
            className="bg-black text-white"
            sx={{ width: 40, height: 40 , backgroundColor : "black"}}
          >
            {getUserInitials()}
          </Avatar>
          <span>
            {session?.user.firstName} {session?.user.lastName}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[208px]  bg-gray-800 border-0 p-1 ">
        {userNavigation.map((item: any) => (
          <>
            <DropdownMenuItem  key={item.id}>
              <a
                href={item.href}
                className={
                  "hover:bg-gray-700 focus:bg-gray-700 focus:text-white  text-white group flex gap-x-3 p-2 w-full text-left rounded-sm text-sm leading-6 font-semibold"
                  
                }
              >
                {item.icon}
                {item.name}
              </a>
            </DropdownMenuItem>
          </>
        ))}
        <DropdownMenuSeparator className={"bg-gray-500"} />
        <DropdownMenuItem
          onClick={() =>
            signOut({
              redirect: true,
              callbackUrl: `${window.location.origin}/sign-in`,
            })
          }
          className={
            "hover:bg-gray-700 focus:bg-gray-700 focus:text-white  text-white group flex gap-x-3 p-2 w-full text-left rounded-sm text-sm leading-6 font-semibold"
          }
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
