import React from "react";
import { Card, CardHeader, CardBody, Chip, Button, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@heroui/react";
import { actualizarEstadoBitacora } from "@/api/Bitacoras";
import { Props } from "@/types/BitacorasCard";

export default function BitacorasCard({ item, onClick, recargarBitacoras }: Props) {
  const formatearFecha = (fecha: string) => {
    if (!fecha) return "Sin fecha";
    const date = new Date(fecha);
    return isNaN(date.getTime())
      ? "Fecha inválida"
      : date.toLocaleDateString("es-ES");
  };

  return (
    <Card
      shadow="sm"
      isPressable
      onPress={() => onClick(item)}
      className="w-full"
    >
      <CardHeader className="flex justify-between items-center">
        <span className="font-semibold">
          {formatearFecha(item.fecha)}
        </span>

        <Chip
          color={
            item.estado === "aceptada"
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
      </CardHeader>

      <CardBody>
        <p className="text-sm text-default-600">
          {item.bitacora_pdf}
        </p>
       <Dropdown>
  <DropdownTrigger>
    <Button 
      size="sm" 
      variant="flat" 
      color="primary"
      className="font-medium mt-5"
    >
      Evaluar Bitacora
    </Button>
  </DropdownTrigger>

  <DropdownMenu
    aria-label="Cambiar estado de bitácora"
    disallowEmptySelection
    selectionMode="single"
    selectedKeys={[item.estado]}
    onAction={async (key) => {
      try {
        const nuevoEstado = String(key);

        await actualizarEstadoBitacora(
          item.id_bitacora,
          nuevoEstado
        );

        recargarBitacoras();

      } catch (error) {
        console.error("Error actualizando estado:", error);
      }
    }}
  >
    <DropdownItem 
      key="pendiente"
      color="warning"
      className="text-warning font-medium"
    >
      🕒 Pendiente
    </DropdownItem>

    <DropdownItem 
      key="aceptada"
      color="success"
      className="text-success font-medium"
    >
      ✅ Aceptar
    </DropdownItem>

    <DropdownItem 
      key="rechazada"
      color="danger"
      className="text-danger font-medium"
    >
      ❌ Rechazar
    </DropdownItem>
  </DropdownMenu>
</Dropdown>
      </CardBody>
    </Card>
  );
}