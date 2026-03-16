import { conexionDb1 } from "./axiosClient";

export const obtenerBitacoras = async (idSeguimiento: number) => {
  const response = await conexionDb1.get(
    `/bitacora/listar/${idSeguimiento}`
  );
  return response.data;
};

export const actualizarEstadoBitacora= async(id_bitacora: number, estado: string)=>{
  const responde = await conexionDb1.put(`bitacora/estado/${id_bitacora} `, {estado})
  return responde.data
}

export const crearBitacora = async (datos: {
  fecha: string;
  bitacora_pdf: string;
  fk_seguimiento: number;
  estado: string;
}) => {
  const response = await conexionDb1.post("/bitacora/registrar", datos);
  return response.data;
};

export const crearBitacoraArchivo = async (formData: FormData) => {
  const response = await conexionDb1.post("/bitacora/registrar_archivo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};