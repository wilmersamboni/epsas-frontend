import {conexionDb1} from "./axiosClient";

export const obtenerSeguimientos = async (datos) => {
  const response = await conexionDb1.get(`/seguimiento/listar`);
  return response.data;
};
