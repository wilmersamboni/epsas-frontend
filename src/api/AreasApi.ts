
import conexionDb from "./axiosClient";


export const listar_areas= async(datos)=>{
    const responde= await conexionDb.get('/area/listar_jwsv', datos)
    return responde.data

}

export const actualizar_area= async(id_area, datos)=>{
    const responde = await conexionDb.put(`/area/actualizar_jwsv/${id_area}`,datos)
    return responde.data
}