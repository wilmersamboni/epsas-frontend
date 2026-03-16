import React from "react";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, Textarea, Chip,
} from "@heroui/react";
import { actualizar_observacion } from "@/api/PracticaApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  alumno: any; // recibe el alumno completo para mostrar contexto
  onSucces: ()=> void
}

export default function ObservacionModal({ isOpen, onClose, alumno, onSucces }: Props) {
  const [texto, setTexto]     = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError]     = React.useState("");

  // Limpia el campo cada vez que se abre el modal
  React.useEffect(() => {
    if (isOpen) {
      setTexto("");
      setError("");
    }
  }, [isOpen]);

  const handleGuardar = async () => {
    if (!texto.trim()) {
      setError("La observación no puede estar vacía.");
      return;
    }
    setLoading(true);
    try {
      await actualizar_observacion(alumno.id_practica, texto.trim());
      onSucces()
      onClose();
    } catch (e) {
      setError("Error al guardar la observación. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center" size="md">
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Registrar observación
              {alumno && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-small font-normal text-default-500">
                    {alumno.name}
                  </span>
                  <Chip size="sm" variant="flat" color="default">
                    {alumno.programa}
                  </Chip>
                </div>
              )}
            </ModalHeader>

            <ModalBody>
              <Textarea
                label="Observación"
                placeholder="Escribe aquí la observación sobre la etapa práctica..."
                variant="bordered"
                minRows={4}
                value={texto}
                onValueChange={(v) => {
                  setTexto(v);
                  setError("");
                }}
                isInvalid={!!error}
                errorMessage={error}
                classNames={{ input: "resize-y" }}
              />
            </ModalBody>

            <ModalFooter>
              <Button variant="flat" onPress={close} isDisabled={loading}
              color="danger"
              >
                
                Cancelar
              </Button>
              <Button
                className="w-60 bg-gradient-to-r from-[#39A900] to-[#007832] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-[#007832] hover:to-[#00304D] transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                onPress={handleGuardar}
                isLoading={loading}
              >
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}