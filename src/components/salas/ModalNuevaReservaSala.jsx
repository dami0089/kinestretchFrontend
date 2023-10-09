import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { ToastContainer, toast } from "react-toastify";
import clienteCoworking from "../../../public/img/clienteCoworking.svg";
import clienteSalas from "../../../public/img/clienteSalas.svg";
import nuevoClienteSalas from "../../../public/img/nuevoClienteSalas.svg";

import useSalas from "@/hooks/useSalas";

const ModalNuevaReservaSala = () => {
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [nombreCliente, setNombreCliente] = useState("");

  const {
    handleModalNuevaReserva,
    modalNuevaReserva,
    handleModalNuevaReservaCliente,
  } = useSalas();

  // const {
  //   clientes,
  //   handleModalNuevoServicio,
  //   modalNuevoServicio,
  //   cuitEditar,
  //   handleModalNuevoServicio2,
  //   obtenerClientes,
  // } = useClientes();

  // useEffect(() => {
  //   setIdClienteServicio(cuitEditar);
  // }, [cuitEditar]);

  const [modal1, setModal1] = useState(false);

  //Comprueba que todos los campos esten ok, y de ser asi pasa a consultar si el cuit no corresponde a un usuario ya registrado
  const handleSubmit = async (e) => {};

  // useEffect(() => {
  //   const obtenercli = async () => {
  //     await obtenerClientes();
  //   };
  //   obtenercli();
  // }, []);

  // const handleNombreClienteChange = (e) => {
  //   const inputValue = e.target.value;
  //   setNombreCliente(inputValue);

  //   // Filtrar los clientes basados en el nombre ingresado
  //   const coincidencias = clientes.filter((cliente) =>
  //     cliente.nombre.toLowerCase().includes(inputValue.toLowerCase())
  //   );

  //   setClientesFiltrados(coincidencias);
  // };

  const handleReservaCliente = () => {
    handleModalNuevaReserva();
    handleModalNuevaReservaCliente();
  };

  return (
    <Transition.Root show={modalNuevaReserva} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleModalNuevaReserva}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <ToastContainer pauseOnFocusLoss={false} />

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

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
                  onClick={handleModalNuevaReserva}
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

              <div className="sm:flex sm:items-start">
                <div className="mt-3 w-full text-center sm:mt-0 sm:ml-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Nueva Reserva
                  </Dialog.Title>

                  {/* Card for "cliente de coworking" */}
                  <div
                    className="mt-5 mb-3 flex cursor-pointer items-center justify-between rounded-lg border p-6 transition hover:bg-gray-100"
                    onClick={(e) => handleReservaCliente()}
                  >
                    <h2 className="text-lg font-semibold">
                      Cliente de Coworking
                    </h2>
                    <img
                      src={clienteCoworking}
                      alt="Icono de Cliente de Coworking"
                      className="h-20 w-20"
                    />
                  </div>

                  {/* Card for "cliente de salas" */}
                  <div className="mt-5 mb-3 flex cursor-pointer items-center justify-between rounded-lg border p-6 transition hover:bg-gray-100">
                    <h2 className="text-lg font-semibold">Cliente de Salas</h2>
                    <img
                      src={clienteSalas}
                      alt="Icono de Cliente de Coworking"
                      className="h-20 w-20"
                    />
                  </div>

                  <div className="mt-5 mb-3 flex cursor-pointer items-center justify-between rounded-lg border p-6 transition hover:bg-gray-100">
                    <h2 className="text-lg font-semibold">
                      Nuevo Cliente Salas
                    </h2>
                    <img
                      src={nuevoClienteSalas}
                      alt="Icono de Cliente de Coworking"
                      className="h-20 w-20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalNuevaReservaSala;
