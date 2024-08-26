export const convertirHora = (horaDecimal) => {
  const horas = Math.floor(horaDecimal);
  const minutos = (horaDecimal % 1) * 60;
  return `${horas}:${minutos === 0 ? "00" : minutos}`;
};

// Ejemplo: convertirHora(11.5) devolverá "11:30"
