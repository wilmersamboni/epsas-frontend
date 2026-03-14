import DefaultLayout from '@/layouts/default'
import { useEffect, useState } from 'react';
import { listar_cursos_area, eliminar_curso } from '@/api/CursosApi';
import CursoInfo from '@/types/cursoCard';
import { Card } from '@heroui/react';
import { title } from "@/components";
import { useParams } from 'react-router-dom';
import CardMenu from "@/components/CardMenu";
import { useNavigate } from 'react-router-dom';
import CursoFormModal from "@/components/ModalMenuCurso";
import ButtomCreate from "@/components/BottomCreate";

function PageCourse() {
  const { idArea } = useParams<{ idArea: string }>();
    const [cursos, setCursos] = useState<CursoInfo[]>([]);
      const [error, setError] = useState<string | null>(null);
        const [modalOpen, setModalOpen] = useState(false);
        const [cursoSeleccionada, setCursoSeleccionada] = useState<CursoInfo | null>(null);
        const navigate = useNavigate();
    
 const areaIdNumber = idArea ? Number(idArea) : null;
     
       useEffect(() => {
  if (!areaIdNumber) {
    setError("ID de Área no válido.");
    return;
  }
  setError(null);
}, [areaIdNumber]);


        
        async function cargarCursos() {
  if (!areaIdNumber) return;

  try {
    const data = await listar_cursos_area(areaIdNumber);
    setCursos(data);
    setError(null);
  } catch (e) {
    console.error("fallo al obtener los cursos: ", e);
    setError("Error al cargar los Cursos. Por favor, intente más tarde");
  }
}

useEffect(()=>{
        cargarCursos();
      }, [areaIdNumber]);

        const handleGuardadoExitoso = () => {
        // Cierra el modal, limpia la selección y recarga los datos
        setModalOpen(false);
        setCursoSeleccionada(null);
         cargarCursos()
  
      };

      const handleEliminar= async(curso: CursoInfo
      )=>{
        const confirmar= window.confirm( "Seguro que deseas eliminar el curso")
      
        if(!confirmar) return;
        try{
          await eliminar_curso(curso.id_curso);
          if (idArea) {
          await listar_cursos_area(Number(idArea)).then(setCursos);
    }
          
        }catch(error){
            console.error("Error al eliminar el curso", error)
            alert("No se pudo eliminar el curso")
          }
      }
      
    
      if (error) {
        return (
          <DefaultLayout>
            <div className="text-center py-10 text-red-500">
              <p className="text-2xl font-bold"> {error}</p>
            </div>
          </DefaultLayout>
        );
      }
  return (
    <DefaultLayout>
        {/* <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="fixed top-24 right-20 z-50">
                    <ButtomCreate
                    onClick={() => {
              setCursoSeleccionada(null);
              setModalOpen(true);
            }}
          />
        </div>
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Seguimiento de Cursos</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-6xl">
          {cursos.map((curso) => (
            
            
            <div key={curso.id_curso || curso.codigo} className="mb-4">
              <Card 
                isPressable
                onPress={() => navigate(`/pagetable/${curso.id_curso}`)}

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
                <CardMenu
                                  onEditar={() => {
                                    setCursoSeleccionada(curso);
                                    setModalOpen(true);
                                  }}
                                  
                                  onEliminar={(e) => {
                                  e.stopPropagation(); 
                                  handleEliminar(curso);
                                }}
                                />
                {/* Efecto de brillo en hover */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full" />
                
                {/* Contenido */}
                {/* <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    

                    {/* Título del área */}
                    {/* <h3 className="text-white text-xl font-bold tracking-tight group-hover:text-blue-300 transition-colors duration-300">
                      {curso.codigo || 'Curso sin codigo'}
                    </h3> */} 

                    
                  {/* </div> */}
                  {/* Icono decorativo */}
                    {/* <div className="w-13 h-13 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
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
                    </div> */}

                  {/* Descripción o información adicional
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Haz clic para ver el seguimiento detallado
                  </p> */}
                {/* </div> */}

                {/* Indicador de acción */}
                {/* <div className="relative z-10 flex items-center justify-between mt-auto">
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

          {cursos.length === 0 && (
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
              <p className="text-gray-500 text-lg">No hay cursos registradas</p>
            </div>
          )}
        </div>
      </section>

      <CursoFormModal
  key={cursoSeleccionada?.id_curso ?? "nuevo"}
  isOpen={modalOpen}
  curso={cursoSeleccionada ?? undefined}
  onClose={() => {
    setModalOpen(false);
    setCursoSeleccionada(null);
  }}
  onGuardadoExitoso={handleGuardadoExitoso}
/> */} 

    </DefaultLayout>
  )
}

export default PageCourse
