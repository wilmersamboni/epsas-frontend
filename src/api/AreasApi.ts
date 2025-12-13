
import conexionDb from "./axiosClient";


export const listar_areas= async(datos)=>{
    const responde= await conexionDb.get('/area/listar_jwsv', datos)
    return responde.data

}