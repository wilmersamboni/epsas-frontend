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
import { actualizar_curso, listar_programas } from "@/api/CursosApi";
import { listar_personas } from "@/api/PersonasApi";
import Calendario from "./Calendar";

/* =======================
   VALIDACIÓN
======================= */
const areaSchema = z.object({
  codigo: z.number().min(1, "El código es obligatorio"),

  area: z.number({ required_error: "Debe seleccionar un Área" }),
  programa: z.number({ required_error: "Debe seleccionar un Programa" }),
  persona: z.number({ required_error: "Debe seleccionar un Líder" }),

  Fecha_inicio: z.string().min(1, "La fecha de inicio es obligatoria"),
  Fecha_fin_lectiva: z.string().min(1, "La fecha fin lectiva es obligatoria"),
  Fecha_fin_practica: z.string().min(1, "La fecha fin práctica es obligatoria"),
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
    fecha_fin_lectiva?: Date;
    fecha_ffin_practica?: Date;
    area?: number;
    programa?: number;
    persona?: number;
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
  const [programas, setProgramas] = useState<Programa[]>([]);
  const [personas, setPersonas] = useState<Lider[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CursoFormData>({
    resolver: zodResolver(areaSchema),
    defaultValues: {
      codigo: 0,
      area: 0,
      programa: 0,
      persona: 0,
      Fecha_inicio: "",
      Fecha_fin_lectiva: "",
      Fecha_fin_practica: "",
    },
  });

  /* =======================
     CARGAR DATOS
  ======================= */
  useEffect(() => {
    if (!isOpen) return;

    listar_areas({}).then(setAreas);
    listar_programas({}).then(setProgramas);
    listar_personas({}).then(setPersonas);
  }, [isOpen]);

  /* =======================
     RESET AL EDITAR
  ======================= */
  useEffect(() => {
    if (isOpen && curso) {
      reset({
        codigo: curso.codigo ?? 0,
        area: curso.area ?? 0,
        programa: curso.programa ?? 0,
        persona: curso.persona ?? 0,
        Fecha_inicio: curso.fecha_inicio
          ? new Date(curso.fecha_inicio).toISOString().split("T")[0]
          : "",
        Fecha_fin_lectiva: curso.fecha_fin_lectiva
          ? new Date(curso.fecha_fin_lectiva).toISOString().split("T")[0]
          : "",
        Fecha_fin_practica: curso.fecha_ffin_practica
          ? new Date(curso.fecha_ffin_practica).toISOString().split("T")[0]
          : "",
      });
    }
  }, [curso, isOpen, reset]);

  /* =======================
     SUBMIT
  ======================= */
  const onSubmit = async (data: CursoFormData) => {
    if (!curso?.id_curso) return;

    const datosParaBackend = {
      codigo: data.codigo,
      fecha_inicio: data.Fecha_inicio,
      fecha_fin: data.Fecha_fin_practica,
      fin_lectiva: data.Fecha_fin_lectiva,
      fk_area: data.area,
      fk_programa: data.programa,
      lider: data.persona,
    };

    await actualizar_curso(curso.id_curso, datosParaBackend);
    onGuardadoExitoso();
    onClose();
  };

  /* =======================
     RENDER
  ======================= */
  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              {curso?.id_curso ? "Editar Curso" : "Nuevo Curso"}
            </ModalHeader>

            <ModalBody className="gap-4">
              <Controller
                name="codigo"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Código del Curso"
                    onChange={(e) =>
                      field.onChange(Number(e.target.value))
                    }
                    isInvalid={!!errors.codigo}
                    errorMessage={errors.codigo?.message}
                  />
                )}
              />

              <Controller
                name="Fecha_inicio"
                control={control}
                render={({ field }) => (
                  <Calendario
                    {...field}
                    label="Fecha inicio del curso"
                    isInvalid={!!errors.Fecha_inicio}
                    errorMessage={errors.Fecha_inicio?.message}
                  />
                )}
              />

              <Controller
                name="Fecha_fin_lectiva"
                control={control}
                render={({ field }) => (
                  <Calendario
                    {...field}
                    label="Fecha fin lectiva"
                    isInvalid={!!errors.Fecha_fin_lectiva}
                    errorMessage={errors.Fecha_fin_lectiva?.message}
                  />
                )}
              />

              <Controller
                name="Fecha_fin_practica"
                control={control}
                render={({ field }) => (
                  <Calendario
                    {...field}
                    label="Fecha fin práctica"
                    isInvalid={!!errors.Fecha_fin_practica}
                    errorMessage={errors.Fecha_fin_practica?.message}
                  />
                )}
              />

              <Controller
                name="area"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Área"
                    selectedKeys={[String(field.value)]}
                    onSelectionChange={(keys) =>
                      field.onChange(Number([...keys][0]))
                    }
                    isInvalid={!!errors.area}
                    errorMessage={errors.area?.message}
                  >
                    {areas.map((a) => (
                      <SelectItem key={a.id_area}>
                        {a.nombre}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />

              <Controller
                name="programa"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Programa"
                    selectedKeys={[String(field.value)]}
                    onSelectionChange={(keys) =>
                      field.onChange(Number([...keys][0]))
                    }
                    isInvalid={!!errors.programa}
                    errorMessage={errors.programa?.message}
                  >
                    {programas.map((p) => (
                      <SelectItem key={p.id_programa}>
                        {p.nombre}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />

              <Controller
                name="persona"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Líder"
                    selectedKeys={[String(field.value)]}
                    onSelectionChange={(keys) =>
                      field.onChange(Number([...keys][0]))
                    }
                    isInvalid={!!errors.persona}
                    errorMessage={errors.persona?.message}
                  >
                    {personas.map((p) => (
                      <SelectItem key={p.id_persona}>
                        {p.nombre}
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
              <Button color="primary" type="submit" isLoading={isSubmitting}>
                Guardar
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
