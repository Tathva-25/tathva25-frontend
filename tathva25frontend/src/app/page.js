import Image from "next/image";
import { Hero } from "@/Hero_Page/hero";
import Navbar from "@/Hero_Page/navbar";
import Sidebar from "@/Hero_Page/sidebar";
import CompetitionPage from "@/competition/competition";
import Proshow from "../Proshow_Page/proshow";
export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Proshow />
        <CompetitionPage />
        <Sidebar />
      </main>
    </div>

  );
}
