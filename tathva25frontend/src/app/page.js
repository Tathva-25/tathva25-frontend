import Image from "next/image";
import {Hero} from "./components/hero";
import Navbar from "./components/navbar";

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
