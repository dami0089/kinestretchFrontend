import React, { useEffect } from "react";
import { DateTime } from "luxon";
import { Typography } from "@material-tailwind/react";
import useClases from "@/hooks/useClases";
import useAuth from "@/hooks/useAuth";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Cargando from "../Cargando";
import { convertirHora } from "@/helpers/convertirHora";

const ClasesProfesor = () => {
  const {
    clasesProfe,
    obtenerClasesProfeDia,
    limpiarAsistencias,
    diaSeleccionado,
    setDiaSeleccionado,
  } = useClases();
  const { handleCargando } = useAuth();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const diasDeLaSemana = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  function removerAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const diaActual = removerAcentos(
    capitalizeFirstLetter(
      DateTime.now().setZone("America/Argentina/Buenos_Aires").weekdayLong
    )
  );

  const seleccionarDia = (dia) => {
    setDiaSeleccionado(dia);
  };

  useEffect(() => {
    const limpiarAsist = async () => {
      await limpiarAsistencias(diaActual);
      setDiaSeleccionado(diaActual);
    };
    limpiarAsist();
  }, []);

  useEffect(() => {
    const traerInfo = async () => {
      if (diaSeleccionado !== "") {
        handleCargando();
        await obtenerClasesProfeDia(auth._id, diaSeleccionado);
        handleCargando();
      }
    };
    traerInfo();
  }, [diaSeleccionado]);

  const handleVerClase = (e, _id, dia, hora, sede) => {
    e.preventDefault();
    navigate(`/clase/${_id}`);
  };

  return (
    <>
      <div className="mb-8 mt-8 flex h-full justify-center">
        {/* Para dispositivos móviles: menú desplegable */}
        <select
          onChange={(e) => seleccionarDia(e.target.value)}
          className="rounded-md bg-gray-200 px-3 py-2 hover:bg-gray-300 md:hidden"
        >
          {diasDeLaSemana.map((dia) => (
            <option
              key={dia}
              value={dia}
              className={
                diaSeleccionado === dia ? "bg-blue-gray-500 text-white" : ""
              }
            >
              {dia}
            </option>
          ))}
        </select>

        {/* Para pantallas más grandes: botones */}
        <div className="hidden md:flex">
          {diasDeLaSemana.map((dia) => (
            <button
              key={dia}
              onClick={() => seleccionarDia(dia)}
              className={`mx-1 rounded-md px-3 py-2 ${
                diaSeleccionado === dia
                  ? "bg-blue-gray-500 text-white hover:bg-blue-gray-600"
                  : "bg-gray-200  hover:bg-gray-300"
              }`}
            >
              {dia}
            </button>
          ))}
        </div>
      </div>

      {clasesProfe && clasesProfe.length !== 0 ? (
        <>
          <div className="mb-5 flex flex-col md:flex-row">
            <div className="flex-1 border-r p-4 md:mb-5 md:border-r-0">
              <Typography className="mb-5 text-center uppercase">
                Turno Mañana
              </Typography>
              {clasesProfe
                .filter((clase) => clase.horarioInicio <= 12)
                .map((clase) => (
                  <div
                    key={clase._id}
                    className="mb-5 w-full overflow-hidden rounded-lg border bg-white shadow-md hover:cursor-pointer md:ml-10 md:w-96"
                    onClick={(e) =>
                      handleVerClase(
                        e,
                        clase._id,
                        clase.diaDeLaSemana,
                        clase.horarioInicio,
                        clase.nombreSede
                      )
                    }
                  >
                    <div className="flex">
                      {/* Columna del Horario */}
                      <div className="w-4/10 flex flex-col items-center justify-center bg-blue-gray-500 p-4 text-white">
                        <CalendarIcon className="h-8 w-8" />
                        <div className="text-s">{clase.diaDeLaSemana}</div>
                        <div className="text-lg font-bold">
                          {convertirHora(clase.horarioInicio)} HS
                        </div>
                      </div>

                      {/* Columna del Profesor y Alumnos */}
                      <div className="flex flex-col justify-center p-4">
                        <div className="text-lg font-medium">
                          Sede: {clase.nombreSede}
                        </div>
                        <div className="text-sm text-gray-600">
                          {clase.disponibilidad} lugares libres
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex-1 p-4 md:mb-5">
              <Typography className="mb-5 text-center uppercase">
                Turno Tarde
              </Typography>
              {clasesProfe
                .filter(
                  (clase) =>
                    clase.horarioInicio >= 13 && clase.horarioInicio <= 20
                )
                .map((clase) => (
                  <div
                    key={clase._id}
                    className="mb-5 w-full overflow-hidden rounded-lg border bg-white shadow-md hover:cursor-pointer md:ml-10 md:w-96"
                    onClick={(e) =>
                      handleVerClase(
                        e,
                        clase._id,
                        clase.diaDeLaSemana,
                        clase.horarioInicio,
                        clase.nombreSede
                      )
                    }
                  >
                    <div className="flex">
                      {/* Columna del Horario */}
                      <div className="w-4/10 flex flex-col items-center justify-center bg-blue-gray-500 p-4 text-white">
                        <CalendarIcon className="h-8 w-8" />
                        <div className="text-s">{clase.diaDeLaSemana}</div>
                        <div className="text-lg font-bold">
                          {convertirHora(clase.horarioInicio)} HS
                        </div>
                      </div>

                      {/* Columna del Profesor y Alumnos */}
                      <div className="flex flex-col justify-center p-4">
                        <div className="text-lg font-medium">
                          Sede: {clase.nombreSede}
                        </div>
                        <div className="text-sm text-gray-600">
                          {clase.disponibilidad} lugares libres
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div class="mb-5 mt-5 flex flex-col justify-center">
          <button class="">No hay clases para este dia</button>
        </div>
      )}
      <Cargando />
    </>
  );
};

export default ClasesProfesor;
