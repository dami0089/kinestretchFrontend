import useAuth from "@/hooks/useAuth";
import useClientes from "@/hooks/useClientes";
import React, { useEffect } from "react";
import Cargando from "../Cargando";
import { formatearFecha } from "@/helpers/formatearFecha";
import ClasesPorCliente from "./ClasesPorCliente";
import useClases from "@/hooks/useClases";
import ModalAsignarClaseACliente from "./ModalAsignarClaseACliente";
import { ToastContainer } from "react-toastify";

const ProfileCliente = () => {
  const { obtenerCliente, cliente, idClienteEditar } = useClientes();
  const { handleCargando } = useAuth();

  const { modalAsignarClaseACliente, handleModalAsignarClaseACliente } =
    useClases();

  useEffect(() => {
    const obtenerInfo = async () => {
      handleCargando();
      await obtenerCliente(idClienteEditar);
      handleCargando();
    };
    obtenerInfo();
  }, []);

  const handleAsignarClase = (e) => {
    e.preventDefault();
    handleModalAsignarClaseACliente();
  };

  return (
    <div class="p-16">
      <ToastContainer pauseOnFocusLoss={false} />
      <div class="mt-10 bg-white p-8 shadow">
        <div class="grid grid-cols-1 md:grid-cols-3">
          <div class="order-last mt-20 grid grid-cols-2 text-center md:order-first md:mt-0">
            <div>
              <p class="text-xl font-bold text-gray-700">22</p>
              <p class="text-gray-400">Clases Hechas</p>
            </div>
            <div>
              <p class="text-xl font-bold text-gray-700">10</p>
              <p class="text-gray-400">Clases Canceladas</p>
            </div>
          </div>
          <div class="relative">
            <div class="absolute inset-x-0 top-0 mx-auto -mt-24 flex h-48 w-48 items-center justify-center rounded-full bg-indigo-100 text-indigo-500 shadow-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div class="mt-32 flex justify-between space-x-8 md:mt-0 md:justify-center">
            <button class="transform rounded bg-blue-400 px-4 py-2 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg">
              Editar
            </button>
            <button class="transform rounded bg-indigo-100 px-4 py-2 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-indigo-200 hover:shadow-lg">
              Mensaje
            </button>
            {cliente && cliente.clases && cliente.clases.length === 0 ? (
              <button
                onClick={(e) => handleAsignarClase(e)}
                class="transform rounded bg-indigo-500 px-4 py-2 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-lg"
              >
                Asignar
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

        <div class="mt-20 border-b pb-12 text-center">
          <h1 class="text-4xl font-medium text-gray-700">{cliente.nombre}</h1>
          <p class="mt-3 font-light text-gray-600">
            Miembro desde:{" "}
            {cliente.fechaAlta ? formatearFecha(cliente.fechaAlta) : "-"}
          </p>
        </div>

        <div class="mt-4 flex flex-col justify-center">
          {cliente && cliente.clases && cliente.clases.length !== 0 ? (
            <ClasesPorCliente />
          ) : (
            <div class="mt-5 flex flex-col justify-center">
              <button class="">No tiene clases asignadas</button>
            </div>
          )}
        </div>
      </div>
      <Cargando />
      {modalAsignarClaseACliente ? <ModalAsignarClaseACliente /> : ""}
    </div>
  );
};

export default ProfileCliente;
