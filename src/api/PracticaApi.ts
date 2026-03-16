// api/PracticaApi.ts
import { conexionDb1 } from "./axiosClient";

export const actualizar_observacion = async (id_etapa_practica: number, observacion: string) => {
  const { data } = await conexionDb1.patch(`practica/observacion/${id_etapa_practica}`, { observacion });
  return data;
};

export const buscar_practica_por_matricula = async (fk_matricula: number) => {
  try {
    const { data } = await conexionDb1.get(`/practica/buscar_matricula/${fk_matricula}`);
    return data;
  } catch {
    return null; // si no tiene práctica retorna null
  }
};

export const listar_practicas = async () => {
  try {
    const { data } = await conexionDb1.get("/practica/listar");
    return data;
  } catch {
    return [];
  }
};


// api/PracticaApi.ts — agrega esta función
export const crear_practica = async (datos: {
  fk_matricula: number;
  fk_modalidad: number;
  fecha_inicio: string;
  fecha_fin: string;
  fk_empresa: number;
  estado: string;
  observacion: string;
}) => {
  const { data } = await conexionDb1.post("/practica/registrar", datos);
  return data;
};