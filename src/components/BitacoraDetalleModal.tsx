import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { DetalleBitacora } from "@/types/BitacoraDetalle";


export default function BitacoraDetalleModal({
  isOpen,
  onClose,
  bitacora,
}: DetalleBitacora) {
  const formatearFecha = (fecha: string) => {
    if (!fecha) return "Sin fecha";
    const date = new Date(fecha);
    return isNaN(date.getTime())
      ? "Fecha inválida"
      : date.toLocaleDateString("es-ES");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalContent>
        <ModalHeader>Detalle de Bitácora</ModalHeader>

        <ModalBody>
          {bitacora && (
            <>
              <p>
                <strong>Fecha:</strong>{" "}
                {formatearFecha(bitacora.fecha)}
              </p>

              <p>
                <strong>Estado:</strong> {bitacora.estado}
              </p>

              <p>
                <strong>Observación:</strong>
              </p>

              <p>{bitacora.observacion}</p>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}