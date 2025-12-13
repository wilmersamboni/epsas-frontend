import { Card } from "@heroui/react";
import {
  Users,
  Home,
  FileText,
  Clock,
  MessageCircle,
  LogOut,
  KeyRound,
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
    { label: "MiChat", icon: <MessageCircle />, href: "/blog" },
    {
      label: "Recuperar Contraseña",
      icon: <KeyRound />,
      href: "/ForgotPassword",
    },
  ];

  const handleLogout = () => {
    logout(); // limpia sesión
    navigate("/login", { replace: true });
  };

  return (
    <Card
      className={`
        h-screen p-4 bg-gray-900 text-white transition-all duration-300
        ${open ? "w-64" : "w-20"}
        rounded-none flex flex-col
      `}
    >
      {/* PERFIL */}
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

      {/* LINKS */}
      <nav className="flex flex-col gap-4 mt-2">
        {links.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.href)}
            className="flex items-center gap-3 p-3 hover:bg-gray-700 transition rounded-xl text-left"
          >
            {item.icon}
            {open && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* CERRAR SESIÓN */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-600 transition text-left"
        >
          <LogOut />
          {open && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </Card>
  );
}
