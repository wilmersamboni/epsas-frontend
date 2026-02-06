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
<Card className="w-full max-w-5xl p-6 shadow-lg">
  <h2 className="text-lg font-semibold mb-4 text-primary">
    Archivos Subidos
  </h2>

  <Divider />

  {formatos.length === 0 && (
    <p className="text-center text-gray-400 py-10">
      No hay formatos registrados
    </p>
  )}

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
    {formatos.map((f) => (
      <Card
        key={f.id_formatos}
        className="
          rounded-xl
          border
          hover:shadow-lg
          transition
          p-4
        "
      >
        {/* Header tipo documento */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 text-lg">
            📄
          </div>

          <div className="flex-1">
            <p className="font-medium text-sm line-clamp-2">
              {f.nombre}
            </p>

            <Chip
              size="sm"
              color="danger"
              variant="flat"
              className="mt-1"
            >
              PDF
            </Chip>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex justify-between gap-2 mt-4">
          <Button
            size="sm"
            variant="flat"
            color="primary"
            as="a"
            href={`http://localhost:3000/uploads/${f.formato_pdf}`}
            target="_blank"
          >
            Ver
          </Button>

          <Button
            size="sm"
            variant="flat"
            color="success"
            onClick={() => descargarFormato(f.formato_pdf)}
          >
            Descargar
          </Button>

          <Button
            size="sm"
            variant="flat"
            color="danger"
            onClick={() => handleEliminar(f.id_formatos)}
          >
            Eliminar
          </Button>
        </div>
      </Card>
    ))}
  </div>
</Card>

</section>
</DefaultLayout>
);
}











