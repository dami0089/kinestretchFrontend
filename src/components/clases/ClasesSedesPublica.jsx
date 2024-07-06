import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import useClases from "@/hooks/useClases";
import useSedes from "@/hooks/useSedes";
import useAuth from "@/hooks/useAuth";
import { CalendarIcon } from "@heroicons/react/24/solid";
import Cargando from "../Cargando";
import Swal from "sweetalert2";

const ClasesSedesPublica = () => {
  const { obtenerClasesSedeDia, clasesDia } = useClases();
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

  const handleInscribirse = (e, clase) => {
    e.preventDefault();
    const hoy = DateTime.now().setZone("America/Argentina/Buenos_Aires");

    const calcularProximaFecha = (diaDeLaSemana) => {
      const diasDeLaSemana = [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado",
      ];
      const indiceDiaClase = diasDeLaSemana.indexOf(
        diaDeLaSemana.toLowerCase()
      );
      const hoyIndice = hoy.weekday % 7; // weekday in Luxon: Monday is 1 and Sunday is 7, adjusting to array index

      let diasHastaClase = indiceDiaClase - hoyIndice;
      if (diasHastaClase <= 0) {
        diasHastaClase += 7;
      }

      return hoy.plus({ days: diasHastaClase });
    };

    // Asegurarse de que clase.clientes y clase.recupero sean arrays
    const clientes = Array.isArray(clase.clientes) ? clase.clientes : [];
    const recupero = Array.isArray(clase.recupero) ? clase.recupero : [];

    const proximaFecha = calcularProximaFecha(clase.diaDeLaSemana);
    const fechaClaseSiguiente = proximaFecha.plus({ weeks: 1 });

    if (
      clientes.length < clase.cupo &&
      clientes.length + recupero.length < clase.cupo
    ) {
      Swal.fire({
        title: "Clase Disponible 😃",
        text: `Puedes inscribirte en la clase del próximo ${
          clase.diaDeLaSemana
        } (${proximaFecha.toLocaleString(
          DateTime.DATE_SHORT
        )}). Por favor escribinos por whatsapp para agendarte.`,
        icon: "Success",
      }).then((result) => {
        if (result.isConfirmed) {
          // Lógica para inscribir al cliente en la clase
          console.log("Inscribiendo al cliente en la clase...");
        }
      });
    } else if (
      clientes.length < clase.cupo &&
      clientes.length + recupero.length >= clase.cupo
    ) {
      Swal.fire({
        title: "⚠️ Cupo disponible la siguiente semana ⚠️",
        text: `Puedes inscribirte en la clase a partir del siguiente ${
          clase.diaDeLaSemana
        } (${fechaClaseSiguiente.toLocaleString(
          DateTime.DATE_SHORT
        )}). Por favor escribinos por whatsapp para agendarte.`,
        icon: "info",
      }).then((result) => {
        if (result.isConfirmed) {
          // Lógica para manejar la inscripción futura
          console.log("Manejando inscripción futura...");
        }
      });
    } else {
      Swal.fire({
        title: " 😞 Cupo completo 😞",
        text: "Lamentablemente no hay disponibilidad para esta clase en este día y horario. Por favor, selecciona otra clase.",
        icon: "warning",
        confirmButtonText: "Entendido",
      });
    }
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
                    className="mx-2 mb-5 w-full overflow-hidden rounded-lg border bg-white shadow-md  hover:cursor-pointer sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                    onClick={(e) => handleInscribirse(e, clase)}
                  >
                    <div className="flex">
                      {/* Columna del Horario */}
                      <div className="flex w-4/12 flex-col items-center justify-center bg-blue-gray-500 p-4 text-white">
                        <CalendarIcon className="h-8 w-8" />
                        <div className="mt-1 items-center justify-between md:flex lg:flex-col lg:text-center">
                          <div className="text-s">{clase.diaDeLaSemana}</div>
                          <div className="flex text-center text-lg font-bold">
                            <div className="mr-1">{clase.horarioInicio}</div>
                            <p>HS</p>
                          </div>
                        </div>
                      </div>

                      {/* Columna del Profesor y Alumnos */}
                      <div className="flex w-6/12 flex-col justify-center p-4 text-start">
                        <div className=" text-sm font-medium">
                          Profesor {clase.nombreProfe}
                        </div>
                        <div
                          className={` text-gray-600 ${
                            clase.clientes.length < clase.cupo
                              ? clase.clientes.length + clase.recupero.length <
                                clase.cupo
                                ? "text-sm text-green-600"
                                : "text-center text-xs text-orange-600"
                              : "text-sm text-red-600"
                          }`}
                        >
                          {clase.clientes.length < clase.cupo
                            ? clase.clientes.length + clase.recupero.length <
                              clase.cupo
                              ? "Hay Disponibilidad Inmediata"
                              : "Disponibilidad para la semana siguiente"
                            : "Cupo Completo"}
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
                    className="mx-2 mb-5 w-full overflow-hidden rounded-lg border bg-white shadow-md  hover:cursor-pointer sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                    onClick={(e) => handleInscribirse(e, clase)}
                  >
                    <div className="flex">
                      {/* Columna del Horario */}
                      <div className="flex w-4/12 flex-col items-center justify-center bg-blue-gray-500 p-4 text-white">
                        <CalendarIcon className="h-8 w-8" />
                        <div className="mt-1 items-center justify-between md:flex lg:flex-col lg:text-center">
                          <div className="text-s">{clase.diaDeLaSemana}</div>
                          <div className="flex text-center text-lg font-bold">
                            <div className="mr-1">{clase.horarioInicio}</div>
                            <p>HS</p>
                          </div>
                        </div>
                      </div>

                      {/* Columna del Profesor y Alumnos */}
                      <div className="flex w-6/12 flex-col justify-center p-4 text-start">
                        <div className=" text-sm font-medium">
                          Profesor {clase.nombreProfe}
                        </div>
                        <div
                          className={` text-gray-600 ${
                            clase.clientes.length < clase.cupo
                              ? clase.clientes.length + clase.recupero.length <
                                clase.cupo
                                ? "text-sm text-green-600"
                                : "text-center text-xs text-orange-600"
                              : "text-sm text-red-600"
                          }`}
                        >
                          {clase.clientes.length < clase.cupo
                            ? clase.clientes.length + clase.recupero.length <
                              clase.cupo
                              ? "Hay Disponibilidad Inmediata"
                              : "Disponibilidad para la semana siguiente"
                            : "Cupo Completo"}
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
