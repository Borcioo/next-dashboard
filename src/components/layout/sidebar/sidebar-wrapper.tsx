"use client";
import React from "react";
import { cn } from "@/lib/utils";
import SidebarToggle from "./sidebar-toggle";

interface SidebarContainerProps {
  children: React.ReactNode;
  className?: string;
  isSidebarOpen: boolean;
}

function SidebarContainer({
  children,
  className,
  isSidebarOpen,
}: SidebarContainerProps) {
  const [isOpen, setIsOpen] = React.useState(isSidebarOpen);

  return (
    <aside
      className={cn(
        `relative hidden h-screen border-r md:block duration-500`,
        isOpen ? "w-72" : "w-[78px]",
        className
      )}
    >
      <SidebarToggle
        isOpen={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
          document.cookie = `isSidebarOpen=${!isOpen}; path=/`;
        }}
      />
      <div className="space-y-4 py-4">{children}</div>
    </aside>
  );
}

export default SidebarContainer;
