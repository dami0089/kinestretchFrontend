import React, { useState } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import useClientes from "@/hooks/useClientes";
import useAuth from "@/hooks/useAuth";
import useClases from "@/hooks/useClases";
import Swal from "sweetalert2";

// Asegúrate de que el modal se vincule con el div #root del HTML
Modal.setAppElement("#root");

const ModalSuspenderClase = () => {
  const { handleCargando } = useAuth();
  const { mensaje, setMensaje, enviarMensaje } = useClientes();

  const {
    idClaseVer,
    enviarMensajeClase,
    modalRegistrarFeriado,
    handleModalRegistrarFeriado,
    fechaFeriado,
    setFechaFeriado,
    registrarFeriado,
    feriados,
    obtenerFeriados,
    comunicarFeriado,
    motivoFeriado,
    setMotivoFeriado,
  } = useClases();

  const [asunto, setAsunto] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([fechaFeriado, motivoFeriado].includes("")) {
      toast("⚠️ Todos los campos son obligatorios", {
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
      await registrarFeriado(fechaFeriado, motivoFeriado);
      handleCargando();

      Swal.fire({
        title: "Queres notificar a los clientes?",
        text: "Esta accion enviara emails a todos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then(async (result) => {
        if (result.isConfirmed) {
          handleCargando();
          await comunicarFeriado(fechaFeriado, motivoFeriado);
          handleCargando();
        }
      });

      handleCerrar();
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
    setFechaFeriado("");
    setMotivoFeriado("");
    handleModalRegistrarFeriado();
  };

  return (
    <Modal
      isOpen={modalRegistrarFeriado}
      onRequestClose={handleCerrar}
      contentLabel="Enviar Mensaje a la clase"
      className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
    >
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
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
          Ingresa la fecha del feriado
        </h3>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              id="asunto"
              type="date"
              className="mb-3 w-full rounded-md border p-2"
              placeholder="Asunto del mensaje"
              value={fechaFeriado}
              onChange={(e) => setFechaFeriado(e.target.value)}
            />
          </div>

          <div className="mb-1">
            <label
              className="text-sm font-bold uppercase text-gray-700"
              htmlFor="cupo"
            >
              Motivo Feriado
            </label>
            <textarea
              id="cupo"
              className="mb-5 mt-2 w-full resize-none rounded-md border-2 p-2 placeholder-gray-400"
              type="text"
              rows="3"
              placeholder="Ingrese el motivo del feriado"
              value={motivoFeriado}
              onChange={(e) => setMotivoFeriado(e.target.value)}
            />
          </div>

          <input
            type="submit"
            className="w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white hover:bg-blue-700"
            value="Registrar Feriado"
          />
        </form>
      </div>
    </Modal>
  );
};

export default ModalSuspenderClase;
