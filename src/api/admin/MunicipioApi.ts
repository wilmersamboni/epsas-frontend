import { conexionDb } from "../axiosClient";
export const listar_municipios = async () => (await conexionDb.get("/municipio/listar_jwsv")).data;
