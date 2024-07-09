import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Button } from "@material-tailwind/react";
import useAuth from "@/hooks/useAuth";

// Asegúrate de que el modal se vincule con el div #root del HTML
Modal.setAppElement("#root");

const ModalAceptarTerminos = () => {
  const {
    handleModalAceptarTerminos,
    modalAceptarTerminos,
    content,
    obtenerTerminos,
    aceptarTerminos,
    auth,
    handleCargando,
  } = useAuth();

  useEffect(() => {
    const obtenerDatos = async () => {
      await obtenerTerminos();
    };
    obtenerDatos();
  }, []);

  const handleCerrar = () => {
    handleModalAceptarTerminos();
  };

  const handleAceptar = async (e) => {
    e.preventDefault();
    // Lógica para manejar la aceptación de los términos
    handleCargando();
    await aceptarTerminos(auth._id);
    handleCargando();
    handleModalAceptarTerminos();
  };

  return (
    <Modal
      isOpen={modalAceptarTerminos}
      onRequestClose={handleCerrar}
      contentLabel="Aceptar Términos y Condiciones"
      className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
    >
      <div className="max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleCerrar}
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
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <h3 className="mb-4 text-center text-xl font-bold leading-6 text-gray-900">
          Aceptar Términos y Condiciones
        </h3>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="mt-4 flex w-full justify-between">
          <Button
            className="mr-4 w-full bg-green-500 hover:bg-green-400"
            onClick={handleAceptar}
          >
            Aceptar
          </Button>
          <Button
            className="w-full bg-blue-500 hover:bg-blue-400"
            onClick={handleCerrar}
          >
            Más tarde
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAceptarTerminos;
