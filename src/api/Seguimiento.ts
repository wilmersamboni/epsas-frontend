import {conexionDb1} from "./axiosClient";

// export const obtenerSeguimiento = async (datos) => {
//   const response = await conexionDb1.get(`/seguimiento/listar`);
//   return response.data;
// };

export const obtenerSeguimientos = async (idAlumno: number) => {
  const response = await conexionDb1.get( `/seguimiento/listar/${idAlumno}`);
  
  return response.data;
};

export const actualizarSeguimiento= async(id_seguimiento: number, datos: { observacion: string })=>{
  const response = await conexionDb1.put(`/seguimiento/actualizar/${id_seguimiento}`, datos);
  return response.data;
}

export const subirActa = async (
  id: number,
  file: File
) => {
  const formData = new FormData();
  formData.append("acta", file);

  const response = await conexionDb1.put(
    `/seguimiento/acta/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};