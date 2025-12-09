import axios from "axios";
import conexionDb from "./axiosClient";

export const listar_cursos_area = async (datos)=>{
    const responde = await conexionDb.get('/curso/listar_jwsv', datos)
    return responde.data
}