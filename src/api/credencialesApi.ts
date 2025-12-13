import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export type Usuario = {
  nombre?: string;
  cargo?: string;
};

export type LoginResponse = {
  
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
