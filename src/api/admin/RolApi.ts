import { conexionDb } from "../axiosClient";

export const listar_roles = async () => (await conexionDb.get("/rol/listar_jwsv")).data;