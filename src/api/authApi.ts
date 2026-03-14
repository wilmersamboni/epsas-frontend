import axiosClient from "./axiosClient";

export const solicitarRecuperacion = async (correo: string) => {
    const resp = await axiosClient.post("/departamento/recuperar/solicitar", { correo });
    return resp.data;
};

export const verificarCodigo = async (correo: string, codigo: string) => {
    const resp = await axiosClient.post("/departamento/recuperar/verificar", { correo, codigo });
    return resp.data;
};

export const cambiarPassword = async (correo: string, codigo: string, nuevoPassword: string) => {
    const resp = await axiosClient.post("/departamento/recuperar/cambiar", { correo, codigo, nuevoPassword });
    return resp.data;
};
