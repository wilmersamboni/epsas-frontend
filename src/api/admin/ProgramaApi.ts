import { conexionDb } from "../axiosClient";

export const listar_programas    = async () => (await conexionDb.get("/programa/listar_jwsv")).data;
export const crear_programa      = async (d: any) => (await conexionDb.post("/programa/registrar_jwsv", d)).data;
export const actualizar_programa = async (id: number, d: any) => (await conexionDb.put(`/programa/actualizar_jwsv/${id}`, d)).data;
export const eliminar_programa   = async (id: number) => (await conexionDb.delete(`/programa/eliminar_jwsv/${id}`)).data;
