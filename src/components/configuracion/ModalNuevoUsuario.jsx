import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useClientes from "@/hooks/useClientes";
import { ToastContainer } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import Cargando from "../Cargando";
import useSedes from "@/hooks/useSedes";
import Swal from "sweetalert2";

const ModalNuevoUsuario = () => {
  const {
    modalNuevoCliente,
    handleModalNuevoCliente,
    nombreCliente,
    setNombreCliente,
    apellidoCliente,
    setApellidoCliente,
    emailCliente,
    setEmailCliente,
  } = useClientes();

  const { obtenerSedes, sedes } = useSedes();
  const {
    handleCargando,
    handleAgregarUsuarioApp,
    modalAgregarUsuarioApp,
    nuevoUsuarioBackOffice,
    setActualizarList,
  } = useAuth();

  // Estados adicionales para los campos dinámicos
  const [rol, setRol] = useState(""); // Para almacenar el rol seleccionado
  const [tipoSede, setTipoSede] = useState(""); // Para seleccionar "una sede" o "más de una sede"
  const [sedeSeleccionada, setSedeSeleccionada] = useState(""); // Para almacenar la sede seleccionada
  const [sedesSeleccionadas, setSedesSeleccionadas] = useState([]); // Para almacenar múltiples sedes

  useEffect(() => {
    const obtenerInfo = async () => {
      handleCargando();
      await obtenerSedes();
      handleCargando();
    };
    obtenerInfo();
  }, []);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSedesSeleccionadas([...sedesSeleccionadas, value]);
    } else {
      setSedesSeleccionadas(
        sedesSeleccionadas.filter((sede) => sede !== value)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos requeridos estén completos
    if (!nombreCliente || !apellidoCliente || !emailCliente || !rol) {
      Swal.fire({
        icon: "error",
        title: "Todos los campos son obligatorios",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // Verificación y asignación de sedes seleccionadas
    let sedesFinales = [];
    if (rol === "Socios" || rol === "Secretarias") {
      if (tipoSede === "una" && sedeSeleccionada) {
        sedesFinales = [sedeSeleccionada];
      } else if (tipoSede === "multiple" && sedesSeleccionadas.length > 0) {
        sedesFinales = sedesSeleccionadas;
      } else {
        Swal.fire({
          icon: "error",
          title: "Debe seleccionar al menos una sede",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
    }

    handleCargando();

    // Llamar a la función del context para registrar el usuario
    await nuevoUsuarioBackOffice(
      nombreCliente,
      apellidoCliente,
      "", // Asigna un DNI si lo tienes o maneja este campo adecuadamente
      "passwordTemporal", // Puedes cambiarlo o generar uno dinámico si es necesario
      emailCliente,
      "", // Asigna el número de teléfono si lo tienes en tu estado
      rol,
      sedesFinales
    );

    handleCargando();

    // Resetear los campos y cerrar el modal
    setNombreCliente("");
    setApellidoCliente("");
    setEmailCliente("");
    setRol("");
    setTipoSede("");
    setSedeSeleccionada("");
    setSedesSeleccionadas([]);
    setActualizarList(true);
    handleAgregarUsuarioApp(); // Cerrar el modal
  };
  return (
    <Transition.Root show={modalAgregarUsuarioApp} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleAgregarUsuarioApp}
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
                  onClick={handleAgregarUsuarioApp}
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
                    Nuevo Usuario Backoffice
                  </Dialog.Title>

                  <form className="mx-2 my-2" onSubmit={handleSubmit}>
                    {/* Campos generales */}
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
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={emailCliente}
                        onChange={(e) => setEmailCliente(e.target.value)}
                      />
                    </div>

                    {/* Select para el rol */}
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="rol"
                      >
                        Rol
                      </label>
                      <select
                        id="rol"
                        className="mt-2 w-full rounded-md border-2 p-2"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                      >
                        <option value="">Seleccionar Rol</option>
                        <option value="admin">SuperAdministrador</option>
                        <option value="socio">Socios</option>
                        <option value="secretaria">Secretarias</option>
                      </select>
                    </div>

                    {/* Campos dinámicos según el rol */}
                    {rol === "Socios" || rol === "Secretarias" ? (
                      <>
                        <div className="mb-1">
                          <label
                            className="text-sm font-bold uppercase text-gray-700"
                            htmlFor="tipoSede"
                          >
                            Tipo de Sede
                          </label>
                          <select
                            id="tipoSede"
                            className="mt-2 w-full rounded-md border-2 p-2"
                            value={tipoSede}
                            onChange={(e) => setTipoSede(e.target.value)}
                          >
                            <option value="">Seleccionar Tipo de Sede</option>
                            <option value="una">Una sede</option>
                            <option value="multiple">Más de una sede</option>
                          </select>
                        </div>

                        {tipoSede === "una" && (
                          <div className="mb-1">
                            <label
                              className="text-sm font-bold uppercase text-gray-700"
                              htmlFor="sede"
                            >
                              Sede
                            </label>
                            <select
                              id="sede"
                              className="mt-2 w-full rounded-md border-2 p-2"
                              value={sedeSeleccionada}
                              onChange={(e) =>
                                setSedeSeleccionada(e.target.value)
                              }
                            >
                              <option value="">Seleccionar Sede</option>
                              {sedes.map((sede) => (
                                <option key={sede._id} value={sede._id}>
                                  {sede.nombre}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {tipoSede === "multiple" && (
                          <div className="mb-1">
                            <label className="text-sm font-bold uppercase text-gray-700">
                              Seleccionar Sedes
                            </label>
                            {sedes.map((sede) => (
                              <div key={sede._id} className="flex items-center">
                                <input
                                  type="checkbox"
                                  value={sede._id}
                                  onChange={handleCheckboxChange}
                                />
                                <label className="ml-2 text-gray-700">
                                  {sede.nombre}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : null}

                    <input
                      type="submit"
                      className="mt-4 w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                      value={"Guardar"}
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
          <Cargando />
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalNuevoUsuario;
