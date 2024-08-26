import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useClientes from "@/hooks/useClientes";
import { ToastContainer, toast } from "react-toastify";
import { Button, Checkbox } from "@material-tailwind/react";
import clienteAxios from "@/configs/clinteAxios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import useAuth from "@/hooks/useAuth";
import useClases from "@/hooks/useClases";
import useProfesores from "@/hooks/useProfesores";
import Swal from "sweetalert2";
import Cargando from "../Cargando";
import { convertirHora } from "@/helpers/convertirHora";

const ModalMostrarClaseCliente = () => {
  const { handleVerClase, modalVerClaseCliente, cliente } = useClientes();

  const {
    clase,
    obtenerClase,
    idClasePerfilCliente,
    cancelarClaseCliente,
    eliminarDeClaseACliente,
    setActualizoClasesCliente,
  } = useClases();

  const { handleCargando } = useAuth();

  const { handleModalClasesProfe, modalClasesProfe } = useProfesores();

  useEffect(() => {
    const obtenerDataClase = async () => {
      handleCargando();
      await obtenerClase(idClasePerfilCliente);
      handleCargando();
    };
    obtenerDataClase();
  }, []);

  const handleCancelar = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Cancelamos la proxima clase?",
      text: "Se marcara al cliente como inasistente",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await cancelarClaseCliente(cliente._id, clase._id);
        setActualizoClasesCliente(true);
        handleVerClase();
      }
    });
  };

  const handleEliminar = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Eliminamos al cliente de la clase?",
      text: "Esta accion lo eliminara de todos los listados",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await eliminarDeClaseACliente(clase._id, cliente._id);
        handleVerClase();
        setActualizoClasesCliente(true);
        handleCargando();
      }
    });
  };

  return (
    <Transition.Root show={modalVerClaseCliente} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleVerClase}
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
                  onClick={handleVerClase}
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
                <div className="mt-3 w-full text-center sm:ml-0 sm:mt-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-xl font-bold leading-6 text-gray-900"
                  >
                    Clase del {clase.diaDeLaSemana}-
                    {convertirHora(clase.horarioInicio)}hs en {clase.nombreSede}
                  </Dialog.Title>

                  <form className="mx-2 my-2 text-center">
                    <div className="mb-1">
                      <p className="mb-4">Profesor: {clase.nombreProfe}</p>
                    </div>
                    <div className="mb-1">
                      <Button
                        className="rounded bg-deep-orange-400 px-4 py-2 text-white hover:bg-red-600"
                        onClick={(e) => handleCancelar(e)}
                        fullWidth
                      >
                        Registrar Inasistencia
                      </Button>
                    </div>
                    <div className="mb-1">
                      <Button
                        className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                        fullWidth
                        onClick={(e) => handleEliminar(e)}
                      >
                        Eliminar de la clase
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
        <Cargando />
      </Dialog>
    </Transition.Root>
  );
};

export default ModalMostrarClaseCliente;
