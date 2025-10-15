import Image from "next/image";
import Menupage from "./components/Menupage";
import Robowars from "./components/Robowars";

export default function Home() {
  return (
    <>
      {/* Sci-fi Background Image */}
      {/* <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe3ZPFCxCFME9-1GCbHwAkv8bcPtpC1z_Fdg&s')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div> */}
      <Robowars />
    </>
  );
}
