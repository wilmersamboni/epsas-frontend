import React from "react";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button,
} from "@heroui/react";
import { crearBitacoraArchivo } from "@/api/Bitacoras";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  seguimiento: any;
  onSuccess: () => void;
}

export default function SubirBitacoraModal({ isOpen, onClose, seguimiento, onSuccess }: Props) {
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const [fecha, setFecha]         = React.useState(getTodayDate());
  const [archivo, setArchivo]     = React.useState<File | null>(null);
  const [loading, setLoading]     = React.useState(false);
  const [error, setError]         = React.useState("");
  const fileInputRef              = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setFecha(getTodayDate());
      setArchivo(null);
      setError("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && file.type !== "application/pdf") {
      setError("Solo se permiten archivos PDF.");
      setArchivo(null);
      return;
    }
    setArchivo(file);
    setError("");
  };

  const handleGuardar = async () => {
    if (!archivo) { setError("Selecciona un archivo PDF."); return; }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("archivo",        archivo);
      formData.append("fecha",          fecha);
      formData.append("fk_seguimiento", String(seguimiento?.id || seguimiento?.id_seguimiento));
      formData.append("estado",         "pendiente");

      await crearBitacoraArchivo(formData);
      onSuccess();
      onClose();
    } catch (e) {
      setError("Error al subir la bitácora. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center" size="md">
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader>Subir bitácora</ModalHeader>

            <ModalBody className="flex flex-col gap-4">

              {/* Fecha — solo lectura, es la actual */}
              <div className="flex flex-col gap-1">
                <span className="text-small text-default-500">Fecha</span>
                <span className="text-small font-medium">{fecha}</span>
              </div>

              {/* Selector de archivo */}
              <div className="flex flex-col gap-2">
                <span className="text-small text-default-500">Archivo PDF</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className=" shadow-lg rounded-xl text-small text-default-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-medium file:border-0 file:text-small file:bg-default-100 file:text-default-700 hover:file:bg-default-200 cursor-pointer"
                />
                {archivo && (
                  <span className="text-tiny text-success">
                    ✓ {archivo.name}
                  </span>
                )}
              </div>

              {error && (
                <p className="text-tiny text-danger">{error}</p>
              )}

            </ModalBody>

            <ModalFooter>
              <Button variant="flat" onPress={close} isDisabled={loading}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleGuardar} isLoading={loading}>
                
                Subir
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}