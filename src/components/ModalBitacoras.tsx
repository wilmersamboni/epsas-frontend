import{ useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@heroui/react";
import { obtenerBitacoras } from "@/api/Bitacoras";
import BitacorasCard from "./BitacorasCard";
import BitacoraDetalleModal from "./BitacoraDetalleModal";
import { PropsBitacora } from "@/types/ModalBitacora";


export default function BitacorasModal({
  isOpen,
  onClose,
  alumno,
  seguimiento,
}: PropsBitacora) {
  const [bitacoras, setBitacoras] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBitacora, setSelectedBitacora] = useState<any>(null);
  const [isDetalleOpen, setIsDetalleOpen] = useState(false);

  const cargarBitacoras = async () => {
  if (!seguimiento) return;

  const seguimientoId =
    seguimiento.id || seguimiento.id_seguimiento;

  if (!seguimientoId) return;

  setLoading(true);
  try {
    const data = await obtenerBitacoras(seguimientoId);
    setBitacoras(data);
  } catch (error) {
    console.error("Error cargando bitácoras", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (isOpen) {
    cargarBitacoras();
  }
}, [isOpen, seguimiento]);

  const abrirDetalle = (item: any) => {
    setSelectedBitacora(item);
    setIsDetalleOpen(true);
  };
console.log("Render bitacoras:", bitacoras);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          <ModalHeader>
            Bitácoras de {alumno?.name}
          </ModalHeader>

          <ModalBody>
            {loading ? (
              <Spinner label="Cargando..." />
            ) : bitacoras.length === 0 ? (
              <p>No hay bitácoras registradas</p>
            ) : (
              <div className="flex flex-col gap-4">
                {bitacoras.map((item) => (
 <BitacorasCard
  key={item.id_bitacora}
  item={item}
  onClick={abrirDetalle}
  recargarBitacoras={cargarBitacoras}
/>
))}
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <BitacoraDetalleModal
        isOpen={isDetalleOpen}
        onClose={() => setIsDetalleOpen(false)}
        bitacora={selectedBitacora}
      />
    </>
  );
}