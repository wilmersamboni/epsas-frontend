
import conexionDb from "./axiosClient";

export const listar_sede = async (id_sede)=>{
    const responde = await conexionDb.get("/sede/listar_jwsv", id_sede)
    return responde.data
}