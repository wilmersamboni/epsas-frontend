import { Card } from "@heroui/react";
import { Home, Users, Settings, Menu } from "lucide-react";
import { useState, ReactNode } from "react";

interface LinkItem {
  label: string;
  icon: ReactNode;
  href: string;
}

export default function Sidebar({ open }: { open: boolean }) {
  const links: LinkItem[] = [
    { label: "Inicio", icon: <Home />, href: "/" },
    { label: "Seguimiento", icon: <Users />, href: "/AboutPage" },
    { label: "Historial", icon: <Settings />, href: "/DocsPage" },
    { label: "Formatos", icon: <Settings />, href: "/DocsPage" },
    { label: "MiChat", icon: <Settings />, href: "/DocsPage" },
    { label: "Cerrar Sesion", icon: <Settings />, href: "/DocsPage" },
  ];

  return (
    <Card
      className={`
        h-screen p-4 bg-gray-900 text-white transition-all duration-300
        ${open ? "w-64" : "w-20"}
      `}
    >
      <h2
        className={`text-xl font-bold mb-6 transition-opacity ${
          open ? "opacity-100" : "opacity-0 hidden"
        }`}
      >
        Menú
      </h2>

      <nav className="flex flex-col gap-4 mt-2">
        {links.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700 transition"
          >
            {item.icon}
            {open && <span>{item.label}</span>}
          </a>
        ))}
      </nav>
    </Card>
  );
}
