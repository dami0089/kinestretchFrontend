import React, { useState } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import useClientes from "@/hooks/useClientes";
import useAuth from "@/hooks/useAuth";
import useClases from "@/hooks/useClases";
import useSedes from "@/hooks/useSedes";

// Asegúrate de que el modal se vincule con el div #root del HTML
Modal.setAppElement("#root");

const ModalEnviarMensajeSedeSecretaria = () => {
  const { handleCargando, idSedeSeleccionada } = useAuth();
  const { mensaje, setMensaje, enviarMensaje } = useClientes();

  const {
    handleModalEnviarMensajeSede,
    modalEnviarMensajeSede,

    enviarMensajeSede,
  } = useSedes();

  const [asunto, setAsunto] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([mensaje].includes("")) {
      toast("⚠️ Escribe un mensaje para enviar", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      handleCargando();
      const mensajeHtml = mensaje.replace(/\n/g, "<br>");
      await enviarMensajeSede(idSedeSeleccionada, mensajeHtml, asunto);
      handleCerrar();
      handleCargando();
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleCerrar = () => {
    setMensaje("");
    setAsunto("");
    handleModalEnviarMensajeSede();
  };

  return (
    <Modal
      isOpen={modalEnviarMensajeSede}
      onRequestClose={handleCerrar}
      contentLabel="Enviar Mensaje a la sede"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 z-[9998]"
    >
      <div className="relative z-[10000] w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
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
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293-1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <h3 className="text-center text-xl font-bold leading-6 text-gray-900">
          Enviar Mensaje a la sede
        </h3>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="mb-1 block text-sm font-bold text-gray-700"
              htmlFor="asunto"
            >
              Asunto
            </label>
            <input
              id="asunto"
              className="mb-3 w-full rounded-md border p-2"
              placeholder="Asunto del mensaje"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-1 block text-sm font-bold text-gray-700"
              htmlFor="mensaje"
            >
              Mensaje
            </label>
            <textarea
              id="mensaje"
              className="mb-3 w-full resize-none rounded-md border p-2"
              rows={7}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </div>
          <input
            type="submit"
            className="w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white hover:bg-blue-700"
            value="Enviar"
          />
        </form>
      </div>
    </Modal>
  );
};

export default ModalEnviarMensajeSedeSecretaria;
