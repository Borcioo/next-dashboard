// useSidebar hook that get initial state from cookies
import { useState, useEffect } from "react";

export function useSidebar({ initialOpen = true } = {}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const open = JSON.parse(localStorage.getItem("isSidebarOpen") ?? "true");
    setIsOpen(open);
  }, []);

  const toggle = () => {
    localStorage.setItem("isSidebarOpen", JSON.stringify(!isOpen));
    setIsOpen(!isOpen);
  };

  return { isOpen, toggle };
}
