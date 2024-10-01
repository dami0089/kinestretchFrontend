import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Typography } from "@material-tailwind/react";
import useClases from "@/hooks/useClases";
import useSedes from "@/hooks/useSedes";
import useAuth from "@/hooks/useAuth";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { convertirHora } from "@/helpers/convertirHora";
import { useNavigate } from "react-router-dom";

const ClasesSedeSecretaria = () => {
  const {
    obtenerClasesSedeDia,
    clasesDia,
    setIdVerClase,
    setDiaClase,
    setHoraClase,
    setSedeClase,
  } = useClases();
  const { handleCargando, idSedeSeleccionada } = useAuth();
  const { idVerSede, handleModalVerClase } = useSedes();
  const navigate = useNavigate();
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

  const seleccionarDia = (dia) => {
    setDiaSeleccionado(dia);
  };

  useEffect(() => {
    setDiaSeleccionado(diaActual);
  }, []);

  useEffect(() => {
    const traerInfo = async () => {
      handleCargando();
      await obtenerClasesSedeDia(idSedeSeleccionada, diaSeleccionado);
      handleCargando();
    };
    traerInfo();
  }, [diaSeleccionado]);

  const handleVerClase = (e, _id, diaDeLaSemana, horarioInicio, nombreSede) => {
    e.preventDefault();
    navigate(`/listado-alumnos-clase/${_id}`);

    // setIdVerClase(_id);
    // // setDiaClase(diaDeLaSemana);
    // // setHoraClase(horarioInicio);
    // // setSedeClase(nombreSede);
    // handleModalVerClase();
  };

  return (
    <>
      <div className="mb-8 mt-8 flex justify-center">
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
      {clasesDia && clasesDia.length !== 0 ? (
        <>
          <div className="mb-5 flex">
            <div className="flex-1 border-r p-4">
              <Typography className="mb-5 text-center uppercase">
                Turno Mañana
              </Typography>
              {clasesDia
                .filter((clase) => clase.horarioInicio <= 12)
                .map((clase) => (
                  <div
                    key={clase._id}
                    className="mb-5 ml-10 w-96  overflow-hidden rounded-lg border bg-white shadow-md hover:cursor-pointer"
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
                          Profesor {clase.nombreProfe}
                        </div>
                        <div className="text-sm text-gray-600">
                          {clase.clientes.length === 0
                            ? "Aun no hay alumnos inscriptos"
                            : clase.clientes.length +
                              " de " +
                              clase.cupo +
                              " Alumnos inscriptos"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex-1 p-4">
              <Typography className="mb-5 text-center uppercase">
                Turno Tarde
              </Typography>
              {clasesDia
                .filter(
                  (clase) =>
                    clase.horarioInicio >= 13 && clase.horarioInicio <= 20
                )
                .map((clase) => (
                  <div
                    key={clase._id}
                    className="mb-5 ml-10 w-96 overflow-hidden rounded-lg border bg-white shadow-md hover:cursor-pointer"
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
                          Profesor {clase.nombreProfe}
                        </div>
                        <div className="text-sm text-gray-600">
                          {clase.clientes.length === 0
                            ? "Aun no hay alumnos inscriptos"
                            : clase.clientes.length +
                              " de " +
                              clase.cupo +
                              " Alumnos inscriptos"}
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
    </>
  );
};

export default ClasesSedeSecretaria;
