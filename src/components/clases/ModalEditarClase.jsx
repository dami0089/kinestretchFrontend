import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";

import useSedes from "@/hooks/useSedes";
import useClases from "@/hooks/useClases";
import useProfesores from "@/hooks/useProfesores";
import Swal from "sweetalert2";

const ModalEditarClase = () => {
  const { obtenerSedes, sedes } = useSedes();

  const { obtenerProfesores, profesores } = useProfesores();

  const {
    editarClase,
    idSede,
    setIdSede,
    diaDeLaSemana,
    setDiaDeLaSemana,
    horaInicio,
    setHoraInicio,
    idProfesor,
    setIdProfesor,
    cupo,
    setCupo,
    handleModalEditarClase,
    modalEditarClase,
    idClaseEditar,
    setRecargoListado,
    handleModalEnviarMensajeClase,

    setClaseEditada,
  } = useClases();
  const { usuarioAutenticado, handleCargando } = useAuth();
  const [nuevoProfe, setNuevoProfe] = useState("");

  useEffect(() => {
    const traerSedes = async () => {
      await obtenerSedes();
      console.log(idProfesor);

      setNuevoProfe(idProfesor);
    };
    traerSedes();
  }, []);

  useEffect(() => {
    const traerProfes = async () => {
      await obtenerProfesores();
    };
    traerProfes();
  }, []);

  //Comprueba que todos los campos esten ok, y de ser asi pasa a consultar si el cuit no corresponde a un usuario ya registrado
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([idSede, diaDeLaSemana, horaInicio, idProfesor, cupo].includes("")) {
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
      await editarClase(
        idClaseEditar,
        idSede,
        diaDeLaSemana,
        horaInicio,
        nuevoProfe,
        usuarioAutenticado,
        cupo
      );

      setClaseEditada(true);

      if (nuevoProfe !== idProfesor) {
        Swal.fire({
          title: "Te gustaria comunicar el cambio a la clase?",
          showDenyButton: true,
          confirmButtonText: `Si`,
          denyButtonText: `No`,
        }).then((result) => {
          console.log(result);

          if (result.isConfirmed) {
            handleModalEnviarMensajeClase();
          }
        });
      } else {
        setIdSede("");
        setDiaDeLaSemana("");
        setHoraInicio("");
        setIdProfesor("");
        setCupo(0);
        setRecargoListado(true);
      }

      handleModalEditarClase();
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

  return (
    <Transition.Root show={modalEditarClase} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleModalEditarClase}
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
                  onClick={handleModalEditarClase}
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
                    Editar Clase
                  </Dialog.Title>

                  <form className="mx-2 my-2" onSubmit={handleSubmit}>
                    <div>
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="origen"
                      >
                        Selecciona la Sede
                      </label>

                      <select
                        id="origen"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={idSede}
                        onChange={(e) => setIdSede(e.target.value)}
                      >
                        <option value="">--Seleccionar--</option>

                        {sedes.map((sede) => (
                          <option key={sede._id} value={sede._id}>
                            {sede.nombre ? sede.nombre + "-" : ""}

                            {sede.direccion}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="dia"
                      >
                        Dia
                      </label>
                      <select
                        id="dia"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={diaDeLaSemana}
                        onChange={(e) => setDiaDeLaSemana(e.target.value)}
                      >
                        <option value="">--Seleccionar--</option>
                        <option value="Lunes">Lunes</option>
                        <option value="Martes">Martes</option>
                        <option value="Miercoles">Miercoles</option>
                        <option value="Jueves">Jueves</option>
                        <option value="Viernes">Viernes</option>
                        <option value="Sabado">Sabado</option>
                      </select>
                    </div>
                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="horario"
                      >
                        Horario de Inicio
                      </label>
                      <select
                        id="horario"
                        className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                      >
                        <option value="">--Seleccionar--</option>
                        <option value="8">8:00 hs</option>
                        <option value="8.5">8:30 hs</option>
                        <option value="9">9:00 hs</option>
                        <option value="9.5">9:30 hs</option>
                        <option value="10">10:00 hs</option>
                        <option value="10.5">10:30 hs</option>
                        <option value="11">11:00 hs</option>
                        <option value="11.5">11:30 hs</option>
                        <option value="12">12:00 hs</option>
                        <option value="12.5">12:30 hs</option>
                        <option value="13">13:00 hs</option>
                        <option value="13.5">13:30 hs</option>
                        <option value="14">14:00 hs</option>
                        <option value="14.5">14:30 hs</option>
                        <option value="15">15:00 hs</option>
                        <option value="15.5">15:30 hs</option>
                        <option value="16">16:00 hs</option>
                        <option value="16.5">16:30 hs</option>
                        <option value="17">17:00 hs</option>
                        <option value="17.5">17:30 hs</option>
                        <option value="18">18:00 hs</option>
                        <option value="18.5">18:30 hs</option>
                        <option value="19">19:00 hs</option>
                        <option value="19.5">19:30 hs</option>
                        <option value="20">20:00 hs</option>
                        <option value="20.5">20:30 hs</option>
                        <option value="21">21:00 hs</option>
                        <option value="21.5">21:30 hs</option>
                        <option value="22">22:00 hs</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="profe"
                      >
                        Selecciona el Profesor
                      </label>

                      <select
                        id="profe"
                        className="mb-3 mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        value={nuevoProfe}
                        onChange={(e) => setNuevoProfe(e.target.value)}
                      >
                        <option value="">--Seleccionar--</option>

                        {profesores.map((profe) => (
                          <option key={profe._id} value={profe._id}>
                            {profe.nombre} {profe.apellido}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-1">
                      <label
                        className="text-sm font-bold uppercase text-gray-700"
                        htmlFor="cupo"
                      >
                        Cupo de la clase
                      </label>
                      <input
                        id="cupo"
                        className="mb-5 mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                        type="number"
                        placeholder="Ingrese el cupo"
                        value={cupo}
                        onChange={(e) => setCupo(e.target.value)}
                      ></input>
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

export default ModalEditarClase;
