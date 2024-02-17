// import dynamicIconImports from "lucide-react/dynamicIconImports";
import { icons } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: keyof typeof icons;
  color?: string;
  isChildren?: boolean;
  children?: NavItem[];
}
