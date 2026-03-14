import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Avatar } from "@heroui/avatar";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function PerfilPopover({ open }: { open: boolean }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const nombre = user?.nombre || "Usuario";
  const correo = localStorage.getItem("correo") || "";

  return (
    <Popover placement="right-start">
      <PopoverTrigger>
        <button className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition w-full">
          <Avatar
            name={nombre}
            size="sm"
            className="bg-blue-600 text-white flex-shrink-0"
          />

          {open && (
            <span className="text-sm font-semibold whitespace-nowrap overflow-hidden">
              {nombre}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="p-4 w-64 rounded-2xl backdrop-blur-xl bg-blue-900/40 border border-white/10 shadow-xl text-white">
        <div className="flex items-center gap-3 border-b border-white/20 pb-3">
          <Avatar
            name={nombre}
            className="bg-blue-600 text-white"
            size="md"
          />

          <div>
            <p className="text-sm font-bold">{nombre}</p>
            <p className="text-xs opacity-70">{correo}</p>
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <button
            onClick={() => navigate("/settings")}
            className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition"
          >
            <Settings size={18} /> Panel de Administración
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}