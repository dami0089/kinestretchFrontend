import axios from "axios";

const clienteAxios = axios.create({
  // baseURL: `/api`,
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

clienteAxios.interceptors.request.use((config) => {
  // console.log(`Realizando consulta a: ${config.url}`);
  return config;
});

export default clienteAxios;
