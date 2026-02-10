//import 'axios' from "axios";
import { id } from "zod/v4/locales";
import conexionDb from "./axiosClient";

export const  listar_matriculas = async(datos)=>{
    const responde = await conexionDb.get(`matricula/listar_jwsv`, datos)
    return responde.data
}

export const buscar_matricula_curso = async(id_curso:Number)=>{
    const responde = await conexionDb.get(`curso/buscar_matricula_persona/${id_curso}`)
    return responde.data
}