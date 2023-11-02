import { format, parseISO, isValid } from "date-fns";
import { es } from "date-fns/locale";

export const formatearFecha = (dateString) => {
  try {
    // Asegúrate de que la fecha incluya la información de la zona horaria de Buenos Aires
    // Tomamos solo la parte de la fecha (año, mes, día)
    const [year, month, day] = dateString.split("T")[0].split("-");

    // Devolvemos en formato DD/MM/YYYY
    return `${day}-${month}-${year}`;
  } catch (error) {
    console.error("Error al formatear fecha:", error);
    return "Error al formatear fecha";
  }
};
