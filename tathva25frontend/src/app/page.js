import Image from "next/image";
import Navbar from "@/Hero_Page/navbar";
import Sidebar from "@/Hero_Page/sidebar";
// In your src/app/page.js file, change line 5 to:

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Sidebar />

      </main>
    </div>

  );
}
