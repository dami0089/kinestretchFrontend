import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Typography } from "@material-tailwind/react";
import useClases from "@/hooks/useClases";
import useSedes from "@/hooks/useSedes";
import useAuth from "@/hooks/useAuth";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { convertirHora } from "@/helpers/convertirHora";
import { useNavigate } from "react-router-dom";
import ModalCancelarClaseAdmin from "./ModalCancelarClaseAdmin";
import Swal from "sweetalert2";

const ClasesSedes = () => {
  const {
    obtenerClasesSedeDia,
    clasesDia,

    handleModalCancelarClase,
    modalCancelarClase,
    setClaseCancelarAdmin,

    setIdClaseEditar,
    setIdClaseVer,
    setIdSede,
    setDiaDeLaSemana,
    setHoraInicio,
    setIdProfesor,
    setCupo,
    handleModalEditarClase,
  } = useClases();
  const { handleCargando } = useAuth();
  const navigate = useNavigate();
  const { idVerSede, handleModalVerClase } = useSedes();
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
      await obtenerClasesSedeDia(idVerSede, diaSeleccionado);
      handleCargando();
    };
    traerInfo();
  }, [diaSeleccionado]);

  const handleVerClase = (e, _id) => {
    e.preventDefault();
    navigate(`/sedes/vista-clase/${_id}`);
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
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {dia}
          </button>
        ))}
      </div>
      {clasesDia && clasesDia.length !== 0 ? (
        <>
          <div className="mb-5 flex flex-wrap">
            {/* Turno Mañana */}
            <div className="w-full border-r p-4 md:w-1/2">
              <Typography className="mb-5 text-center uppercase">
                Turno Mañana
              </Typography>
              {clasesDia
                .filter((clase) => clase.horarioInicio <= 12.5)
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
                        className="mr-2 mt-2 "
                        onClick={(e) => cancelarClase(e, clase._id)}
                      >
                        <p className="rounded-full border bg-red-500 p-2 text-white">
                          x
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Turno Tarde */}
            <div className="w-full p-4 md:w-1/2">
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
                        className="mr-2 mt-2"
                        onClick={(e) => cancelarClase(e, clase._id)}
                      >
                        <p className="rounded-full border bg-red-500 p-2 text-white">
                          x
                        </p>
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
    </>
  );
};

export default ClasesSedes;
