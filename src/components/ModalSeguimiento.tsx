import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Textarea
} from "@heroui/react";
import { obtenerSeguimientos } from "@/api/Seguimiento";
import { Card, CardHeader, CardBody, Chip } from "@heroui/react";
import BitacorasModal from "./ModalBitacoras";

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
  const [isDetalleOpen, setIsDetalleOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
const [seguimientoEditando, setSeguimientoEditando] = useState<any>(null);

  useEffect(() => {
    const cargarSeguimientos = async () => {
      if (!alumno) return;

      setLoading(true);
      try {
        // 🔥 Aquí haces tu petición real
        const data = await obtenerSeguimientos(alumno.id);
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
  setIsDetalleOpen(true);
};

const guardarCambios = async () => {
  try {
    await actualizarSeguimiento(seguimientoEditando.id, seguimientoEditando);
    setIsEditOpen(false);

    // refrescar lista
    const data = await obtenerSeguimientos(alumno.id);
    setSeguimientos(data);

  } catch (error) {
    console.error("Error actualizando", error);
  }
};
const abrirEditar = (item: any) => {
  setSeguimientoEditando(item);
  setIsEditOpen(true);
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
      Seguimientos
    </span>

    <div className="flex items-center gap-2">

      <Chip
        color={
          item.estado === "activo"
            ? "success"
            : item.estado === "pendiente"
            ? "warning"
            : "danger"
        }
        variant="flat"
        size="sm"
      >
        {item.estado}
      </Chip>

      <Dropdown>
  <DropdownTrigger>
    <Button
      isIconOnly
      size="sm"
      variant="light"
      onPress={(e) => {
        e.stopPropagation(); // 🔥 evita que la card se dispare
      }}
    >
      ⋮
    </Button>
  </DropdownTrigger>

  <DropdownMenu
  aria-label="Opciones"
  onAction={(key) => {
    if (key === "ver") abrirDetalle(item);
    if (key === "editar") abrirEditar(item);
  }}
>
  {/* <DropdownItem key="ver">Ver detalle</DropdownItem> */}
  <DropdownItem key="editar">Observacion</DropdownItem>
  <DropdownItem
    key="eliminar"
    className="text-danger"
    color="danger"
  >
    Eliminar
  </DropdownItem>
</DropdownMenu>
</Dropdown>

    </div>

  </CardHeader>

  <CardBody>
    <label htmlFor="">Observacion:</label>
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
      {selectedSeguimiento && (
  <BitacorasModal
    isOpen={isDetalleOpen}
    onClose={() => setIsDetalleOpen(false)}
    alumno={alumno}
    seguimiento={selectedSeguimiento}
  />
)}
<Modal
  isOpen={isEditOpen}
  onClose={() => setIsEditOpen(false)}
  size="md"
>
  <ModalContent>
    <ModalHeader>Editar Seguimiento</ModalHeader>

    <ModalBody>
      {seguimientoEditando && (
        <div className="flex flex-col gap-4">

          <Textarea
  label="Observación"
  value={seguimientoEditando?.observacion || ""}
  onChange={(e) =>
    setSeguimientoEditando({
      ...seguimientoEditando,
      observacion: e.target.value,
    })
  }
/>
        </div>
      )}
    </ModalBody>

    <ModalFooter>
      <Button
        variant="light"
        onPress={() => setIsEditOpen(false)}
      >
        Cancelar
      </Button>

      <Button
        color="primary"
        onPress={guardarCambios}
      >
        Guardar
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
  );
}
