import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useClientes from "@/hooks/useClientes";
import { ToastContainer, toast } from "react-toastify";
import { formatearFecha } from "@/helpers/formatearFecha";

const TIPO = ["A", "B"];

const EditarCliente = () => {
  const {
    setNombre,
    editarC,

    nombre,
    fechaVencimiento,
    setFechaVencimiento,
    setEmailFactura,
    cuit,
    setCuit,
    tipo,
    setTipo,
    emailFactura,

    modalEditarCliente,
    handleModalEditarCliente,
    editarCliente,
    domicilio,
    setDomicilio,
    cuitEditar,
    obtenerCliente,
    onCloseEditar,
  } = useClientes();

  let fecha = "";

  useEffect(() => {
    const editar = async () => {
      await obtenerCliente(cuitEditar);
    };
    editar();
  }, []);

  useEffect(() => {
    if (fechaVencimiento) {
      setFechaVencimiento(
        new Date(fechaVencimiento).toISOString().substr(0, 10)
      );
    }
  }, []);

  //Comprueba que todos los campos esten ok, y de ser asi pasa a consultar si el cuit no corresponde a un usuario ya registrado
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nombre);
    console.log(cuit);
    console.log(emailFactura);
    console.log(fechaVencimiento);

    if ([nombre, cuit, emailFactura, fechaVencimiento].includes("")) {
      toast("⚠️ Todos los campos son obligatorios", {
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
    // handleModalNuevoCliente();

    // validarCuit(cuit);
    await editarC({
      id: cuitEditar,
      tipo: tipo,
      nombre: nombre,
      cuit: cuit,
      domicilio: domicilio,
      emailFactura: emailFactura,
      fechaVencimiento: fechaVencimiento,
    });

    setTimeout(() => {
      handleModalEditarCliente();
    }, 1000);
  };

  return (
    <Transition.Root show={modalEditarCliente} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleModalEditarCliente}
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
                  onClick={onCloseEditar}
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
                    Editar Cliente
                  </Dialog.Title>

                  <form className="mx-2 my-2" onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="plan"
                      >
                        Tipo
                      </label>
                      <select
                        id="plan"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                      >
                        <option value="">--Seleccionar--</option>
                        {TIPO.map((opcion) => (
                          <option key={opcion}>{opcion}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="razon"
                      >
                        {tipo === "A" || tipo === ""
                          ? "Razon Social"
                          : "Nombre"}
                      </label>
                      <input
                        id="razon"
                        type="text"
                        placeholder={
                          tipo === "A" || tipo === ""
                            ? "Razon Social"
                            : "Nombre"
                        }
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="cuit"
                      >
                        {tipo === "A" || tipo === "" ? "Cuit" : "Dni"}
                      </label>
                      <input
                        id="cuit"
                        type="text"
                        placeholder={
                          tipo === "A" || tipo === "" ? "Cuit" : "Dni"
                        }
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={cuit}
                        onChange={(e) => setCuit(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="domicilio"
                      >
                        Domicilio
                      </label>
                      <input
                        id="domicilio"
                        type="text"
                        placeholder="Domicilio"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={domicilio}
                        onChange={(e) => setDomicilio(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="email"
                      >
                        Email Facturacion
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Email "
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={emailFactura}
                        onChange={(e) => setEmailFactura(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="fecha-venc"
                      >
                        Proximo vencimiento del plan
                      </label>
                      <input
                        id="fecha-venc"
                        type="date"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={fechaVencimiento}
                        onChange={(e) => setFechaVencimiento(e.target.value)}
                      />
                    </div>

                    <input
                      type="submit"
                      className="w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                      value={"Guardar Cambios"}
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

export default EditarCliente;
