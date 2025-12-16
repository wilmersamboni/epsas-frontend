import { useState } from "react";
import { actualizarFormato } from "../api/FormatosApi";

interface Props {
  formato: any;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditarFormatoModal({
  formato,
  onClose,
  onUpdated,
}: Props) {
  const [nombre, setNombre] = useState(formato.nombre);
  const [archivo, setArchivo] = useState<File | null>(null);

  const handleSubmit = async () => {
    await actualizarFormato(formato.id_formatos, nombre, archivo || undefined);
    onUpdated();
    onClose();
  };

  return (
    <div style={{ border: "1px solid black", padding: 20 }}>
      <h3> Editar Formato</h3>

      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <br /><br />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setArchivo(e.target.files?.[0] || null)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}
