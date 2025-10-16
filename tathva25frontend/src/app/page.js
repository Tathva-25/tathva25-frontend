"use client"
import Image from "next/image";
import { Hero } from "@/components/heroPage/hero";
import Navbar from "@/components/heroPage/navbar";
import Sidebar from "@/components/heroPage/sidebar";
import ResponsiveLayout from "@/components/Wheels";
import Proshow from "@/proshow/proshow";
export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Sidebar />
      </main>
    </div>

  );
}
