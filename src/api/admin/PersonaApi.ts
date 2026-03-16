import { conexionDb } from "../axiosClient";

export const listar_personas    = async () => (await conexionDb.get("/persona/listar_jwsv")).data;
export const crear_persona      = async (d: any) => (await conexionDb.post("/persona/registrar_jwsv", d)).data;
export const actualizar_persona = async (id: number, d: any) => (await conexionDb.put(`/persona/actualizar_jwsv/${id}`, d)).data;
export const eliminar_persona   = async (id: number) => (await conexionDb.delete(`/persona/eliminar_jwsv/${id}`)).data;
