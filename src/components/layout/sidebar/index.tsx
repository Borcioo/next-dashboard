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
    <Aside
      name="test"
      onOpen={() => setIsSidebarOpen(!isSidebarOpen)}
      initialOpen={isSidebarOpen}
    >
      <AsideContent className="bg-gray-800 text-white">
        test
        {/* <AsideHeader className="p-4 border-b border-gray-700">
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
        </AsideFooter> */}
      </AsideContent>
    </Aside>
  );
};

export default Sidebar;
