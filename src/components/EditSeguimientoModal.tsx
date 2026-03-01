import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@heroui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  seguimiento: any;
  setSeguimiento: (value: any) => void;
  onGuardar: () => void;
}

export default function EditSeguimientoModal({
  isOpen,
  onClose,
  seguimiento,
  setSeguimiento,
  onGuardar,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalContent>
        <ModalHeader>Editar Seguimiento</ModalHeader>

        <ModalBody>
          {seguimiento && (
            <Textarea
              label="Observación"
              value={seguimiento?.observacion || ""}
              onChange={(e) =>
                setSeguimiento({
                  ...seguimiento,
                  observacion: e.target.value,
                })
              }
            />
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancelar
          </Button>

          <Button color="primary" onPress={onGuardar}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}