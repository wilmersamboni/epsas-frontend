import conexionDb from "./axiosClient";

export const listar_personas= async(datos)=>{
    const responde = await conexionDb.get('/persona/listar_jwsv', datos)
    return responde.data
}

export const listar_aprendices = async () => {

  const response = await conexionDb.get("persona/aprendices")

  return response.data;
};