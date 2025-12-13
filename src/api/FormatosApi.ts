import axios from "axios";

const API_URL = "http://localhost:3000/api/formatos";

export const listarFormatos = async () => {
  const response = await axios.get(API_URL);
  return response.data; 
};

export const subirFormato = async (nombre: string, archivo: File) => {
  const formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("archivo", archivo);

  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};


export const descargarFormato = (archivo: string) => {
  window.open(`http://localhost:3000/uploads/${archivo}`, "_blank");
};


export const eliminarFormato = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};


export const actualizarFormato = async (
  id: number,
  nombre: string,
  archivo?: File
) => {
  const formData = new FormData();
  formData.append("nombre", nombre);

  if (archivo) {
    formData.append("archivo", archivo);
  }

  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};