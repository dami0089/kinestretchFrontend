import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { ToastContainer, toast } from "react-toastify";
import clienteCoworking from "../../../public/img/clienteCoworking.svg";
import clienteSalas from "../../../public/img/clienteSalas.svg";
import nuevoClienteSalas from "../../../public/img/nuevoClienteSalas.svg";

import useSalas from "@/hooks/useSalas";
import { formatearFecha } from "@/helpers/formatearFecha";
import Swal from "sweetalert2";

const Disponibilidad = () => {
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [nombreCliente, setNombreCliente] = useState("");

  const {
    handleModalDisponibilidad,
    modalDisponibilidad,
    fechaReserva,
    horaReserva,
    horafin,
    obtenerDisponibilidad,
    disponibilidad,
    nombreUsuario,
    nuevaReserva,
    setFechaReserva,
    setHoraReserva,
    setHoraFin,
    idUsuarioReservaSala,
  } = useSalas();

  useEffect(() => {
    const obtenerInformacion = async () => {
      await obtenerDisponibilidad(fechaReserva, horaReserva, horafin);
    };
    obtenerInformacion();
  }, []);

  const handleClick = (e, dispo, sala) => {
    if (!dispo) {
      toast("⚠️ La sala no esta diponible!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    Swal.fire({
      title: `Confirma la reserva para ${nombreUsuario}`,
      text: `Fecha: ${formatearFecha(
        fechaReserva
      )} - Inicio: ${horaReserva} - Fin: ${horafin}`,
      icon: "question",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await nuevaReserva(
          fechaReserva,
          horaReserva,
          horafin,
          sala,
          idUsuarioReservaSala
        );
        setFechaReserva("");
        setHoraFin("");
        setHoraReserva("");
        handleModalDisponibilidad();
      }
    });
  };

  return (
    <Transition.Root show={modalDisponibilidad} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleModalDisponibilidad}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <ToastContainer pauseOnFocusLoss={false} />

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6 sm:align-middle">
              <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleModalDisponibilidad}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-3 flex w-full flex-wrap">
                <Dialog.Title
                  as="h3"
                  className="mb-5 w-full text-center text-xl font-bold leading-6 text-gray-900"
                >
                  Selecciona la sala disponible
                </Dialog.Title>

                {Object.entries(disponibilidad).map(
                  ([sala, estaDisponible]) => (
                    <div
                      key={sala}
                      className="w-1/2 p-2"
                      onClick={(e) => handleClick(e, estaDisponible, sala)}
                    >
                      <div
                        className={`mb-1 flex cursor-pointer items-center justify-between rounded-lg border p-6 text-center transition  ${
                          estaDisponible
                            ? "cursor-pointer hover:bg-gray-100"
                            : "bg-gray-300"
                        }`}
                      >
                        <div>
                          <p className="mt-2 text-center font-bold text-gray-800">
                            Fecha: {formatearFecha(fechaReserva)}
                          </p>
                          <h2 className="text-xl font-semibold">
                            {sala === "SalaMadrid"
                              ? "Sala Madrid"
                              : sala === "SalaParis"
                              ? "Sala Paris"
                              : sala === "SalaAmsterdam"
                              ? "Sala Amsterdam"
                              : sala === "SalaCabina"
                              ? "Cabina Privada"
                              : ""}
                          </h2>
                          <p
                            className={`mt-2 text-gray-700 ${
                              estaDisponible
                                ? "text-green-500"
                                : " text-red-400"
                            }`}
                          >
                            {estaDisponible ? "Disponible" : "No disponible"}
                          </p>

                          <p className="font-bold text-gray-800">
                            Hora inicio: {horaReserva}
                          </p>
                          <p className="font-bold text-gray-800">
                            Hora fin: {horafin}
                          </p>
                        </div>
                        {/* <img
                          src={clienteCoworking}
                          alt={`Icono de ${sala}`}
                          className="h-20 w-20"
                        /> */}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Disponibilidad;
