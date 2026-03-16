import axios from 'axios';

const baseConfig = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // Esto envía las cookies automáticamente
    timeout: 5000,
};

// Instancia para Proyecto 1
export const conexionDb = axios.create({
    baseURL: "http://localhost:3000",
    ...baseConfig
});

// Instancia para Proyecto 2
export const conexionDb1 = axios.create({
    baseURL: "http://localhost:3001",
    ...baseConfig
});

conexionDb1.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default conexionDb;