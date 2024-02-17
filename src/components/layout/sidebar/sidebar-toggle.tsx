"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

function SidebarToggle({ isOpen, onClick }: SidebarToggleProps) {
  return (
    <ArrowLeft
      className={cn(
        "absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
        !isOpen && "rotate-180"
      )}
      onClick={onClick}
    />
  );
}

export default SidebarToggle;
