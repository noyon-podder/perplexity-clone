"use client";

import Image from "next/image";
import React, { useState } from "react";

import {
  ArrowRight,
  Atom,
  AudioLines,
  Cpu,
  File,
  Globe,
  Mic,
  Paperclip,
  Search,
  SearchCheck,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { AIModelsOption, SourcesForSearchOptions } from "../../services/Shared";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { supabase } from "../../services/supabase";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";

function ChatInputBox() {
  const [userSearchInput, setUserSearchInput] = useState("");
  const [searchType, setSearchType] = useState("search");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const onSearchQuery = async () => {
    setLoading(true);
    const libId = uuidv4();
    const { data } = await supabase
      .from("Library")
      .insert([
        {
          searchInput: userSearchInput,
          userEmail: user?.primaryEmailAddress.emailAddress,
          type: searchType,
          libId: libId,
        },
      ])
      .select();
    setLoading(false);
    console.log("result", data[0]);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen  w-full">
      <Image src={"/logo.png"} alt="logo" width={260} height={250} />
      <div className="p-2 mt-10 w-full max-w-2xl border rounded-2xl ">
        <div className="flex items-end justify-between">
          <Tabs defaultValue="search" className="w-[400px]">
            <TabsContent value="search">
              <input
                type="text"
                onChange={(e) => setUserSearchInput(e.target.value, "search")}
                placeholder="Ask anything"
                className="w-full p-4 outline-none"
              />
            </TabsContent>
            <TabsContent value="research">
              <input
                type="text"
                onChange={(e) => setUserSearchInput(e.target.value, "research")}
                placeholder="Research anything"
                className="w-full p-4 outline-none"
              />
            </TabsContent>
            <TabsList>
              <TabsTrigger
                value="search"
                className={"text-primary cursor-pointer"}
                onClick={() => setSearchType("search")}
              >
                <SearchCheck />
                Search
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setSearchType("research")}
                className={"text-primary cursor-pointer"}
                value="research"
              >
                <Atom />
                Research
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-1 ">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className={"cursor-pointer"} variant={"ghost"}>
                  <Cpu className="text-gray-500 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={"md:w-[300px] w-[250px]"}>
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}
                {AIModelsOption.map((model) => (
                  <DropdownMenuItem key={model.id}>
                    <div className="mb-1">
                      <h2 className="text-sm">{model.name}</h2>
                      <p className="text-xs">{model.description}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className={"cursor-pointer"} variant={"ghost"}>
                  <Globe className="text-gray-500 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={"md:w-[300px] w-[250px]"}>
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}
                {SourcesForSearchOptions.map((search) => (
                  <DropdownMenuItem key={search.id}>
                    <div className="flex gap-2 items-start">
                      <search.icon className="mt-1" />
                      <div className="mb-1">
                        <h2 className="text-sm">{search.name}</h2>
                        <p className="text-xs">{search.description}</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className={"cursor-pointer"} variant={"ghost"}>
                  <Paperclip className="text-gray-500 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={"md:w-[300px] w-[250px]"}>
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}

                <DropdownMenuItem>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label
                      htmlFor="picture"
                      className="flex items-center gap-2"
                    >
                      <File />
                      Local Files
                    </Label>
                    <Input id="picture" type="file" className={"hidden"} />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className={"cursor-pointer"} variant={"ghost"}>
              <Mic className="text-gray-500 h-5 w-5" />
            </Button>

            <Button
              className={"cursor-pointer"}
              onClick={userSearchInput ? onSearchQuery : null}
              disabled={loading}
            >
              {!userSearchInput ? (
                <AudioLines className="text-white h-5 w-5" />
              ) : (
                <ArrowRight className="text-white h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInputBox;
