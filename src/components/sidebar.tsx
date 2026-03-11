import {
  Users,
  Home,
  FileText,
  Clock,
  LogOut,
} from "lucide-react";
import { ReactNode } from "react";
import PerfilPopover from "@/components/perfil";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface LinkItem {
  label: string;
  icon: ReactNode;
  href: string;
}

export default function Sidebar({ open }: { open: boolean }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const links: LinkItem[] = [
    { label: "Inicio", icon: <Home />, href: "/" },
    { label: "Seguimiento", icon: <Users />, href: "/seguimiento" },
    { label: "Historial", icon: <Clock />, href: "/docs" },
    { label: "Formatos", icon: <FileText />, href: "/format" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div
      className={`
        h-screen p-4 bg-[#00304D] text-white transition-all duration-300
        ${open ? "w-64" : "w-20"}
        flex flex-col shadow-2xl
      `}
    >
      {/* PERFIL */}
      {/* PERFIL */}
        <div className="mb-6">
          <PerfilPopover open={open} />  {/* 👈 agrega open aquí */}
        </div>

      {/* TÍTULO MENÚ */}
      <h2
        className={`text-xl font-bold mb-6 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 hidden"
        }`}
      >
        Menú
      </h2>

      {/* LINKS */}
      <nav className="flex flex-col gap-2 mt-2">
        {links.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.href)}
            className="flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:bg-[#39A900] hover:text-white"
          >
            <span className="min-w-[24px] flex justify-center">{item.icon}</span>
            {open && <span className="whitespace-nowrap">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* CERRAR SESIÓN */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:bg-red-700 hover:text-white"
        >
          <span className="min-w-[24px] flex justify-center"><LogOut /></span>
          {open && <span className="whitespace-nowrap">Cerrar Sesión</span>}
        </button>
      </div>
    </div>
  );
}