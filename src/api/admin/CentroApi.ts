import { conexionDb } from "../axiosClient";

export const listar_centros    = async () => (await conexionDb.get("/centro/listar_jwsv")).data;
export const crear_centro      = async (d: any) => (await conexionDb.post("/centro/registrar_jwsv", d)).data;
export const actualizar_centro = async (id: number, d: any) => (await conexionDb.put(`/centro/actualizar_jwsv/${id}`, d)).data;
export const eliminar_centro   = async (id: number) => (await conexionDb.delete(`/centro/elimimar_jwsv/${id}`)).data;