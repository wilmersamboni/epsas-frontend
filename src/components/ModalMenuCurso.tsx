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
import { zodResolver } from "@hookform/resolvers/zod";
import { listar_areas } from "@/api/AreasApi";
import {
  actualizar_curso,
  crear_curso,
  listar_programas,
} from "@/api/CursosApi";
import { listar_personas } from "@/api/PersonasApi";
import Calendario from "./Calendar";
import { CursoFormModalProps } from "@/types/ModalCurso";
import { Area } from "@/types/areaCard";
import { Programa } from "@/types/Programa";
import { Lider } from "@/types/Lider";
import { CursoFormData, cursoSchema } from "@/schemas/Curso";

export default function CursoFormModal({
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
  resolver: zodResolver(cursoSchema),
  defaultValues: {
    codigo: undefined,
    area: undefined,
    programa: undefined,
    persona: undefined,
    Fecha_inicio: "",
    Fecha_fin_lectiva: "",
    Fecha_fin_practica: "",
  },
});


  /* =======================
     CARGAR LISTAS
  ======================= */
  useEffect(() => {
    if (!isOpen) return;

    listar_areas({}).then(setAreas);
    listar_programas({}).then(setProgramas);
    listar_personas({}).then(setPersonas);
  }, [isOpen]);

  /* =======================
     RESET ÚNICO (CREAR / EDITAR)
  ======================= */
  useEffect(() => {
    if (!isOpen) return;

    if (curso && areas.length && programas.length && personas.length) {
      // EDITAR
     reset({
  codigo: curso.codigo,
  area: curso.fk_area,
  programa: curso.fk_programa,
  persona: curso.lider,
  Fecha_inicio: curso.fecha_inicio?.split("T")[0] ?? "",
  Fecha_fin_lectiva: curso.fin_lectiva?.split("T")[0] ?? "",
  Fecha_fin_practica: curso.fecha_fin?.split("T")[0] ?? "",
});

    } else {
      // CREAR
      reset({
        codigo: undefined,
        area: undefined,
        programa: undefined,
        persona: undefined,
        Fecha_inicio: "",
        Fecha_fin_lectiva: "",
        Fecha_fin_practica: "",
      });
    }
  }, [isOpen, curso, areas, programas, personas, reset]);

  /* =======================
     SUBMIT
  ======================= */
  const onSubmit = async (data: CursoFormData) => {
    const payload = {
  codigo: data.codigo,
  fecha_inicio: data.Fecha_inicio,
  fecha_fin: data.Fecha_fin_practica,
  fin_lectiva: data.Fecha_fin_lectiva,
  fk_area: data.area,
  fk_programa: data.programa,
  lider: data.persona,
};


    if (curso?.id_curso) {
      await actualizar_curso(curso.id_curso, payload);
    } else {
      await crear_curso(payload);
    }

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
                  <Calendario {...field} label="Fecha inicio" />
                )}
              />

              <Controller
                name="Fecha_fin_lectiva"
                control={control}
                render={({ field }) => (
                  <Calendario {...field} label="Fecha fin lectiva" />
                )}
              />

              <Controller
                name="Fecha_fin_practica"
                control={control}
                render={({ field }) => (
                  <Calendario {...field} label="Fecha fin práctica" />
                )}
              />

              {/* ÁREA */}
              <Controller
                name="area"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Área"
                    selectedKeys={
                      field.value ? [String(field.value)] : []
                    }
                    onSelectionChange={(keys) => {
                      const v = [...keys][0];
                      field.onChange(v ? Number(v) : undefined);
                    }}
                  >
                    {areas.map((a) => (
                      <SelectItem key={a.id_area}>
                        {a.nombre}
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
                    label="Programa"
                    selectedKeys={
                      field.value ? [String(field.value)] : []
                    }
                    onSelectionChange={(keys) => {
                      const v = [...keys][0];
                      field.onChange(v ? Number(v) : undefined);
                    }}
                  >
                    {programas.map((p) => (
                      <SelectItem key={p.id_programa}>
                        {p.nombre}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />

              {/* LÍDER */}
              <Controller
                name="persona"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Líder"
                    selectedKeys={
                      field.value ? [String(field.value)] : []
                    }
                    onSelectionChange={(keys) => {
                      const v = [...keys][0];
                      field.onChange(v ? Number(v) : undefined);
                    }}
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
