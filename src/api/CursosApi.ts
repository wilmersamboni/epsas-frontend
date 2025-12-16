import axios from "axios";
import conexionDb from "./axiosClient";

export const listar_cursos_area = async (id_area)=>{
    const responde = await conexionDb.get(`/curso/buscar_por_area/${id_area}`)
    return responde.data
}

export const actualizar_curso= async(id_curso:Number, datos)=>{
    const responde= await conexionDb.put(`curso/actualizar_jwsv/${id_curso}`, datos)
    return responde.data
}
export const eliminar_curso= async(id_curso:Number)=>{
    const responde= await conexionDb.delete(`curso/eliminar_jwsv/${id_curso}`)
    return responde.data
}

export const listar_programas = async(datos)=>{
    const responde = await conexionDb.get('programa/listar_jwsv',datos)
    return responde.data
}