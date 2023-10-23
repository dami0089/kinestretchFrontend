import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useClientes from "@/hooks/useClientes";
import { ToastContainer, toast } from "react-toastify";
import { Checkbox } from "@material-tailwind/react";
import clienteAxios from "@/configs/clinteAxios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import useAuth from "@/hooks/useAuth";
import useSedes from "@/hooks/useSedes";

const VerClase = () => {
  const { modalVerClase, handleModalVerClase } = useSedes();

  return (
    <Transition.Root show={modalVerClase} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleModalVerClase}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
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
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleModalVerClase}
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
                <div className="mt-3 h-96 w-full text-center sm:ml-0 sm:mt-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Nuevo Cliente
                  </Dialog.Title>

                  <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="w-3/4 rounded-lg bg-white p-6 shadow-xl">
                      <div className="flex">
                        {/* Columna Izquierda */}
                        <div className="w-1/2 pr-4">
                          <h2 className="mb-4 text-xl font-semibold">Sede</h2>
                          <p className="mb-4">[Nombre de la sede]</p>

                          <h2 className="mb-4 text-xl font-semibold">
                            Profesor
                          </h2>
                          <p className="mb-4">[Nombre del profesor]</p>

                          <h2 className="mb-4 text-xl font-semibold">
                            Horario
                          </h2>
                          <p className="mb-4">[Horario]</p>

                          <button className="mr-2 rounded bg-blue-500 px-4 py-2 text-white">
                            Botón 1
                          </button>
                          <button className="rounded bg-blue-500 px-4 py-2 text-white">
                            Botón 2
                          </button>
                        </div>

                        {/* Columna Derecha */}
                        <div className="w-1/2 border-l pl-4">
                          <h2 className="mb-4 text-xl font-semibold">
                            Clientes Anotados
                          </h2>
                          <ul>
                            {/* Suponiendo que tienes un array de clientes, puedes mapearlo aquí */}
                            {["Cliente 1", "Cliente 2"].map(
                              (cliente, index) => (
                                <li
                                  key={index}
                                  className="mb-2 flex items-center justify-between"
                                >
                                  <span>{cliente}</span>
                                  <button
                                    className="text-red-500"
                                    onClick={() =>
                                      console.log("Eliminar cliente")
                                    }
                                  >
                                    X
                                  </button>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
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

export default VerClase;
