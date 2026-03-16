import { conexionDb } from "../axiosClient";

export const listar_areas_admin  = async () => (await conexionDb.get("/area/listar_jwsv")).data;
export const crear_area          = async (d: any) => (await conexionDb.post("/area/registrar_jwsv", d)).data;
export const actualizar_area     = async (id: number, d: any) => (await conexionDb.put(`/area/actualizar_jwsv/${id}`, d)).data;
export const eliminar_area       = async (id: number) => (await conexionDb.delete(`/area/eliminar_jwsv/${id}`)).data;
