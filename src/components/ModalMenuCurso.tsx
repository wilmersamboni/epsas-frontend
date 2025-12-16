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

import { listar_areas } from "@/api/AreasApi";
import {  actualizar_curso, listar_programas } from "@/api/CursosApi";

/* =======================
   VALIDACIÓN
======================= */

const areaSchema = z.object({
  codigo: z.number().min(1, "El codigo es obligatorio"),
  area: z.number({
    required_error: "Debe seleccionar una Area",
  }),
  programa: z.number({
    required_error: "Debe seleccionar una Area",
  }),
});

type CursoFormData = z.infer<typeof areaSchema>;

/* =======================
   TIPOS
======================= */

interface CursoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  curso?: {
    id_curso?: number;
    codigo?: number;
    fecha_inicio?: Date;
    fecha_fin_lectiva?:Date;
    fecha_ffin_practica?:Date;
    area?: number;
    programa?:number;
    lider?:number;
  };
  onGuardadoExitoso: () => void;
}

interface Area {
  id_area: number;
  nombre: string;
}
interface Programa {
  id_programa: number;
  nombre: string;
}
interface Lider {
  id_persona: number;
  nombre: string;
}

/* =======================
   COMPONENTE
======================= */

export default function AreaFormModal({
  isOpen,
  onClose,
  curso,
  onGuardadoExitoso,
}: CursoFormModalProps) {
    
  const [areas, setAreas] = useState<Area[]>([]);
  const [cargandoAreas, setCargandoAreas] = useState(false);
  const [programas, setProgramas] = useState<Programa[]>([]);
  const [cargandoProgramas, setCargandoProgramas] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CursoFormData>({
    resolver: zodResolver(areaSchema),
    defaultValues: {
      codigo: undefined,
      area: undefined,
      programa: undefined,
    },
  });

  /* =======================
     CARGAR SEDES
  ======================= */
  useEffect(() => {
    if (!isOpen) return;

    async function cargarAreas() {
      setCargandoAreas(true);
      try {
        const data = await listar_areas({});
        setAreas(data);
      } catch (e) {
        console.error(e);
      } finally {
        setCargandoAreas(false);
      }
    }

    cargarAreas();
    async function cargarProgramas() {
      setCargandoProgramas(true);
      try {
        const data = await listar_programas({});
        setProgramas(data);
      } catch (e) {
        console.error(e);
      } finally {
        setCargandoProgramas(false);
      }
    }

    cargarProgramas();
    // async function cargarAreas() {
    //   setCargandoAreas(true);
    //   try {
    //     const data = await listar_areas({});
    //     setAreas(data);
    //   } catch (e) {
    //     console.error(e);
    //   } finally {
    //     setCargandoAreas(false);
    //   }
    // }

    // cargarAreas();
  }, [isOpen]);

  /* =======================
     SETEAR VALORES AL EDITAR
  ======================= */
  useEffect(() => {
    if (isOpen) {
      reset({
        codigo: curso?.codigo ?? undefined,
        area: curso?.area,
      });
    }
  }, [curso, isOpen, reset]);

  /* =======================
     SUBMIT
  ======================= */
  const onSubmit = async (data: CursoFormData) => {
    try {
      if (curso?.id_curso) {
        const datosParaBackend = {
            codigo: data.codigo,
            fk_area: data.area, // Mapeamos 'sede' a 'fk_sede'

        };
        await actualizar_curso(curso.id_curso, datosParaBackend);
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
              {curso?.id_curso ? "Editar Curso" : "Nueva Área"}
            </ModalHeader>

            <ModalBody className="gap-4">
              {/* NOMBRE */}
              <Controller
                name="Codigo"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Codigo del Curso"
                    variant="bordered"
                    isInvalid={!!errors.codigo}
                    errorMessage={errors.codigo?.message}
                  />
                )}
              />
              {/* FECHA_INICIO */}
              <Controller
                name="Fecha_inicio"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    label="Fecha de inicio del Curso"
                    variant="bordered"
                    isInvalid={!!errors.codigo}
                    errorMessage={errors.codigo?.message}
                  />
                )}
              />
              {/* FECHA FIN LECTIVA */}
              <Controller
                name="Fecha_fin_lectiva"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    label="Fecha fin etapa lectiva del Curso"
                    variant="bordered"
                    isInvalid={!!errors.codigo}
                    errorMessage={errors.codigo?.message}
                  />
                )}
              />
              {/* FECHA FIN PRACTICA */}
              <Controller
                name="Fecha_fin_practica"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    label="Fecha fin etapa practica del Curso"
                    variant="bordered"
                    isInvalid={!!errors.codigo}
                    errorMessage={errors.codigo?.message}
                  />
                )}
              />
              {/* FECHA FIN PRACTICA */}
              <Controller
                name="Fecha_fin_practica"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    label="Fecha fin etapa practica del Curso"
                    variant="bordered"
                    isInvalid={!!errors.codigo}
                    errorMessage={errors.codigo?.message}
                  />
                )}
              />

              {/* SEDE */}
              <Controller
                name="area"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Area asociada"
                    selectedKeys={
                      field.value ? [String(field.value)] : []
                    }
                    onSelectionChange={(keys) => {
                      const value = Number(Array.from(keys)[0]);
                      field.onChange(value);
                    }}
                    isDisabled={cargandoAreas}
                    variant="bordered"
                    isInvalid={!!errors.area}
                    errorMessage={errors.area?.message}
                  >
                    {areas.map((area) => (
                      <SelectItem key={area.id_area} value={area.id_area}>
                        {area.nombre}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              {/* PROGRAMA */}
              <Controller
                name="programa"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Programa asociado"
                    selectedKeys={
                      field.value ? [String(field.value)] : []
                    }
                    onSelectionChange={(keys) => {
                      const value = Number(Array.from(keys)[0]);
                      field.onChange(value);
                    }}
                    isDisabled={cargandoProgramas}
                    variant="bordered"
                    isInvalid={!!errors.programa}
                    errorMessage={errors.programa?.message}
                  >
                    {programas.map((programa) => (
                      <SelectItem key={programa.id_programa} value={programa.id_programa}>
                        {programa.nombre}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              {/* LIDER */}
              <Controller
                name="lider"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Lider Encargado"
                    selectedKeys={
                      field.value ? [String(field.value)] : []
                    }
                    onSelectionChange={(keys) => {
                      const value = Number(Array.from(keys)[0]);
                      field.onChange(value);
                    }}
                    isDisabled={cargandoAreas}
                    variant="bordered"
                    isInvalid={!!errors.area}
                    errorMessage={errors.area?.message}
                  >
                    {areas.map((area) => (
                      <SelectItem key={area.id_area} value={area.id_area}>
                        {area.nombre}
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
