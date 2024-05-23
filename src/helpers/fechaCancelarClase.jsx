export const fechaCancelarClase = (fecha) => {
  // Crear un objeto Date a partir de la fecha (tratando la fecha como UTC)
  const dateObj = new Date(fecha);

  // Obtener el día y el mes en UTC
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0"); // getUTCMonth() devuelve un índice basado en 0
  const day = dateObj.getUTCDate().toString().padStart(2, "0");

  return `${day}-${month}`;
};
