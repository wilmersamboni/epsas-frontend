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

        <footer className=" bottom-0 left-0 w-full bg-gray-900  text-white border-t py-10 rounded-r-xl">
        <div className="max-w-5xl mx-auto px-6  flex flex-col sm:flex-row items-center justify-between">
    
          {/* Texto izquierdo */}
          <p className="text-white text-sm">
            © {new Date().getFullYear()} EPSAS — Todos los derechos reservados
          </p>
    
          {/* Links */}
          <div className="flex gap-4 mt-3 sm:mt-0">
            <a href="/privacidad" className="text-white  text-sm hover:underline">
              Política de privacidad
            </a>
            <a href="/terminos" className="text-white  text-sm hover:underline">
              Términos de uso
            </a>
          </div>
        </div>
    </footer>

      </div>
    </div>
  );
}
