export const formatearFechaInputs = (fecha) => {
  // Crear un objeto Date a partir de la fecha (tratando la fecha como UTC)
  const dateObj = new Date(fecha);

  // Obtener la fecha en UTC
  const year = dateObj.getUTCFullYear();
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0"); // getUTCMonth() devuelve un índice basado en 0
  const day = dateObj.getUTCDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};
