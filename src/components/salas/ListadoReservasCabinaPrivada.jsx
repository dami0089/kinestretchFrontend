import {
  Avatar,
  Button,
  CardBody,
  Progress,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

import React, { useEffect, useState } from "react";

import { eachDayOfInterval, addDays, format, subDays } from "date-fns";
import { es } from "date-fns/locale";
import useSalas from "@/hooks/useSalas";

const ListadoReservasCabinaPrivada = () => {
  const {
    reservasSalaCabina,
    obtenerSalaCabina,
    seleccionSala,
    setSeleccionSala,
  } = useSalas();

  const [semanaInicio, setSemanaInicio] = useState(new Date());
  const [renderizoListado, setRenderizoListado] = useState(false);
  const mesActual = format(semanaInicio, "MMMM", { locale: es }).toUpperCase();

  const lunes = addDays(semanaInicio, -semanaInicio.getDay() + 1);

  const diasSemana = eachDayOfInterval({
    start: lunes,
    end: addDays(lunes, 5),
  });

  const diasFormateados = diasSemana.map(
    (dia) => `${format(dia, "EEEE dd", { locale: es })}`
  );

  useEffect(() => {
    const obtenerInfo = async () => {
      await obtenerSalaCabina(lunes);
    };
    obtenerInfo();
  }, []);

  useEffect(() => {
    const obtenerInfo = async () => {
      if (renderizoListado) {
        await obtenerSalaCabina(lunes);
        setRenderizoListado(false);
      }
    };
    obtenerInfo();
  }, [renderizoListado]);

  const avanzarSemana = () => {
    setSemanaInicio((prevDate) => addDays(prevDate, 7));
    setRenderizoListado(true);
  };

  const retrocederSemana = () => {
    setSemanaInicio((prevDate) => subDays(prevDate, 7));
    setRenderizoListado(true);
  };

  return (
    <>
      <div className="mb-4 mt-5 flex items-center justify-between">
        <Typography className="mb-5 ml-4 text-xl font-bold">
          Cabina Privada - {mesActual}
        </Typography>
        <div>
          <Button className="mr-3" onClick={(e) => setSeleccionSala(1)}>
            Volver
          </Button>
          <Button className="mr-3" onClick={retrocederSemana}>
            -
          </Button>
          <Button onClick={avanzarSemana}>+</Button>
        </div>
      </div>

      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-50 py-3 px-6 text-center">
                Horas
              </th>
              {diasFormateados.map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-6 text-center"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-medium uppercase text-blue-gray-400"
                  >
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 20 }).map((_, halfHourIndex) => {
              const currentHour = 9 + Math.floor(halfHourIndex / 2);
              const currentMinute = halfHourIndex % 2 === 0 ? "00" : "30";
              const nextMinute = halfHourIndex % 2 === 0 ? "30" : "00";
              const nextHour =
                halfHourIndex % 2 === 0 ? currentHour : currentHour + 1;
              return (
                <tr key={halfHourIndex}>
                  <td className="border-b border-blue-gray-50 py-3 px-6 text-center">
                    {currentHour}:{currentMinute} - {nextHour}:{nextMinute} hs
                  </td>
                  {diasSemana.map((dia, diaIndex) => {
                    const reserva = reservasSalaCabina.find(
                      (reserva) =>
                        new Date(reserva.fechaReserva).getDay() === diaIndex &&
                        new Date(reserva.horaInicio).getHours() ===
                          currentHour &&
                        new Date(reserva.horaInicio).getMinutes() ===
                          parseInt(currentMinute)
                    );

                    return (
                      <td key={diaIndex} className="p-2">
                        {reserva ? (
                          <div className="m-2 rounded-lg bg-green-300 p-2 text-center font-bold shadow-md">
                            {reserva.nombreUsuario}
                            {/* Otras informaciones de la reserva */}
                          </div>
                        ) : (
                          <div className="m-2 rounded-lg bg-yellow-200 p-2 text-center font-bold shadow-md">
                            Sin reserva
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </>
  );
};

export default ListadoReservasCabinaPrivada;
