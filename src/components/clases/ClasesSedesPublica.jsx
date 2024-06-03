import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import useClases from "@/hooks/useClases";
import useSedes from "@/hooks/useSedes";
import useAuth from "@/hooks/useAuth";
import { CalendarIcon } from "@heroicons/react/24/solid";
import Cargando from "../Cargando";

const ClasesSedesPublica = () => {
  const {
    obtenerClasesSedeDia,
    clasesDia,
    setIdVerClase,
    setDiaClase,
    setHoraClase,
    setSedeClase,
  } = useClases();
  const { handleCargando } = useAuth();
  const params = useParams();
  const { id } = params;

  const { idVerSede, handleModalVerClase, sede, obtenerSede } = useSedes();
  const diasDeLaSemana = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  const [diaSeleccionado, setDiaSeleccionado] = useState(""); // Por defecto, mostrará las clases del Lunes.

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

  useEffect(() => {
    console.log(diaActual);
  }, []);
  const seleccionarDia = (dia) => {
    setDiaSeleccionado(dia);
  };

  useEffect(() => {
    setDiaSeleccionado(diaActual);
  }, []);

  useEffect(() => {
    const traerData = async () => {
      handleCargando();
      await obtenerSede(id);
      handleCargando();
    };
    traerData();
  }, []);

  useEffect(() => {
    const traerInfo = async () => {
      handleCargando();
      await obtenerClasesSedeDia(id, diaSeleccionado);
      handleCargando();
    };
    traerInfo();
  }, [diaSeleccionado]);

  const handleVerClase = (e, _id, diaDeLaSemana, horarioInicio, nombreSede) => {
    e.preventDefault();
    console.log(_id);
    console.log(diaDeLaSemana);
    console.log(horarioInicio);
    console.log(nombreSede);
    setIdVerClase(_id);
    setDiaClase(diaDeLaSemana);
    setHoraClase(horarioInicio);
    setSedeClase(nombreSede);
    handleModalVerClase();
  };

  return (
    <>
      <Typography className="mt-8 text-center font-bold uppercase">
        Clases para la Sede {sede.nombre}
      </Typography>
      <div className="mb-8 mt-8 flex flex-wrap justify-center">
        {diasDeLaSemana.map((dia) => (
          <button
            key={dia}
            onClick={() => seleccionarDia(dia)}
            className={`mx-1 my-1 rounded-md px-3 py-2 ${
              diaSeleccionado === dia
                ? "bg-blue-gray-500 text-white hover:bg-blue-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {dia}
          </button>
        ))}
      </div>
      {clasesDia && clasesDia.length !== 0 ? (
        <>
          <div className="mb-5">
            <Typography className="mb-5 text-center uppercase">
              Turno Mañana
            </Typography>
            <div className="flex flex-wrap">
              {clasesDia
                .filter((clase) => clase.horarioInicio <= 12)
                .map((clase) => (
                  <div
                    key={clase._id}
                    className="mx-2 mb-5 w-full overflow-hidden rounded-lg border bg-white shadow-md hover:cursor-pointer sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
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
                          {clase.horarioInicio} HS
                        </div>
                      </div>

                      {/* Columna del Profesor y Alumnos */}
                      <div className="flex flex-col justify-center p-4">
                        <div className="text-lg font-medium">
                          Profesor {clase.nombreProfe}
                        </div>
                        <div
                          className={`text-sm text-gray-600 ${
                            clase.disponibilidad !== 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {clase.disponibilidad === 0
                            ? "Cupo Completo"
                            : `Hay Disponibilidad`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <Typography className="mb-5 text-center uppercase">
              Turno Tarde
            </Typography>
            <div className="flex flex-wrap">
              {clasesDia
                .filter(
                  (clase) =>
                    clase.horarioInicio >= 13 && clase.horarioInicio <= 20
                )
                .map((clase) => (
                  <div
                    key={clase._id}
                    className="mx-2 mb-5 w-full overflow-hidden rounded-lg border bg-white shadow-md hover:cursor-pointer sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
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
                          {clase.horarioInicio} HS
                        </div>
                      </div>

                      {/* Columna del Profesor y Alumnos */}
                      <div className="flex flex-col justify-center p-4">
                        <div className="text-lg font-medium">
                          Profesor {clase.nombreProfe}
                        </div>
                        <div
                          className={`text-sm text-gray-600 ${
                            clase.disponibilidad !== 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {clase.disponibilidad === 0
                            ? "Cupo Completo"
                            : `Hay Disponibilidad`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div class="mt-5 flex flex-col justify-center">
          <button class="">No hay clases para este dia</button>
        </div>
      )}
      <Cargando />
    </>
  );
};

export default ClasesSedesPublica;
