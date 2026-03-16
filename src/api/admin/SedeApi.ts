import { conexionDb } from "../axiosClient";

export const listar_sedes    = async () => (await conexionDb.get("/sede/listar_jwsv")).data;
export const crear_sede      = async (d: any) => (await conexionDb.post("/sede/registrar_jwsv", d)).data;
export const actualizar_sede = async (id: number, d: any) => (await conexionDb.put(`/sede/actualizar_jwsv/${id}`, d)).data;
export const eliminar_sede   = async (id: number) => (await conexionDb.delete(`/sede/eliminar_jwsv/${id}`)).data;
