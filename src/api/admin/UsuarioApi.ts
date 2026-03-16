import { conexionDb } from "../axiosClient";

export const listar_usuarios    = async () => (await conexionDb.get("/usuario/listar_jwsv")).data;
export const crear_usuario      = async (d: any) => (await conexionDb.post("/usuario/registrar_jwsv", d)).data;
export const eliminar_usuario   = async (id: number) => (await conexionDb.delete(`/usuario/eliminar_jwsv/${id}`)).data;
export const actualizar_usuario = async (id: number, d: any) =>
  (await conexionDb.put(`/usuario/actualizar_jwsv/${id}`, d)).data;
