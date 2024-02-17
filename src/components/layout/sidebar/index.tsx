"use client";
import React, { Suspense, useState } from "react";
import {
  Aside,
  AsideContent,
  AsideHeader,
  AsideTitle,
  AsideClose,
  AsideDescription,
  AsideFooter,
  AsideTrigger,
} from "@/components/ui/aside";

import { getNavItems } from "@/serverUtils/get-nav-Items";
import { cookies } from "next/headers";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`flex h-screen ${className}`}>
      <Aside
        name="test"
        onOpen={() => setIsSidebarOpen(!isSidebarOpen)}
        initialOpen={isSidebarOpen}
      >
        <AsideContent className="w-64 h-full bg-gray-800 text-white">
          <AsideHeader className="p-4 border-b border-gray-700">
            <AsideTitle className="text-lg font-semibold">
              Sidebar Title
            </AsideTitle>
            <AsideClose className="mt-1 cursor-pointer">X</AsideClose>
          </AsideHeader>
          <div className="p-4">
            <AsideDescription>
              Main content of the sidebar goes here. Add navigation links, user
              information, or anything you like.
            </AsideDescription>
          </div>
          <AsideFooter className="p-4 border-t border-gray-700">
            Footer Content
          </AsideFooter>
        </AsideContent>
      </Aside>

      <Aside
        name="test2"
        onOpen={() => setIsSidebarOpen(!isSidebarOpen)}
        initialOpen={isSidebarOpen}
      >
        <AsideContent className="w-64 h-full bg-gray-800 text-white">
          <AsideHeader className="p-4 border-b border-gray-700">
            <AsideTitle className="text-lg font-semibold">
              Sidebar Title
            </AsideTitle>
            <AsideClose className="mt-1 cursor-pointer">X</AsideClose>
          </AsideHeader>
          <div className="p-4">
            <AsideDescription>
              Main content of the sidebar goes here. Add navigation links, user
              information, or anything you like.
            </AsideDescription>
          </div>
          <AsideFooter className="p-4 border-t border-gray-700">
            Footer Content
          </AsideFooter>
        </AsideContent>
      </Aside>

      <div className="flex-1 p-8">
        <AsideTrigger
          forAside="test2"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
        >
          Open Sidebar 2
        </AsideTrigger>
        <AsideTrigger
          forAside="test"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
        >
          Open Sidebar
        </AsideTrigger>
      </div>
    </div>
  );
};

export default Sidebar;
