import { conexionDb } from "../axiosClient";

export const listar_credenciales  = async () => (await conexionDb.get("/credencial/listar_jwsv")).data;
export const crear_credencial     = async (d: any) => (await conexionDb.post("/credencial/registrar_jwsv", d)).data;
export const eliminar_credencial  = async (id: number) => (await conexionDb.delete(`/credencial/eliminar_jwsv/${id}`)).data;
export const actualizar_credencial = async (id: number, d: any) =>
  (await conexionDb.put(`/credencial/actualizar_jwsv/${id}`, d)).data;