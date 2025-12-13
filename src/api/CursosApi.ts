import axios from "axios";
import conexionDb from "./axiosClient";

export const listar_cursos_area = async (id_area)=>{
    const responde = await conexionDb.get(`/curso/buscar_por_area/${id_area}`)
    return responde.data
}