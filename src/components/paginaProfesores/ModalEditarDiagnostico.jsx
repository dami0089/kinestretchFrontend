import React from "react";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import { Button } from "@material-tailwind/react";
import useClientes from "@/hooks/useClientes";
import useAuth from "@/hooks/useAuth";
import Cargando from "../Cargando";

// Asegúrate de que el modal se vincule con el div #root del HTML
Modal.setAppElement("#root");

const ModalEditarDiagnostico = () => {
  const {
    diagnosticoEditar,
    setDiagnosticoEditar,
    IdCliente,
    handleModalEditarDiagnostico,
    modalEditarDiagnostico,
    editarDiagnostico,
    setActualizarListado,
  } = useClientes();

  const { handleCargando } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCargando();
    await editarDiagnostico(IdCliente, diagnosticoEditar);
    setActualizarListado(true);
    handleCargando();
    handleModalEditarDiagnostico();
  };

  const handleCancelar = (e) => {
    e.preventDefault();
    setActualizarListado(true);
    handleModalEditarDiagnostico();
  };

  return (
    <Modal
      isOpen={modalEditarDiagnostico}
      onRequestClose={handleModalEditarDiagnostico}
      contentLabel="Editar Diagnóstico"
      className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
    >
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleModalEditarDiagnostico}
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
          Editar Diagnóstico
        </h3>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="mb-1 block text-sm font-bold text-gray-700"
              htmlFor="diagnostico"
            >
              Diagnóstico
            </label>
            <textarea
              id="diagnostico"
              placeholder="Diagnóstico"
              rows={3}
              className="w-full resize-none rounded-md border p-2"
              value={diagnosticoEditar}
              onChange={(e) => setDiagnosticoEditar(e.target.value)}
            />
          </div>
          <Button
            className="mb-2 w-full rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white hover:bg-blue-700"
            type="submit"
          >
            Guardar
          </Button>
          <Button
            className="w-full rounded bg-red-600 p-3 text-sm font-bold uppercase text-white hover:bg-red-700"
            onClick={handleCancelar}
          >
            Cancelar
          </Button>
        </form>
      </div>
      <Cargando />
    </Modal>
  );
};

export default ModalEditarDiagnostico;
