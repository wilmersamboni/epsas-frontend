import { conexionDb } from "../axiosClient";

export const listar_matriculas    = async () => (await conexionDb.get("/matricula/listar_jwsv")).data;
export const crear_matricula = async (d: any) => {
  const fk_persona = Number(d.fk_persona);
  const fk_curso   = Number(d.fk_curso);

  if (isNaN(fk_persona) || isNaN(fk_curso)) {
    throw new Error("Selecciona una persona y un curso válidos.");
  }

  const { data } = await conexionDb.post("/matricula/registrar_jwsv", {
    fk_persona,
    fk_curso,
  });
  return data;
};
export const actualizar_matricula = async (id: number, d: any) => (await conexionDb.put(`/matricula/actualizar_jwsv/${id}`, d)).data;
export const eliminar_matricula   = async (id: number) => (await conexionDb.delete(`/matricula/eliminar_jwsv/${id}`)).data;
