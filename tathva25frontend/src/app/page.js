import Image from "next/image";
import { Hero } from "@/components/heroPage/hero";
import Navbar from "@/components/heroPage/navbar";
import Sidebar from "@/components/heroPage/sidebar";
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
