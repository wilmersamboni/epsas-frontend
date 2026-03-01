import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { subirActa, obtenerSeguimientos } from "@/api/Seguimiento";
import { PropsDropdown } from "@/types/SeguimientoDropdown";


export default function SeguimientoDropdown({
  item,
  alumnoId,
  onEditar,
  refrescar,
}: PropsDropdown) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={(e) => e.stopPropagation()}
        >
          ⋮
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        onAction={async (key) => {
          if (key === "editar") onEditar(item);

          if (key === "subir") {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "application/pdf";

            input.onchange = async (e: any) => {
              const file = e.target.files[0];
              if (!file) return;

              await subirActa(
                item.id_seguimiento || item.id,
                file
              );

              refrescar();
            };

            input.click();
          }

          if (key === "descargar" && item.actas_pdf) {
            window.open(
              `http://localhost:3001/uploads/actas/${item.actas_pdf}`,
              "_blank"
            );
          }
        }}
      >
        <DropdownItem key="editar">
          ✏️ Observación
        </DropdownItem>

        <DropdownItem key="subir">
          📤 Subir Acta
        </DropdownItem>

        <DropdownItem
          key="descargar"
          isDisabled={!item.actas_pdf}
        >
          📥 Descargar Acta
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}