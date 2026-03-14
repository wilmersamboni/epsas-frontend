import { title } from "@/components";
import DefaultLayout from "@/layouts/default";
import { Card } from "@heroui/react";
import { useEffect, useState } from "react";
import { eliminar_area, listar_areas } from "@/api/AreasApi";
import { Area } from "@/types/areaCard";
import { useNavigate } from 'react-router-dom';
import TableInfo from '@/components/Table'

import CardMenu from "@/components/CardMenu";
import AreaFormModal from "@/components/ModalMenu";
import ButtomCreate from "@/components/BottomCreate";

export default function AboutPage() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [areaSeleccionada, setAreaSeleccionada] = useState<Area | null>(null);
  const navigate = useNavigate();


    async function cargarAreas() {
      try {
        const data = await listar_areas({});
        setAreas(data);
        setError(null);
      } catch (e) {
        console.error("fallo al obtener las areas ", e);
        setError("Error al cargar las Áreas. Por favor, intente más tarde");
      }
    }
    useEffect(() => {
    cargarAreas(); // Llama a la función al montar
  }, []);

const handleGuardadoExitoso = () => {
    // Cierra el modal, limpia la selección y recarga los datos
    setModalOpen(false);
    setAreaSeleccionada(null);
    cargarAreas(); 
  };

const handleEliminar= async(area: Area)=>{
  const confirmar= window.confirm( "Seguro que deseas eliminar el area")

  if(!confirmar) return;
  try{
    await eliminar_area(area.id_area);
    cargarAreas()
    
  }catch(error){
      console.error("Error al eliminar el area", error)
      alert("No se pudo eliminar el area")
    }
}

  

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
      <div >
        <TableInfo />
      </div>
    </DefaultLayout>
  );
  }