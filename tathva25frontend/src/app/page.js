import Image from "next/image";
import { Hero } from "@/Hero_Page/hero";
import Navbar from "@/Hero_Page/navbar";
import Sidebar from "@/Hero_Page/sidebar";
import Proshow from "@/proshow/proshow";
export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Proshow/>
        <Sidebar />
      </main>
    </div>

  );
}
