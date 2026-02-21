import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@heroui/react";
import { obtenerSeguimientos } from "@/api/Seguimiento";
import { Card, CardHeader, CardBody, Chip } from "@heroui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  alumno: any;
}

export default function SeguimientosModal({ isOpen, onClose, alumno }: Props) {
  const [seguimientos, setSeguimientos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSeguimiento, setSelectedSeguimiento] =
    React.useState<any>(null);
  const [isSeguimientosOpen, setIsSeguimientosOpen] = useState(false);
  const [isDetalleOpen, setIsDetalleOpen] = useState(false);

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
  const formatearFecha = (fecha: string) => {
    if (!fecha) return "Sin fecha";

    const date = new Date(fecha);

    return isNaN(date.getTime())
      ? "Fecha inválida"
      : date.toLocaleDateString("es-ES");
  };

  const abrirDetalle = (item: any) => {
    setSelectedSeguimiento(item);

    onClose(); // 👈 cierra el modal actual

    setTimeout(() => {
      setIsDetalleOpen(true); // 👈 abre el nuevo
    }, 200);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          <ModalHeader>Seguimientos de {alumno?.name}</ModalHeader>

          <ModalBody>
            {loading ? (
              <Spinner label="Cargando..." />
            ) : seguimientos.length === 0 ? (
              <p>No hay seguimientos registrados</p>
            ) : (
              <div className="flex flex-col gap-4">
                {seguimientos.map((item) => (
                  <Card
                    key={item.id}
                    shadow="sm"
                    isPressable
                    onPress={() => abrirDetalle(item)}
                    className="w-full"
                  >
                    <CardHeader className="flex justify-between items-center">
                      <span className="font-semibold">
                        {formatearFecha(item.fecha)}
                      </span>

                      <Chip
                        color={
                          item.estado === "Activo"
                            ? "success"
                            : item.estado === "Pendiente"
                              ? "warning"
                              : "danger"
                        }
                        variant="flat"
                        size="sm"
                      >
                        {item.estado}
                      </Chip>
                    </CardHeader>

                    <CardBody>
                      <p>Observación:</p>
                      <p className="text-sm text-default-600">
                        {item.observacion}
                      </p>
                    </CardBody>
                  </Card>
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

      {/* Modal detalle */}
      <Modal
        isOpen={isDetalleOpen}
        onClose={() => setIsDetalleOpen(false)}
        size="md"
      >
        <ModalContent>
          <ModalHeader>Detalle del Seguimiento</ModalHeader>

          <ModalBody>
            {selectedSeguimiento && (
              <>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {formatearFecha(selectedSeguimiento.fecha)}
                </p>
                <p>
                  <strong>Estado:</strong> {selectedSeguimiento.estado}
                </p>
                <p>
                  <strong>Observación:</strong>
                </p>
                <p>{selectedSeguimiento.observacion}</p>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setIsDetalleOpen(false)}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
