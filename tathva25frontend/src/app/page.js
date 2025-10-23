"use client";
import Navbar from "@/components/heroPage/navbar";
import Sidebar from "@/components/heroPage/sidebar";
import { useEffect } from "react";
import toast from "react-hot-toast";
export default function Home() {
  useEffect(() => {
    toast("Map Available! Explore Now", {
      duration: 4000,
    });
  }, []);

  return (
    <div className="michroma">
      <Sidebar />
    </div>
  );
}
