import React, { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Menu,
  Button,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  BuildingStorefrontIcon,
  CheckBadgeIcon,
  ClockIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { ToastContainer } from "react-toastify";
import useSalas from "@/hooks/useSalas";
import ModalNuevaReservaSala from "@/components/salas/ModalNuevaReservaSala";
import ReservaCliente from "@/components/salas/ReservaCliente";
import Disponibilidad from "@/components/salas/Disponibilidad";
import ListadoReservasSalaMadrid from "@/components/salas/ListadoReservasSalaMadrid";
import ListadoReservasSalaAmsterdam from "@/components/salas/ListadoReservasSalaAmsterdam";
import ListadoReservasSalaParis from "@/components/salas/ListadoReservasSalaParis";
import ListadoReservasCabinaPrivada from "@/components/salas/ListadoReservasCabinaPrivada";
import ListadoReservasSalaBsAs from "@/components/salas/ListadoReservasSalaBsAs";

export function Salas() {
  const {
    modalNuevaReserva,
    handleModalNuevaReserva,
    modalRerservaCliente,
    modalDisponibilidad,
    seleccionSala,
    setSeleccionSala,
  } = useSalas();

  const handleNuevaReserva = () => {
    handleModalNuevaReserva();
  };

  return (
    <>
      {seleccionSala == 1 ? (
        <>
          <div className="mt-20 flex flex-wrap justify-between">
            <ToastContainer pauseOnFocusLoss={false} />

            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={(e) => handleNuevaReserva()}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <UserPlusIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Reservar una sala
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={(e) => handlePlanesActivos()}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <CheckBadgeIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Listado de reservas semanal
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/3 p-2 hover:cursor-pointer"
              onClick={(e) => setSeleccion(3)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <ClockIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Creditos por cliente
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 mt-10 h-0.5 bg-gray-300 shadow-md"></div>

          <div className="mt-10 flex flex-wrap justify-between">
            <ToastContainer pauseOnFocusLoss={false} />

            <div
              className="w-1/5 p-2 hover:cursor-pointer"
              onClick={(e) => setSeleccionSala(2)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <BuildingStorefrontIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Amsterdam
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="w-1/5 p-2 hover:cursor-pointer"
              onClick={(e) => setSeleccionSala(3)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <BuildingStorefrontIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Madrid
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/5 p-2 hover:cursor-pointer"
              onClick={(e) => setSeleccionSala(4)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <BuildingStorefrontIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Paris
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/5 p-2 hover:cursor-pointer"
              onClick={(e) => setSeleccionSala(5)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <BuildingStorefrontIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Cabina Privada
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/5 p-2 hover:cursor-pointer"
              onClick={(e) => setSeleccionSala(6)}
            >
              <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex-shrink-0">
                    <a href="#" className="relative block">
                      <BuildingStorefrontIcon className="mx-auto h-8 w-8 rounded-full object-cover" />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      BsAs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : seleccionSala == 2 ? (
        <ListadoReservasSalaAmsterdam />
      ) : seleccionSala == 3 ? (
        <ListadoReservasSalaMadrid />
      ) : seleccionSala == 4 ? (
        <ListadoReservasSalaParis />
      ) : seleccionSala == 5 ? (
        <ListadoReservasCabinaPrivada />
      ) : seleccionSala == 6 ? (
        <ListadoReservasSalaBsAs />
      ) : (
        ""
      )}

      {modalNuevaReserva ? <ModalNuevaReservaSala /> : ""}
      {modalRerservaCliente ? <ReservaCliente /> : ""}
      {modalDisponibilidad ? <Disponibilidad /> : ""}
    </>
  );
}

export default Salas;
