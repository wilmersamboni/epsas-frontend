import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";

interface AreaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  area?: {
    id_area?: number;
    nombre?: string;
  };
}

export default function AreaFormModal({
  isOpen,
  onClose,
  area,
}: AreaFormModalProps) {
  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {area?.id_area ? "Editar Área" : "Nueva Área"}
            </ModalHeader>

            <ModalBody>
              <Input
                label="Nombre del área"
                placeholder="Ingrese el nombre"
                variant="bordered"
                defaultValue={area?.nombre}
              />
            </ModalBody>

            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Cancelar
              </Button>

              <Button color="primary" onPress={onClose}>
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
