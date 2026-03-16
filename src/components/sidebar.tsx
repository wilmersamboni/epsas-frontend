import { Users, Home, FileText, Clock, LogOut, Settings } from "lucide-react";
import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import PerfilPopover from "@/components/perfil";

interface LinkItem { label: string; icon: ReactNode; href: string; }

export default function Sidebar({ open }: { open: boolean }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { logout } = useAuth();

  const links: LinkItem[] = [
    { label: "Inicio",      icon: <Home size={18} />,     href: "/"            },
    { label: "Seguimiento", icon: <Users size={18} />,    href: "/seguimiento" },
    { label: "Historial",   icon: <Clock size={18} />,    href: "/docs"        },
    { label: "Formatos",    icon: <FileText size={18} />, href: "/format"      },
    { label: "Admin",       icon: <Settings size={18} />, href: "/admin"       },
  ];

  return (
    <div className={`
      h-screen flex flex-col
      bg-[#001f33] text-white
      transition-all duration-300 ease-in-out
      ${open ? "w-56" : "w-16"}
      border-r border-white/5
    `}>

      {/* Logo */}
      <div className={`
        flex items-center h-14 px-4 border-b border-white/5 flex-shrink-0
        ${open ? "gap-3" : "justify-center"}
      `}>
        <img src="/img/logo.png" className="h-7 w-7 object-contain flex-shrink-0" />
        {open && <span className="font-semibold text-sm tracking-wide text-white">EPSAS</span>}
      </div>

      {/* Perfil */}
      <div className={`px-2 py-3 border-b border-white/5 ${open ? "" : "flex justify-center"}`}>
        <PerfilPopover open={open} />
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-2 py-3 flex-1">
        {links.map((item, i) => {
          const isActive = location.pathname === item.href;
          return (
            <button
              key={i}
              onClick={() => navigate(item.href)}
              title={!open ? item.label : undefined}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg
                text-left transition-all duration-150 w-full text-sm
                ${isActive
                  ? "bg-[#39A900] text-white"
                  : "text-white/55 hover:text-white hover:bg-white/8"
                }
                ${!open ? "justify-center" : ""}
              `}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {open && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-2 pb-4 border-t border-white/5 pt-2">
        <button
          onClick={() => { logout(); navigate("/login", { replace: true }); }}
          title={!open ? "Cerrar sesión" : undefined}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
            text-white/40 hover:text-white hover:bg-red-500/20
            transition-all duration-150 text-sm
            ${!open ? "justify-center" : ""}
          `}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {open && <span className="font-medium">Cerrar sesión</span>}
        </button>
      </div>
    </div>
  );
}