// api/ModalidadApi.ts
import { conexionDb1 } from "./axiosClient";

export const listar_modalidades = async () => {
  const { data } = await conexionDb1.get("/modalidad/listar");
  return data;
};