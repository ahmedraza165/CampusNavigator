import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { cn } from "@/lib/utils";
import { LogOut, Settings, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";

const Profile = ({ userNavigation, user }: any) => {
    const { data }: any = useSession();
    const userdata = data?.user;
    const getUserInitials = () => {
    if (userdata) {
        // Destructure firstName and lastName with fallback values
        const { firstName = '', lastName = '' } = userdata;
        let initials = "";

        if (firstName) initials += firstName[0].toUpperCase();
        if (lastName) initials += lastName[0].toUpperCase();

        return initials;
    }

    return "";
      };
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <Avatar
              className="bg-black text-white"
              sx={{ width: 40, height: 40 }}
            >
              {getUserInitials()}
            </Avatar>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item: any) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={cn(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700 flex items-center gap-2"
                  )}
                >
                  {item.icon}
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
          <Menu.Item>
            <button
              onClick={() =>
                signOut({
                  redirect: true,
                  callbackUrl: `${window.location.origin}/sign-in`,
                })
              }
              className={
                "flex items-center gap-2 w-full hover:bg-gray-100 px-4 py-2 text-sm text-gray-700"
              }
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Profile;
