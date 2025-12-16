import { title } from "@/components";
import DefaultLayout from "@/layouts/default";
import {
  Card,
  Button,
  Divider,
  Chip
} from "@heroui/react";
import { useEffect, useState } from "react";
import {
  subirFormato,
  listarFormatos,
  eliminarFormato,
  descargarFormato,
} from "@/api/FormatosApi";

export default function PricingPage() {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [formatos, setFormatos] = useState<any[]>([]);

  useEffect(() => {
    cargarFormatos();
  }, []);

  const cargarFormatos = async () => {
    const data = await listarFormatos();
    setFormatos(data);
  };

  const handleUpload = async () => {
    if (!archivo) return alert("Seleccione un archivo");
    await subirFormato(archivo.name, archivo);
    setArchivo(null);
    cargarFormatos();
  };

  const handleEliminar = async (id: number) => {
    if (!confirm("¿Eliminar este formato?")) return;
    await eliminarFormato(id);
    cargarFormatos();
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-8 py-10">
        <h1 className={title()}> Formatos</h1>

        {/* SUBIR FORMATO */}
        <Card className="p-6 w-96 shadow-md">
          <input
            type="file"
            accept="application/pdf"
            className="block w-full text-sm text-gray-500
              file:me-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700"
            onChange={(e) => {
              if (e.target.files?.length) {
                setArchivo(e.target.files[0]);
              }
            }}
          />

          <Button
            color="primary"
            className="mt-4 w-full"
            onClick={handleUpload}
          >
            Subir Archivo
          </Button>
        </Card>

        {/* LISTADO */}
        <Card className="w-full max-w-3xl p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-3 text-primary">
            Archivos Subidos
          </h2>

          <Divider />

          {formatos.length === 0 && (
            <p className="text-center text-gray-400 py-6">
              No hay formatos registrados
            </p>
          )}

          {formatos.map((f) => (
            <div
              key={f.id_formatos}
              className="flex items-center justify-between py-3 border-b gap-4"
            >
              <div className="flex flex-col">
                <span className="font-medium">{f.nombre}</span>
                <Chip size="sm" color="primary" variant="flat">
                  PDF
                </Chip>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  as="a"
                  href={`http://localhost:3000/uploads/${f.formato_pdf}`}
                  target="_blank"
                >
                  Ver
                </Button>

                <Button
                  size="sm"
                  color="success"
                  variant="flat"
                  onClick={() => descargarFormato(f.formato_pdf)}
                >
                  Descargar
                </Button>

                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  onClick={() => handleEliminar(f.id_formatos)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </Card>
      </section>
    </DefaultLayout>
  );
}











// import { title } from "@/components";
// import DefaultLayout from "@/layouts/default";
// import { Card, Button } from "@heroui/react";
// import { useEffect, useState } from "react";
// import { subirFormato, listarFormatos} from "@/api/FormatosApi";

// export default function PricingPage() {
//   const [archivo, setArchivo] = useState<File | null>(null);
//   const [formatos, setFormatos] = useState<any[]>([]);

//   useEffect(() => {
//     cargarFormatos();
//   }, []);

//   const cargarFormatos = async () => {
//     const data = await listarFormatos();
//     console.log("DATA QUE LLEGA:", data);
//     setFormatos(data);
//   };

//   const handleUpload = async () => {
//     console.log("CLICK EN SUBIR");
//     if (!archivo) return alert("Seleccione un archivo");

//     await subirFormato(archivo.name, archivo);
//     setArchivo(null);
//     cargarFormatos();
//   };

//   return (
//     <DefaultLayout>
//       <section className="flex flex-col items-center gap-6 py-10">
//         <h1 className={title()}>Formatos</h1>

//         <Card className="p-6 w-96">
//           <input
//             type="file"
//             accept="application/pdf"
//             className="block w-full text-sm text-gray-500
//               file:me-4 file:py-2 file:px-4
//               file:rounded-lg file:border-0
//               file:text-sm file:font-semibold
//               file:bg-blue-600 file:text-white
//               hover:file:bg-blue-700"
//             onChange={(e) => {
//               if (e.target.files && e.target.files.length > 0) {
//                 setArchivo(e.target.files[0]);
//                 console.log("Archivo seleccionado:", e.target.files[0]);

//               }
//             }}
//           />
//         </Card>

//         <Button color="primary" onClick={handleUpload}>
//           Subir Archivo
//         </Button>

//         {/* LISTADO */}
//         <div className="w-full max-w-xl mt-8">
//           { formatos.map((f) => (
//             <div key={f.id_formatos} className="flex justify-between p-3 border-b">
//               <span>{f.nombre}</span>
//               <a
//                 href={`http://localhost:3000/uploads/${f.formato_pdf}`}
//                 target="_blank"
//                 className="text-blue-500"
//               >
//                 Ver PDF
//               </a>
//             </div>
//           ))}
//         </div>
//       </section>
//     </DefaultLayout>
//   );
// }
