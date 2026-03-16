//import 'axios' from "axios";

import conexionDb from "./axiosClient";

export const  listar_matriculas = async(datos)=>{
    const responde = await conexionDb.get(`matricula/listar_jwsv`, datos)
    return responde.data
}

export const buscar_matricula_curso = async(id_curso:Number)=>{
    const responde = await conexionDb.get(`curso/buscar_matricula_persona/${id_curso}`)
    return responde.data
}


export const listar_matriculas_por_alumno = async (id_alumno: number) => {
  try {
    const { data } = await conexionDb.get(`/matricula/por-alumno/${id_alumno}`);
    return data; // retorna [{ id_matricula: 1 }, { id_matricula: 2 }]
  } catch {
    return []; // si no tiene matrícula retorna vacío
  }
};