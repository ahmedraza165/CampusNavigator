import { Disclosure } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { BellIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import React from "react";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
const Mobile = ({ navigation, user, userNavigation }: any) => {
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
    <Disclosure.Panel className="md:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        {navigation.map((item: any) => (
          <Disclosure.Button
            key={item.name}
            as="a"
            href={item.href}
            className={cn(
              item.current
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "block rounded-md px-3 py-2 text-base font-medium"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
      <div className="border-t border-gray-700 pb-3 pt-4">
        <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            <Avatar
              className="bg-black text-white"
              sx={{ width: 40, height: 40 }}
            >
              {getUserInitials()}
            </Avatar>
          </div>
          <div className="ml-3">
            <div className="text-base font-medium leading-none text-white">
              {user.name}
            </div>
            <div className="text-sm font-medium leading-none text-gray-400">
              {user.email}
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-1 px-2">
          {userNavigation.map((item: any) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              {item.icon}
              {item.name}
            </Disclosure.Button>
          ))}
          <Disclosure.Button
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/sign-in`,
              })
            }
            as="button"
            className=" flex items-center gap-2 w-full rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sing out</span>
          </Disclosure.Button>
        </div>
      </div>
    </Disclosure.Panel>
  );
};

export default Mobile;
