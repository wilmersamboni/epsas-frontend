import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner
} from "@heroui/react";
import { obtenerSeguimientos } from "@/api/Seguimiento";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  alumno: any;
}

export default function SeguimientosModal({ isOpen, onClose, alumno }: Props) {

  const [seguimientos, setSeguimientos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cargarSeguimientos = async () => {
      if (!alumno) return;

      setLoading(true);
      try {
        // 🔥 Aquí haces tu petición real
        const data = await obtenerSeguimientos(alumno.id);
        setSeguimientos(data);

        setSeguimientos(data);
      } catch (error) {
        console.error("Error cargando seguimientos", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      cargarSeguimientos();
    }
  }, [isOpen, alumno]);

  return (
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
            <div className="flex flex-col gap-3">
              {seguimientos.map((item, index) => (
                <div
                  key={index}
                  className="border p-3 rounded-lg shadow-sm"
                >
                  <p><strong>Fecha:</strong> {item.fecha}</p>
                  <p><strong>Observación:</strong> {item.observacion}</p>
                  <p><strong>Estado:</strong> {item.estado}</p>
                </div>
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
  );
}
