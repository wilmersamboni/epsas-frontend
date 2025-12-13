import { title } from "@/components";
import DefaultLayout from "@/layouts/default";
import { Card } from "@heroui/react";
import { useEffect, useState } from "react";
import { listar_areas } from "@/api/AreasApi";
import { Area } from "@/types/areaCard";
import { useNavigate } from 'react-router-dom';

import CardMenu from "@/components/CardMenu";
import AreaFormModal from "@/components/ModalMenu";

export default function AboutPage() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [areaSeleccionada, setAreaSeleccionada] = useState<Area | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarAreas() {
      try {
        const data = await listar_areas({});
        setAreas(data);
      } catch (e) {
        console.error("fallo al obtener las areas ", e);
        setError("Error al cargar las Áreas. Por favor, intente más tarde");
      }
    }
    cargarAreas();
  }, []);

  if (error) {
    return (
      <DefaultLayout>
        <div className="text-center py-10 text-red-500">
          <p className="text-2xl font-bold">⚠️ {error}</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Seguimiento de Áreas</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-6xl">
          {areas.map((area) => (
            <div key={area.id_area || area.nombre} className="mb-4">
              <Card 
                isPressable
                onPress={() => navigate(`/area-detail/${area.id_area}`)}
                className="
                  group
                  w-72 h-44 p-6
                  bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900
                  border border-gray-700
                  rounded-2xl shadow-lg
                  flex flex-col justify-between
                  transform transition-all duration-300 ease-out
                  hover:shadow-2xl hover:shadow-blue-500/20
                  hover:border-blue-500/50
                  hover:scale-105
                  hover:-translate-y-1
                  cursor-pointer
                  relative
                  overflow-hidden 
                "
              >
                {/* CardMenu con z-30 para estar por encima */}
                <CardMenu
                  onEditar={() => {
                    setAreaSeleccionada(area);
                    setModalOpen(true);
                  }}
                  onVer={() => navigate(`/area-detail/${area.id_area}`)}
                  onEliminar={() => console.log("Eliminar", area.id_area)}
                />
                
                {/* Contenido */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-white text-xl font-bold tracking-tight group-hover:text-blue-300 transition-colors duration-300">
                      {area.nombre || 'Área sin Nombre'}
                    </h3>
                  </div>

                  {/* Icono decorativo */}
                  <div className="w-13 h-13 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg 
                      className="w-10 h-10 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                      />
                    </svg>
                  </div>
                </div>

                {/* Indicador de acción */}
                <div className="relative z-10 flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    Ver detalles
                  </span>
                  <svg 
                    className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              </Card>
            </div>
          ))}

          {areas.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                <svg 
                  className="w-8 h-8 text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No hay áreas registradas</p>
            </div>
          )}
        </div>
      </section>

      <AreaFormModal
        isOpen={modalOpen}
        area={areaSeleccionada ?? undefined}
        onClose={() => {
          setModalOpen(false);
          setAreaSeleccionada(null);
        }}
      />
    </DefaultLayout>
  );
}