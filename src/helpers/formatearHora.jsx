export const formatearHora = (fecha) => {
  const nuevaFecha = new Date(fecha);

  const opciones = {
    hour: "numeric",
    minute: "numeric",
  };

  return nuevaFecha.toLocaleTimeString("es-ES", opciones);
};
