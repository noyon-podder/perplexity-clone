"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Compass, Disc, Home, Library, LogIn } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const MenuOptions = [
  {
    title: "Home",
    icon: Home,
    path: "/",
  },
  {
    title: "Discover",
    icon: Compass,
    path: "/discover",
  },
  {
    title: "Library",
    icon: Library,
    path: "/library",
  },
  {
    title: "Sign In",
    icon: LogIn,
    path: "/sign-in",
  },
];

function AppSIdebar() {
  const path = usePathname();
  const { user } = useUser();
  return (
    <Sidebar>
      <SidebarHeader
        className={`bg-accent flex items-center justify-center py-5`}
      >
        <Image src={"/logo.png"} alt="Logo" width={180} height={100} />
      </SidebarHeader>
      <SidebarContent className={`bg-accent`}>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {MenuOptions.map((option, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className={`p-5 py-6 hover:bg-transparent hover:font-bold ${
                      path?.includes(option.path) && "font-bold"
                    }`}
                  >
                    <a href={option.path} className="">
                      <option.icon className="h-8 w-8" />
                      <span className="text-lg ">{option.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            {!user ? (
              <SignUpButton mode="modal">
                <Button className={`rounded-full mx-4`}>Sign Up</Button>
              </SignUpButton>
            ) : (
              <SignOutButton>
                <Button className={`rounded-full mx-4`}>Logout</Button>
              </SignOutButton>
            )}
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className={"bg-accent"}>
        <div className="p-3 flex flex-col">
          <h2 className="text-gray-500">Try Pro</h2>
          <p className="text-gray-400">
            Upgrade for image upload, smarter AI & more copilot
          </p>
          <Button variant={"secondary"} className={"text-gray-500 mb-3"}>
            Learn More
          </Button>
          <UserButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSIdebar;
