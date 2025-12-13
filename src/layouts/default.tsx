import { useState } from "react";
import { Link } from "@heroui/link";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
// import { Menu } from "lucide-react";
import { Footer } from "@/components/Footer";


export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen">
      
      {/* sidebar */}
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="h-screen"
      >
        <Sidebar open={open} />
      </div>

      <div className="flex flex-col flex-1 min-h-screen"
        style={{ marginLeft: open ? 0 : 0 }}
      >

        {/* NAVBAR */}
        <div className="flex items-center px-4 h-16 border-b bg-white">
          <Navbar />
        </div>

        
        {/* CONTENIDO */}
        <main className="p-6 flex-1">{children}</main>



        {/* FOOTER */}
          <Footer className="rounded-r-xl" />
      </div>
    </div>
  );
}




