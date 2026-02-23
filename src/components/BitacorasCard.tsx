import React from "react";
import { Card, CardHeader, CardBody, Chip } from "@heroui/react";

interface Props {
  item: any;
  onClick: (item: any) => void;
}

export default function BitacorasCard({ item, onClick }: Props) {
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
      </CardBody>
    </Card>
  );
}