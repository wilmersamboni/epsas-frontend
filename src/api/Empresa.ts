// api/EmpresaApi.ts
import { conexionDb1 } from "./axiosClient";

export const listar_empresas = async () => {
  const { data } = await conexionDb1.get("/empresa/listar");
  return data;
};