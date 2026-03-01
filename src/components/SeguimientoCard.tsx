import { Card, CardHeader, CardBody, Chip } from "@heroui/react";
import SeguimientoDropdown from "./SeguimientoDropdown";
import { Props } from "@/types/SeguimientoCard";


export default function SeguimientoCard({
  item,
  alumnoId,
  onDetalle,
  onEditar,
  refrescar,
}: Props) {
  return (
    <Card
      shadow="sm"
      isPressable
      onPress={() => onDetalle(item)}
      className="w-full"
    >
      <CardHeader className="flex justify-between items-center">
        <span className="font-semibold">Seguimiento</span>

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

          <SeguimientoDropdown
            item={item}
            alumnoId={alumnoId}
            onEditar={onEditar}
            refrescar={refrescar}
          />
        </div>
      </CardHeader>

      <CardBody>
        <p className="text-sm text-default-600">
          {item.observacion}
        </p>

        <div className="mt-2">
          {item.actas_pdf ? (
            <Chip color="success" size="sm" variant="flat">
              📎 Acta cargada
            </Chip>
          ) : (
            <Chip size="sm" variant="flat">
              Sin acta
            </Chip>
          )}
        </div>
      </CardBody>
    </Card>
  );
}