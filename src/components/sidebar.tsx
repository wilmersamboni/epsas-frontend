import { Card } from "@heroui/react";
import {  Users, Settings, Home, FileText, Clock, MessageCircle, LogOut, KeyRound } from "lucide-react";
import { useState, ReactNode } from "react";
import PerfilPopover from "@/components/perfil";

interface LinkItem {
  label: string;
  icon: ReactNode;
  href: string;
}

export default function Sidebar({ open }: { open: boolean }) {
  const links: LinkItem[] = [
    { label: "Inicio", icon: <Home />, href: "/" },
    { label: "Seguimiento", icon: <Users />, href: "/seguimiento" },
    { label: "Historial", icon: <Clock />, href: "/docs" },
    { label: "Formatos", icon: <FileText />, href: "/format" },
    { label: "MiChat", icon: <MessageCircle />, href: "/blog" },
    { label: "Recuperar Contraseña", icon: <KeyRound />, href: "/ForgotPassword" },
  ];

  const logoutLink: LinkItem = { label: "Cerrar Sesion", icon: <LogOut />, href: "/DocsPage" };
  
  return (
    <Card
      className={`
        h-screen p-4 bg-gray-900 text-white transition-all duration-300
        ${open ? "w-64" : "w-20"}
        rounded-none
      `}
    >

      {/* === PERFIL POPUP === */}
      <div className="mb-6">
        <PerfilPopover />
      </div>

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
            className="flex items-center gap-3 p-3 hover:bg-gray-700 transition"
          >
            {item.icon}
            {open && <span>{item.label}</span>}
          </a>
        ))}
      </nav>

      {/* Cerrar sesión */}
      <div className="mt-auto">
        <a
          href={logoutLink.href}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700 transition"
        >
          {logoutLink.icon}
          {open && <span>{logoutLink.label}</span>}
        </a>
      </div>      
    </Card>
  );
}
