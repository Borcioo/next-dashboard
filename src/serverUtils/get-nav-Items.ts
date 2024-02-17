import { NavItem } from "@/types";
import { cache } from "react";
import "server-only";

export const preload = () => {
  void getNavItems();
};

const itemsData: NavItem[] = [
  {
    title: "Dashboard",
    icon: "LayoutDashboard",
    href: "/",
    color: "text-sky-500",
  },
  {
    title: "Example",
    icon: "BookOpenCheck",
    href: "/example",
    color: "text-orange-500",
    isChildren: true,
    children: [
      {
        title: "Example-01",
        icon: "BookOpenCheck",
        color: "text-red-500",
        href: "/example/employees",
      },
      {
        title: "Example-02",
        icon: "BookOpenCheck",
        color: "text-red-500",
        href: "/example/example-02",
      },
      {
        title: "Example-03",
        icon: "BookOpenCheck",
        color: "text-red-500",
        href: "/example/example-03",
      },
    ],
  },
];

export const getNavItems = cache(async () => {
  const items = await Promise.resolve({ itemsData });
  return items;
});
