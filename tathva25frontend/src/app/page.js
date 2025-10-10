import Image from "next/image";
import { Hero } from "@/components/hero";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

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
