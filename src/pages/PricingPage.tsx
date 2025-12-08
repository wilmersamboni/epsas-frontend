import { title } from "@/components";
import DefaultLayout from "@/layouts/default";
import { Card } from "@heroui/react";
import {Button} from "@heroui/react";

export default function PricingPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Formatos</h1>
          
        </div>
        <Card className=" focus:border-pink-600 rounded-xl h-15 flex justify-center items-center w-190 mx-auto max-w-sm bg-">
  <input type="file" className="block w-90 text-sm text-gray-500
    file:me-4 file:py-2 file:px-4
    file:rounded-lg file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-600 file:text-white
    hover:file:bg-blue-700
    file:disabled:opacity-50 file:disabled:pointer-events-none
    dark:text-neutral-500
    dark:file:bg-blue-500
    dark:hover:file:bg-blue-400 
  " />
</Card>
    <Button color="primary" variant="shadow">
        Subir Archivo
      </Button>
      </section>
    </DefaultLayout>
  );
}
