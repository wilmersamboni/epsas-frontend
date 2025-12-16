import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Avatar } from "@heroui/avatar";
import { User, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 👈 Importar

export default function PerfilPopover() {
  const navigate = useNavigate(); // 👈 Hook de navegación

  return (
    <Popover placement="right-start">
      <PopoverTrigger>
        <button className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition w-full">
          <Avatar
            name="Daniela"
            size="sm"
            className="bg-blue-600 text-white"
          />
          <span className="text-sm font-semibold hidden lg:block">Daniela</span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="
          p-4 w-64 rounded-2xl backdrop-blur-xl 
          bg-blue-900/40 border border-white/10 shadow-xl
          text-white
        "
      >
        <div className="flex items-center gap-3 border-b border-white/20 pb-3">
          <Avatar
            name="Daniela"
            className="bg-blue-600 text-white"
            size="md"
          />
          <div>
            <p className="text-sm font-bold">Daniela Sanchez</p>
            <p className="text-xs opacity-70">daniela@example.com</p>
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <button 
            onClick={() => navigate('/profile')} // 👈 Navegar a perfil
            className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition"
          >
            <User size={18} /> Mi perfil
          </button>

          <button 
            onClick={() => navigate('/settings')} // 👈 Navegar a configuración
            className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition"
          >
            <Settings size={18} /> Configuración
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}