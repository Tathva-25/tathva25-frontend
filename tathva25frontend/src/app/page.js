import Image from "next/image";
import { Hero } from "@/components/heroPage/hero";
import Navbar from "@/components/heroPage/navbar";
import Sidebar from "@/components/heroPage/sidebar";
import ResponsiveLayout from "@/components/Wheels";
export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <ResponsiveLayout />
        <Sidebar />
      </main>
    </div>
  );
}
