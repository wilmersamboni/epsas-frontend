import { conexionDb1 } from "./axiosClient";

export const obtenerBitacoras = async (idSeguimiento: number) => {
  const response = await conexionDb1.get(
    `/bitacora/listar/${idSeguimiento}`
  );
  return response.data;
};