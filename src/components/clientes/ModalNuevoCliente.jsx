import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useClientes from "@/hooks/useClientes";
import { ToastContainer, toast } from "react-toastify";
import { Checkbox } from "@material-tailwind/react";
import clienteAxios from "@/configs/clinteAxios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import useAuth from "@/hooks/useAuth";

const ModalResumen = () => {
  const {
    modalNuevoCliente,
    handleModalNuevoCliente,
    nuevoCliente,
    nombreCliente,
    setNombreCliente,
    apellidoCliente,
    setApellidoCliente,
    dniCliente,
    setDniCliente,
    emailCliente,
    setEmailCliente,
    celularCliente,
    setCelularCliente,
    fechaNacimientoCliente,
    setFechaNacimientoCliente,
    diagnosticoCliente,
    setDiagnosticoCliente,
    aptoFisicoCliente,
    setAptoFisicoCliente,
    nombreContactoEmergencia,
    setNombreContactoEmergencia,
    celularContactoEmergencia,
    setCelularContactoEmergencia,
  } = useClientes();

  const { auth, usuarioAutenticado, handleCargando } = useAuth();

  const consultarBase = async (dni) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post(`/clientes/comprobar`, { dni }, config);
      handleCargando();
      await nuevoCliente(
        nombreCliente,
        apellidoCliente,
        dniCliente,
        emailCliente,
        celularCliente,
        fechaNacimientoCliente,
        diagnosticoCliente,
        aptoFisicoCliente,
        nombreContactoEmergencia,
        celularContactoEmergencia,
        usuarioAutenticado
      );
      handleCargando();
      handleModalNuevoCliente();

      setNombreCliente("");
      setApellidoCliente("");
      setDniCliente("");
      setEmailCliente("");
      setCelularCliente("");
      setFechaNacimientoCliente("");
      setDiagnosticoCliente("");
      setAptoFisicoCliente("");
      setNombreContactoEmergencia("");
      setCelularContactoEmergencia("");
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

  //Comprueba que todos los campos esten ok, y de ser asi pasa a consultar si el cuit no corresponde a un usuario ya registrado
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [nombreCliente, apellidoCliente, dniCliente, celularCliente].includes("")
    ) {
      toast("⚠️ Nombre, apellido, dni y celular son obligatorios", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    await consultarBase(dniCliente);
  };

  return (
    <Transition.Root show={modalNuevoCliente} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleModalNuevoCliente}
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
                  onClick={handleModalNuevoCliente}
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
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Nuevo Cliente
                  </Dialog.Title>

                  <form className="mx-2 my-2" onSubmit={handleSubmit}>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="nombre"
                      >
                        Nombre
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={nombreCliente}
                        onChange={(e) => setNombreCliente(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="apellido"
                      >
                        Apellido
                      </label>
                      <input
                        id="apellido"
                        type="text"
                        placeholder="Apellido"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={apellidoCliente}
                        onChange={(e) => setApellidoCliente(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="dni"
                      >
                        DNI
                      </label>
                      <input
                        id="dni"
                        type="text"
                        placeholder="DNI"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={dniCliente}
                        onChange={(e) => setDniCliente(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Email "
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={emailCliente}
                        onChange={(e) => setEmailCliente(e.target.value)}
                      />
                    </div>

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="celu"
                      >
                        Celular
                      </label>
                      <input
                        id="celu"
                        type="text"
                        placeholder="Celular"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={celularCliente}
                        onChange={(e) => setCelularCliente(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="fechanac"
                      >
                        Fecha de nacimiento
                      </label>
                      <input
                        id="fechanac"
                        type="date"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={fechaNacimientoCliente}
                        onChange={(e) =>
                          setFechaNacimientoCliente(e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="diagnostico"
                      >
                        Diagnostico
                      </label>
                      <textarea
                        id="diagnostico"
                        type="text"
                        placeholder="Diagnostico"
                        rows={3}
                        className="mt-2 w-full resize-none rounded-md border-2 p-2 placeholder-gray-400"
                        value={diagnosticoCliente}
                        onChange={(e) => setDiagnosticoCliente(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="apto"
                      >
                        Apto Fisico
                      </label>
                      <select
                        id="apto"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={aptoFisicoCliente}
                        onChange={(e) => setAptoFisicoCliente(e.target.value)}
                      >
                        <option value="">--Seleccionar--</option>
                        <option value="si">Si</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="contactoNombre"
                      >
                        Nombre Contacto de emergencia
                      </label>
                      <input
                        id="contactoNombre"
                        type="text"
                        placeholder="Contacto Emergencia"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={nombreContactoEmergencia}
                        onChange={(e) =>
                          setNombreContactoEmergencia(e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="contactoTelefono"
                      >
                        Telefono Contacto de emergencia
                      </label>
                      <input
                        id="contactoTelefono"
                        type="text"
                        placeholder="Telefono Contacto Emergencia"
                        className="mb-2 mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={celularContactoEmergencia}
                        onChange={(e) =>
                          setCelularContactoEmergencia(e.target.value)
                        }
                      />
                    </div>

                    <input
                      type="submit"
                      className="w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                      value={"Guardar"}
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalResumen;
