"use client";

import { useState } from "react";
import Menupage from "./Menupage";
import { Menu, X } from "lucide-react";

export default function MenuWrapper({ children }) {

  return (
  
        <div className="fixed  bg-black/40 inset-0 z-[2000]  ">
          <Menupage />
        </div>
   
  );
}
