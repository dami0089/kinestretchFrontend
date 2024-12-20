import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Typography } from "@material-tailwind/react";
import useClases from "@/hooks/useClases";
import useSedes from "@/hooks/useSedes";
import useAuth from "@/hooks/useAuth";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { convertirHora } from "@/helpers/convertirHora";
import { useNavigate } from "react-router-dom";
import ModalCancelarClaseAdmin from "../clases/ModalCancelarClaseAdmin";
import ModalEditarClase from "../clases/ModalEditarClase";
import ModalEnviarMensajeClase from "../clases/ModalEnviarMensajeClase";

const ClasesSedeSecretaria = () => {
  const {
    obtenerClasesSedeDia,
    clasesDia,
    modalCancelarClase,
    setClaseCancelarAdmin,
    handleModalCancelarClase,
    modalEditarClase,

    setIdClaseEditar,
    setIdClaseVer,
    setIdSede,
    setDiaDeLaSemana,
    setHoraInicio,
    setIdProfesor,
    setCupo,
    handleModalEditarClase,
    modalEnviarMensajeClase,
    claseEditada,
    setClaseEditada,
  } = useClases();
  const { handleCargando, idSedeSeleccionada } = useAuth();
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

  useEffect(() => {
    const traerInfo = async () => {
      if (claseEditada) {
        handleCargando();
        await obtenerClasesSedeDia(idSedeSeleccionada, diaSeleccionado);
        setClaseEditada(false);
        handleCargando();
      }
    };
    traerInfo();
  }, [claseEditada]);

  const handleVerClase = (e, _id, diaDeLaSemana, horarioInicio, nombreSede) => {
    e.preventDefault();
    navigate(`/listado-alumnos-clase/${_id}`);
  };

  const cancelarClase = (e, id) => {
    e.preventDefault();

    setClaseCancelarAdmin(id);
    handleModalCancelarClase();
  };

  const editarClase = (e, id, idSede, dia, hora, profe, cupo) => {
    e.preventDefault();
    setIdClaseEditar(id);
    setIdClaseVer(id);
    setIdSede(idSede);
    setDiaDeLaSemana(dia);
    setHoraInicio(hora);
    setIdProfesor(profe);
    setCupo(cupo);
    handleModalEditarClase();
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
                .filter(
                  (clase) =>
                    clase.horarioInicio >= 13 && clase.horarioInicio <= 22
                )
                .map((clase) => (
                  <div
                    key={clase._id}
                    className="mx-auto mb-5 w-full overflow-hidden rounded-lg border bg-white shadow-md hover:cursor-pointer sm:w-[90%] md:w-[80%]"
                  >
                    <div className="flex justify-between">
                      {/* Columna del Horario */}
                      <div
                        className="flex w-3/12 flex-col items-center justify-center bg-blue-gray-500 p-4 text-white"
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
                        <CalendarIcon className="h-8 w-8" />
                        <div className="text-s">{clase.diaDeLaSemana}</div>
                        <div className="text-lg font-bold">
                          {convertirHora(clase.horarioInicio)} HS
                        </div>
                      </div>

                      {/* Columna del Profesor y Alumnos */}
                      <div
                        className="flex w-7/12 flex-col justify-center p-4"
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
                      <div
                        className="mr-2 mt-2 items-center"
                        onClick={(e) =>
                          editarClase(
                            e,
                            clase._id,
                            clase.sede,
                            clase.diaDeLaSemana,
                            clase.horarioInicio,
                            clase.profesor,
                            clase.cupo
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          className="h-6 w-6"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M3 21h18M12.222 5.828L15.05 3L20 7.95l-2.828 2.828m-4.95-4.95l-5.607 5.607a1 1 0 0 0-.293.707v4.536h4.536a1 1 0 0 0 .707-.293l5.607-5.607m-4.95-4.95l4.95 4.95"
                          />
                        </svg>
                      </div>
                      <div
                        className="mr-2 mt-2"
                        onClick={(e) => cancelarClase(e, clase._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 20 20"
                          className="h-6 w-6"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10L4.293 5.707a1 1 0 0 1 0-1.414"
                            clipRule="evenodd"
                          />
                        </svg>
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
                    clase.horarioInicio >= 13 && clase.horarioInicio <= 22
                )
                .map((clase) => (
                  <div
                    key={clase._id}
                    className="mx-auto mb-5 w-full overflow-hidden rounded-lg border bg-white shadow-md hover:cursor-pointer sm:w-[90%] md:w-[80%]"
                  >
                    <div className="flex justify-between">
                      {/* Columna del Horario */}
                      <div
                        className="flex w-3/12 flex-col items-center justify-center bg-blue-gray-500 p-4 text-white"
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
                        <CalendarIcon className="h-8 w-8" />
                        <div className="text-s">{clase.diaDeLaSemana}</div>
                        <div className="text-lg font-bold">
                          {convertirHora(clase.horarioInicio)} HS
                        </div>
                      </div>

                      {/* Columna del Profesor y Alumnos */}
                      <div
                        className="flex w-7/12 flex-col justify-center p-4"
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
                      <div
                        className="mr-2 mt-2 items-center"
                        onClick={(e) =>
                          editarClase(
                            e,
                            clase._id,
                            clase.sede,
                            clase.diaDeLaSemana,
                            clase.horarioInicio,
                            clase.profesor,
                            clase.cupo
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          className="h-6 w-6"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M3 21h18M12.222 5.828L15.05 3L20 7.95l-2.828 2.828m-4.95-4.95l-5.607 5.607a1 1 0 0 0-.293.707v4.536h4.536a1 1 0 0 0 .707-.293l5.607-5.607m-4.95-4.95l4.95 4.95"
                          />
                        </svg>
                      </div>
                      <div
                        className="mr-2 mt-2"
                        onClick={(e) => cancelarClase(e, clase._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 20 20"
                          className="h-6 w-6"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10L4.293 5.707a1 1 0 0 1 0-1.414"
                            clipRule="evenodd"
                          />
                        </svg>
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
      {modalCancelarClase ? <ModalCancelarClaseAdmin /> : null}
      {modalEditarClase ? <ModalEditarClase /> : null}
      {modalEnviarMensajeClase ? <ModalEnviarMensajeClase /> : null}
    </>
  );
};

export default ClasesSedeSecretaria;
