import { conexionDb } from "../axiosClient";

export const listar_cursos    = async () => (await conexionDb.get("/curso/listar_jwsv")).data;
export const crear_curso      = async (d: any) => (await conexionDb.post("/curso/registrar_jwsv", d)).data;
export const actualizar_curso = async (id: number, d: any) => (await conexionDb.put(`/curso/actualizar_jwsv/${id}`, d)).data;
export const eliminar_curso   = async (id: number) => (await conexionDb.delete(`/curso/eliminar_jwsv/${id}`)).data;
