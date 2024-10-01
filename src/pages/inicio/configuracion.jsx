import { React, useEffect } from "react";
import { Card } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import ModalNuevoCliente from "@/components/clientes/ModalNuevoCliente";

import useClientes from "@/hooks/useClientes";

import Cargando from "@/components/Cargando";

export function Configuracion() {
  const {
    handleModalNuevoCliente,
    setActualizoListado,
    obtenerUsuarios,
    actualizoListado,
    modalNuevoCliente,
  } = useClientes();
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerUsers = async () => {
      if (actualizoListado) {
        await obtenerUsuarios();
        setActualizoListado(false);
      }
    };
    obtenerUsers();
  }, [actualizoListado]);

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/configuracion/listado-usuarios-app");
  };

  const handleTerminos = (e) => {
    e.preventDefault();
    navigate("/configuracion/terminos-condiciones");
  };

  const handleListado = (e) => {
    e.preventDefault();
    navigate("/configuracion/listado-usuarios-app-sistema");
  };

  return (
    <>
      <>
        <div className="mt-10 flex flex-wrap justify-between">
          <ToastContainer pauseOnFocusLoss={false} />

          <div
            className="w-full p-2 hover:cursor-pointer md:w-1/3"
            onClick={(e) => handleNavigate(e)}
          >
            <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex-shrink-0">
                  <a href="#" className="relative block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-discount-check"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1"></path>
                      <path d="M9 12l2 2l4 -4"></path>
                    </svg>
                  </a>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-gray-600 dark:text-white">
                    Usuarios Backoffice
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="w-full p-2 hover:cursor-pointer md:w-1/3"
            onClick={(e) => handleTerminos(e)}
          >
            <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex-shrink-0">
                  <a href="#" className="relative block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="24"
                      height="24"
                      className="icon icon-tabler icon-tabler-user-minus"
                    >
                      <path
                        fill="currentColor"
                        d="M14.63 7L13 3h1V2H9V1H8v1H3v1h1L2.38 7H2v1h.15c.156.498.473.93.9 1.23a2.47 2.47 0 0 0 2.9 0A2.44 2.44 0 0 0 6.86 8H7V7h-.45L4.88 3H8v8H6l-.39.18l-2 2.51l.39.81h9l.39-.81l-2-2.51L11 11H9V3h3.13l-1.67 4H10v1h.15a2.48 2.48 0 0 0 4.71 0H15V7zM5.22 8.51a1.5 1.5 0 0 1-.72.19a1.45 1.45 0 0 1-.71-.19A1.5 1.5 0 0 1 3.25 8h2.5a1.5 1.5 0 0 1-.53.51M5.47 7h-2l1-2.4zm5.29 5L12 13.5H5L6.24 12zm1.78-7.38l1 2.4h-2zm.68 3.91a1.4 1.4 0 0 1-.72.19a1.35 1.35 0 0 1-.71-.19a1.55 1.55 0 0 1-.54-.53h2.5a1.37 1.37 0 0 1-.53.53"
                      />
                    </svg>
                  </a>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-gray-600 dark:text-white">
                    Terminos y condiciones
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="w-full p-2 hover:cursor-pointer md:w-1/3"
            onClick={(e) => handleListado(e)}
          >
            <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex-shrink-0">
                  <a href="#" className="relative block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 20c0-1.742-1.67-3.223-4-3.773M15 20c0-2.21-2.686-4-6-4s-6 1.79-6 4m12-7a4 4 0 0 0 0-8m-6 8a4 4 0 1 1 0-8a4 4 0 0 1 0 8"
                      />
                    </svg>
                  </a>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-gray-600 dark:text-white">
                    Usuarios Aplicacion
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-4 mt-10 h-0.5 bg-gray-300 shadow-md"></div>
      </>

      <Cargando />
      {modalNuevoCliente ? <ModalNuevoCliente /> : ""}
    </>
  );
}

export default Configuracion;
