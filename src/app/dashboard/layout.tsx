import type { Metadata } from "next";
import Sidebar from "@/components/layout/sidebar";
import { AsideTrigger } from "@/components/ui/aside";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-1 p-4">{children}</div>
      </div>
    </>
  );
}

const Navbar = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-primary/90 text-white">
      <div className="flex items-center space-x-4">
        <AsideTrigger forAside="test">Open Sidebar</AsideTrigger>
        <h1>Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button>Notifications</button>
        <button>Profile</button>
      </div>
    </header>
  );
};
