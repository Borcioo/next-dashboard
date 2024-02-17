import { ModeToggle } from "@/components/theme-toggle";
import Image from "next/image";

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ModeToggle />
    </main>
  );
}