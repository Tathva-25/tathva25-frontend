"use client";
import Image from "next/image";
import { Hero } from "@/components/heroPage/hero";
import Navbar from "@/components/heroPage/navbar";
import Sidebar from "@/components/heroPage/sidebar";
import ResponsiveLayout from "@/components/Wheels";
import Explore from "./components/Explore";
import Menupage from "./components/Menupage";
import Robowars from "./components/Robowars";

import Proshow from "@/components/proshow";
export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
        {/* <Hero />
        <Explore/>
        <Proshow/>
        <ResponsiveLayout/> */}
        <Sidebar />
    </div>
  );
}
