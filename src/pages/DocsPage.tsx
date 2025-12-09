import { title } from "@/components";
import DefaultLayout from "@/layouts/default";
import { Input } from "@heroui/react"; 
import { Search } from "lucide-react";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-8 py-8 md:py-10 w-full">

        {/* Título */}
        <div className="inline-block max-w-lg text-center">
          <h1 className={title()}>Historial</h1>
        </div>

        {/* Barra de búsqueda */}
        <div className="w-full max-w-md px-6">
          <Input
            radius="lg"
            size="lg"
            startContent={<Search className="text-gray-400" />}
            placeholder="Ingrese el documento o ID de curso"
            className="bg-white/10 backdrop-blur-lg border border-white/20 text-white"
          />
        </div>

        {/* Contenedor de resultados */}
        <div className="w-full max-w-3xl p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 mt-4">
          <p className="text-gray-300 text-center">
            No hay resultados todavía. Realiza una búsqueda.
          </p>
        </div>

      </section>
    </DefaultLayout>
  );
}
