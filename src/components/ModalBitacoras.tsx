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
import SubirBitacoraModal from "./SubirBitacoraModal";


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
  const [isSubirOpen, setIsSubirOpen] = useState(false)

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
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            Bitácoras de {alumno?.name}
          </ModalHeader>

          <ModalBody className="overflow-y-auto max-h-[60vh]">
  {loading ? (
    <Spinner label="Cargando..." />
  ) : bitacoras.length === 0 ? (
    <p>No hay bitácoras registradas</p>
  ) : (
    <div className="grid grid-cols-2 gap-4">
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
  <Button color="primary" onPress={() => setIsSubirOpen(true)}
    className="bg-gradient-to-r from-[#39A900] to-[#5cd600] 
             hover:from-[#5cd600] hover:to-[#39A900]
             transition-all duration-300 
             hover:-translate-y-0.5 
             hover:shadow-lg hover:shadow-[#39A900]/40
             active:scale-95 text-white"
    >
    Subir bitácora
  </Button>
</ModalFooter>
        </ModalContent>
      </Modal>

      <BitacoraDetalleModal
        isOpen={isDetalleOpen}
        onClose={() => setIsDetalleOpen(false)}
        bitacora={selectedBitacora}
      />

      <SubirBitacoraModal
  isOpen={isSubirOpen}
  onClose={() => setIsSubirOpen(false)}
  seguimiento={seguimiento}
  onSuccess={cargarBitacoras}
/>
    </>
  );
}