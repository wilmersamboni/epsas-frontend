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