import { useState } from "react";

interface CardMenuProps {
  onEditar?: () => void;
  onVer?: () => void;
  onEliminar?: () => void;
}

export default function CardMenu({
  onEditar,
  onEliminar,
}: CardMenuProps) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="absolute top-3 right-3 z-30">
      {/* BOTÓN FIJO */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setAbierto(!abierto);
        }}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
        </svg>
      </button>

      {/* MENÚ ABSOLUTO (NO EMPUJA EL BOTÓN) */}
      {abierto && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            absolute
            top-9
            right-0
            w-40
            bg-gray-800
            border border-gray-700
            rounded-lg
            shadow-lg
          "
        >
            <div>
          <button
            onClick={onEditar}
            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700"
          >
            ✏️ Editar
          </button>
          </div>

        
            <div>
                <button
            onClick={onEliminar}
            className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10"
          >
            🗑️ Eliminar
          </button>
            </div>
          
        </div>
      )}
    </div>
  );
}
