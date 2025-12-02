
import conexionDb from "./axiosClient";


export const validarCredencial= async(credenciales)=>{
    const responde= await conexionDb.post('/token/generar_token_jwsv', credenciales)
    return responde.data

}