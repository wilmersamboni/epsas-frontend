import { useState } from "react";
import { Link } from "@heroui/link";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Menu } from "lucide-react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen">
      
      {/* sidebar */}
      <Sidebar open={open} />

      <div className="flex flex-col flex-grow transition-all duration-300"
        style={{ marginLeft: open ? 0 : 0 }}
      >
        
        {/* NAVBAR */}
        <div className="flex items-center px-4 h-16 border-b bg-white">

          {/* Botón de abrir/cerrar */}
          <button
            onClick={() => setOpen(!open)}
            className="mr-4"
          >
            <Menu size={30} />
          </button>

          {/* Navbar real */}
          <Navbar />
        </div>

        {/* CONTENIDO */}
        <main className="p-6 flex-grow">{children}</main>

        <footer className="p-4 text-center">
          <Link isExternal href="https://heroui.com">
            Epsas
          </Link>
        </footer>

      </div>
    </div>
  );
}
