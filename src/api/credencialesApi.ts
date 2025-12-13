import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
});

export type Usuario = {
  nombre?: string;
  cargo?: string;
};

export type LoginResponse = {
  token: string;
  usuario: Usuario;
};

export const validarCredencial = async (data: {
  login: string;
  password: string;
}): Promise<LoginResponse> => {
  const resp = await axiosClient.post<LoginResponse>(
    "/token/generar_token_jwsv",
    data
  );
  return resp.data;
};
