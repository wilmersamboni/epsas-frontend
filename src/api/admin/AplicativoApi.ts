import { conexionDb } from "../axiosClient";
export const listar_aplicativos = async () => (await conexionDb.get("/aplicativo/listar_jwsv")).data;
