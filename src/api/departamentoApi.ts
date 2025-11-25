
import conexionDb from "./axiosClient";


export const crearDepartamento= async(datos)=>{
    const responde= await conexionDb.post('/departamento/registrar_jwsv', datos)
    return responde.data

}