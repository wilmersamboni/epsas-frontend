import  { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@heroui/react";

import { obtenerSeguimientos, actualizarSeguimiento } from "@/api/Seguimiento";
import BitacorasModal from "./ModalBitacoras";
import SeguimientoCard from "./SeguimientoCard";
import EditSeguimientoModal from "./EditSeguimientoModal";

import { Props } from "@/types/ModalSeguimiento";

export default function SeguimientosModal({
  isOpen,
  onClose,
  alumno,
  onReopen,
}: Props) {
  const [seguimientos, setSeguimientos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSeguimiento, setSelectedSeguimiento] =
    useState<any>(null);
  const [seguimientoEditando, setSeguimientoEditando] =
    useState<any>(null);

  const [isDetalleOpen, setIsDetalleOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // 🔄 Cargar seguimientos
  const cargarSeguimientos = async () => {
    if (!alumno) return;

    setLoading(true);
    try {
      const data = await obtenerSeguimientos(alumno.id);
      setSeguimientos(data);
    } catch (error) {
      console.error("Error cargando seguimientos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      cargarSeguimientos();
    }
  }, [isOpen, alumno]);

  // 📄 Abrir detalle
  const abrirDetalle = (item: any) => {
    setSelectedSeguimiento(item);
    setIsDetalleOpen(true);
    onClose();
  };

  // ✏️ Abrir edición
  const abrirEditar = (item: any) => {
    setSeguimientoEditando(item);
    setIsEditOpen(true);
  };

  // 💾 Guardar cambios observación
  const guardarCambios = async () => {
    try {
      const id =
        seguimientoEditando.id_seguimiento ||
        seguimientoEditando.id;

      await actualizarSeguimiento(id, {
        observacion: seguimientoEditando.observacion,
      });

      await cargarSeguimientos();
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error actualizando:", error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          <ModalHeader>
            Seguimientos de {alumno?.name}
          </ModalHeader>

          <ModalBody>
            {loading ? (
              <Spinner label="Cargando..." />
            ) : seguimientos.length === 0 ? (
              <p>No hay seguimientos registrados</p>
            ) : (
              <div className="flex flex-col gap-4">
                {seguimientos.map((item) => (
                  <SeguimientoCard
                    key={item.id_seguimiento || item.id}
                    item={item}
                    alumnoId={alumno.id}
                    onDetalle={abrirDetalle}
                    onEditar={abrirEditar}
                    refrescar={cargarSeguimientos}
                  />
                ))}
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={onClose}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 📘 Modal Bitácoras */}
      {selectedSeguimiento && (
        <BitacorasModal
          isOpen={isDetalleOpen}
          onClose={() => {setIsDetalleOpen(false);
            onReopen?.()
          }}
          alumno={alumno}
          seguimiento={selectedSeguimiento}
        />
      )}

      {/* ✏️ Modal Editar Observación */}
      <EditSeguimientoModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        seguimiento={seguimientoEditando}
        setSeguimiento={setSeguimientoEditando}
        onGuardar={guardarCambios}
      />
    </>
  );
}