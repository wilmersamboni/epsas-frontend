import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { listar_sede } from "@/api/SedeApi";
import {  actualizar_area } from "@/api/AreasApi";

/* =======================
   VALIDACIÓN
======================= */

const areaSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  sede: z.number({
    required_error: "Debe seleccionar una sede",
  }),
});

type AreaFormData = z.infer<typeof areaSchema>;

/* =======================
   TIPOS
======================= */

interface AreaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  area?: {
    id_area?: number;
    nombre?: string;
    sede?: number;
  };
  onGuardadoExitoso: () => void;
}

interface Sede {
  id_sede: number;
  nombre: string;
}

/* =======================
   COMPONENTE
======================= */

export default function AreaFormModal({
  isOpen,
  onClose,
  area,
  onGuardadoExitoso,
}: AreaFormModalProps) {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [cargandoSedes, setCargandoSedes] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AreaFormData>({
    resolver: zodResolver(areaSchema),
    defaultValues: {
      nombre: "",
      sede: undefined,
    },
  });

  /* =======================
     CARGAR SEDES
  ======================= */
  useEffect(() => {
    if (!isOpen) return;

    async function cargarSedes() {
      setCargandoSedes(true);
      try {
        const data = await listar_sede({});
        setSedes(data);
      } catch (e) {
        console.error(e);
      } finally {
        setCargandoSedes(false);
      }
    }

    cargarSedes();
  }, [isOpen]);

  /* =======================
     SETEAR VALORES AL EDITAR
  ======================= */
  useEffect(() => {
    if (isOpen) {
      reset({
        nombre: area?.nombre ?? "",
        sede: area?.sede,
      });
    }
  }, [area, isOpen, reset]);

  /* =======================
     SUBMIT
  ======================= */
  const onSubmit = async (data: AreaFormData) => {
    try {
      if (area?.id_area) {
        const datosParaBackend = {
            nombre: data.nombre,
            fk_sede: data.sede, // Mapeamos 'sede' a 'fk_sede'
        };
        await actualizar_area(area.id_area, datosParaBackend);
        onGuardadoExitoso();
      } 

      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  /* =======================
     RENDER
  ======================= */
  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">
              {area?.id_area ? "Editar Área" : "Nueva Área"}
            </ModalHeader>

            <ModalBody className="gap-4">
              {/* NOMBRE */}
              <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Nombre del área"
                    variant="bordered"
                    isInvalid={!!errors.nombre}
                    errorMessage={errors.nombre?.message}
                  />
                )}
              />

              {/* SEDE */}
              <Controller
                name="sede"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Sede asociada"
                    selectedKeys={
                      field.value ? [String(field.value)] : []
                    }
                    onSelectionChange={(keys) => {
                      const value = Number(Array.from(keys)[0]);
                      field.onChange(value);
                    }}
                    isDisabled={cargandoSedes}
                    variant="bordered"
                    isInvalid={!!errors.sede}
                    errorMessage={errors.sede?.message}
                  >
                    {sedes.map((sede) => (
                      <SelectItem key={sede.id_sede} value={sede.id_sede}>
                        {sede.nombre}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            </ModalBody>

            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Cancelar
              </Button>

              <Button
                color="primary"
                type="submit"
                isLoading={isSubmitting}
              >
                Guardar
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
