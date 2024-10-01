import { React, useEffect } from "react";
import { Card } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import ModalNuevoCliente from "@/components/clientes/ModalNuevoCliente";

import useClientes from "@/hooks/useClientes";

import Cargando from "@/components/Cargando";

export function Clientes() {
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
    navigate("/clientes/activos");
  };

  const handleInactivos = (e) => {
    e.preventDefault();
    navigate("/clientes/inactivos");
  };

  const handleSinClase = (e) => {
    e.preventDefault();
    navigate("/clientes/sin-clase");
  };

  return (
    <>
      <>
        <div className="mt-10 flex flex-wrap justify-between">
          <ToastContainer pauseOnFocusLoss={false} />

          <div
            className="w-full p-2 hover:cursor-pointer md:w-1/3"
            onClick={handleModalNuevoCliente}
          >
            <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex-shrink-0">
                  <a href="#" className="relative block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-user-plus"
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
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                      <path d="M16 19h6"></path>
                      <path d="M19 16v6"></path>
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path>
                    </svg>
                  </a>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-gray-600 dark:text-white">
                    Nuevo Cliente
                  </span>
                </div>
              </div>
            </div>
          </div>

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
                    Clientes Activos
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="w-full p-2 hover:cursor-pointer md:w-1/3"
            onClick={(e) => handleInactivos(e)}
          >
            <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex-shrink-0">
                  <a href="#" className="relative block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-octagon-minus"
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
                      <path d="M12.802 2.165l5.575 2.389c.48 .206 .863 .589 1.07 1.07l2.388 5.574c.22 .512 .22 1.092 0 1.604l-2.389 5.575c-.206 .48 -.589 .863 -1.07 1.07l-5.574 2.388c-.512 .22 -1.092 .22 -1.604 0l-5.575 -2.389a2.036 2.036 0 0 1 -1.07 -1.07l-2.388 -5.574a2.036 2.036 0 0 1 0 -1.604l2.389 -5.575c.206 -.48 .589 -.863 1.07 -1.07l5.574 -2.388a2.036 2.036 0 0 1 1.604 0z"></path>
                      <path d="M9 12h6"></path>
                    </svg>
                  </a>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-gray-600 dark:text-white">
                    Clientes Inactivos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 mt-10 h-0.5 bg-gray-300 shadow-md"></div>
        <div
          className="w-full p-2 hover:cursor-pointer md:w-1/3"
          onClick={(e) => handleSinClase(e)}
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
                    class="icon icon-tabler icon-tabler-octagon-minus"
                  >
                    <path
                      fill="currentColor"
                      d="M7.5 16.5H9V15h6v1.5h1.5V15H15v-1.5H9V15H7.5ZM8 12h1.5V9.5H8Zm6.5 0H16V9.5h-1.5ZM2 20V4h8l2 2h10v14Zm2-2h16V8H4Zm0 0V8Z"
                    />
                  </svg>
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-600 dark:text-white">
                  Clientes sin clase asignada
                </span>
              </div>
            </div>
          </div>
        </div>
      </>

      <Cargando />
      {modalNuevoCliente ? <ModalNuevoCliente /> : ""}
    </>
  );
}

export default Clientes;
