import Image from "next/image";
import { Hero } from "@/Hero_Page/hero";
import Navbar from "@/Hero_Page/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
    
  );
}
