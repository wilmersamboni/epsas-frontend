import { useState } from "react";
import { Link } from "@heroui/link";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Footer } from "@/components/Footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen">
      
      {/* SIDEBAR */}
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="h-screen"
      >
        <Sidebar open={open} />
      </div>

      {/* CONTENIDO DERECHO */}
      <div className="flex flex-col flex-1 min-h-screen overflow-hidden  bg-[#F0F2F5]">

        {/* NAVBAR */}
        <Navbar />

        {/* CONTENIDO */}
        <main className="p-6 flex-1 overflow-y-auto bg-[#EEF2F7]">{children}</main>

        {/* FOOTER */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}