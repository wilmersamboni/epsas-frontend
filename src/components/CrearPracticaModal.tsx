import React from "react";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, Select, SelectItem, Input, Textarea,
} from "@heroui/react";
import { listar_modalidades } from "../api/Modalidad";
import { listar_empresas } from "../api/Empresa";
import { listar_matriculas_por_alumno } from "@/api/Matriculas";
import { crear_practica } from "@/api/PracticaApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  aprendices: any[]; // lista de aprendices de la tabla
  onSuccess: () => void;
}

export default function CrearPracticaModal({ isOpen, onClose, aprendices, onSuccess }: Props) {

  const [modalidades, setModalidades] = React.useState<any[]>([]);
  const [empresas, setEmpresas]       = React.useState<any[]>([]);
  const [loading, setLoading]         = React.useState(false);
  const [loadingData, setLoadingData] = React.useState(false);
  const [error, setError]             = React.useState("");

  // ── Campos del formulario ──
  const [aprendizId, setAprendizId]     = React.useState("");
  const [modalidadId, setModalidadId]   = React.useState("");
  const [empresaId, setEmpresaId]       = React.useState("");
  const [fechaInicio, setFechaInicio]   = React.useState("");
  const [fechaFin, setFechaFin]         = React.useState("");
  const [estado, setEstado]             = React.useState("activa");
  const [observacion, setObservacion]   = React.useState("");

  // ── Carga modalidades y empresas al abrir ──
  React.useEffect(() => {
    if (!isOpen) return;

    const cargarDatos = async () => {
      setLoadingData(true);
      try {
        const [mods, emps] = await Promise.all([
          listar_modalidades(),
          listar_empresas(),
        ]);
        setModalidades(mods);
        setEmpresas(emps);
      } catch (e) {
        setError("Error cargando datos.");
      } finally {
        setLoadingData(false);
      }
    };

    // Limpiar formulario
    setAprendizId("");
    setModalidadId("");
    setEmpresaId("");
    setFechaInicio("");
    setFechaFin("");
    setEstado("activa");
    setObservacion("");
    setError("");

    cargarDatos();
  }, [isOpen]);

  const handleGuardar = async () => {
    if (!aprendizId)  { setError("Selecciona un aprendiz."); return; }
    if (!modalidadId) { setError("Selecciona una modalidad."); return; }
    if (!empresaId)   { setError("Selecciona una empresa."); return; }
    if (!fechaInicio) { setError("Ingresa la fecha de inicio."); return; }
    if (!fechaFin)    { setError("Ingresa la fecha de fin."); return; }

    setLoading(true);
    setError("");

    try {
      // obtiene el id_matricula del aprendiz seleccionado
      const matriculas = await listar_matriculas_por_alumno(Number(aprendizId));

      if (!matriculas.length) {
        setError("El aprendiz no tiene matrícula registrada.");
        setLoading(false);
        return;
      }

      const fk_matricula = matriculas[0].id_matricula;

      await crear_practica({
        fk_matricula,
        fk_modalidad: Number(modalidadId),
        fecha_inicio:  fechaInicio,
        fecha_fin:     fechaFin,
        fk_empresa:    Number(empresaId),
        estado,
        observacion,
      });

      onSuccess();
      onClose();
    } catch (e) {
      setError("Error al crear la etapa práctica. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Filtra aprendices que aún no tienen práctica
  const aprendicesSinPractica = aprendices.filter((a) => !a.id_practica);

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center" size="lg">
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <span>Crear etapa práctica</span>
              <span className="text-xs text-gray-400 font-normal">
                Completa los datos para asignar la etapa práctica al aprendiz
              </span>
            </ModalHeader>

            <ModalBody className="flex flex-col gap-4">

              {loadingData ? (
                <p className="text-sm text-gray-400 text-center py-4">Cargando datos...</p>
              ) : (
                <>
                  {/* Aprendiz */}
                  <Select
                    label="Aprendiz"
                    placeholder="Selecciona un aprendiz"
                    variant="bordered"
                    selectedKeys={aprendizId ? [aprendizId] : []}
                    onSelectionChange={(keys) => {
                      setAprendizId(String(Array.from(keys)[0] ?? ""));
                      setError("");
                    }}
                  >
                    {aprendicesSinPractica.map((a) => (
                      <SelectItem key={String(a.id)} textValue={a.name}>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{a.name}</span>
                          <span className="text-xs text-gray-400">{a.programa}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </Select>

                  {/* Modalidad */}
                  <Select
                    label="Modalidad"
                    placeholder="Selecciona una modalidad"
                    variant="bordered"
                    selectedKeys={modalidadId ? [modalidadId] : []}
                    onSelectionChange={(keys) => {
                      setModalidadId(String(Array.from(keys)[0] ?? ""));
                      setError("");
                    }}
                  >
                    {modalidades.map((m) => (
                      <SelectItem key={String(m.id_modalida)}>
                        {m.nombre}
                      </SelectItem>
                    ))}
                  </Select>

                  {/* Empresa */}
                  <Select
                    label="Empresa"
                    placeholder="Selecciona una empresa"
                    variant="bordered"
                    selectedKeys={empresaId ? [empresaId] : []}
                    onSelectionChange={(keys) => {
                      setEmpresaId(String(Array.from(keys)[0] ?? ""));
                      setError("");
                    }}
                  >
                    {empresas.map((e) => (
                      <SelectItem key={String(e.id_empresa)}>
                        {e.nombre}
                      </SelectItem>
                    ))}
                  </Select>

                  {/* Fechas */}
                  <div className="flex gap-3">
                    <Input
                      label="Fecha inicio"
                      type="date"
                      variant="bordered"
                      value={fechaInicio}
                      onChange={(e) => { setFechaInicio(e.target.value); setError(""); }}
                      className="flex-1"
                    />
                    <Input
                      label="Fecha fin"
                      type="date"
                      variant="bordered"
                      value={fechaFin}
                      onChange={(e) => { setFechaFin(e.target.value); setError(""); }}
                      className="flex-1"
                    />
                  </div>

                  {/* Estado */}
                  <Select
                    label="Estado"
                    variant="bordered"
                    selectedKeys={[estado]}
                    onSelectionChange={(keys) =>
                      setEstado(String(Array.from(keys)[0] ?? "activa"))
                    }
                  >
                    <SelectItem key="activa">Activa</SelectItem>
                    <SelectItem key="inactiva">Inactiva</SelectItem>
                    <SelectItem key="suspendida">Suspendida</SelectItem>
                  </Select>

                  {/* Observación */}
                  <Textarea
                    label="Observación (opcional)"
                    placeholder="Escribe una observación inicial..."
                    variant="bordered"
                    minRows={3}
                    value={observacion}
                    onValueChange={(v) => setObservacion(v)}
                  />
                </>
              )}

              {error && (
                <p className="text-tiny text-danger">{error}</p>
              )}

            </ModalBody>

            <ModalFooter>
              <Button variant="flat" onPress={close} isDisabled={loading}>
                Cancelar
              </Button>
              <Button
                className="bg-gradient-to-r from-[#39A900] to-[#5cd600] text-white
                           hover:opacity-90 transition-all duration-200 font-medium"
                onPress={handleGuardar}
                isLoading={loading}
              >
                Crear etapa práctica
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}