import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import useClientes from "@/hooks/useClientes";
import { ToastContainer, toast } from "react-toastify";
import clienteAxios from "@/configs/clinteAxios";
import useAuth from "@/hooks/useAuth";
import useSedes from "@/hooks/useSedes";
import useClases from "@/hooks/useClases";
import { convertirHora } from "@/helpers/convertirHora";

const ModalRecuperoAdmin = () => {
  const { handleCargando } = useAuth();

  const [opcionesDias, setOpcionesDias] = useState([]);

  const {
    idSede,
    setIdSede,
    diaDeLaSemana,
    setDiaDeLaSemana,
    obtenerClasesOrdenadas,
    clasesOrdenadas,
    idClaseSeleccionada,
    setIdClaseSeleccionada,
    setActualizoClasesCliente,
    handleModalClaseRecupero,
    recupero,
    setClasesOrdenadas,
    tipoCreditoAsignar,
    setTipoCreditoAsignar,
    idCreditoAsignar,
    setIdCreditoAsignar,
    recuperoAdmin,
    actualizarHistorial,
    setActualizarHistorial,
  } = useClases();

  const { obtenerSedes, sedes } = useSedes();
  const { cliente, modalRecuperoAdmin, handleModalRecuperoAdmin } =
    useClientes();

  const [renderizarClases, setRenderizarClases] = useState(false);

  useEffect(() => {
    const traerProfes = async () => {
      if (renderizarClases) {
        handleCargando();
        handleModalClaseRecupero();
        await obtenerClasesOrdenadas(idSede, diaDeLaSemana);
        setRenderizarClases(false);
        handleCargando();
        await handleModalClaseRecupero();
      }
    };
    traerProfes();
  }, [renderizarClases]);

  useEffect(() => {
    const traerSedes = async () => {
      await obtenerSedes();
    };
    traerSedes();
  }, []);

  useEffect(() => {
    setIdSede("");
    setDiaDeLaSemana("");
  }, []);

  useEffect(() => {
    setOpcionesDias(generarOpcionesDias());
  }, []);

  const handleRender = (dia) => {
    setDiaDeLaSemana(dia);
    setRenderizarClases(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([diaDeLaSemana, idClaseSeleccionada].includes("")) {
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
      handleModalRecuperoAdmin();
      await recuperoAdmin(
        cliente._id,
        idClaseSeleccionada,
        tipoCreditoAsignar,
        idCreditoAsignar
      );
      setDiaDeLaSemana("");
      setIdCreditoAsignar("");
      setTipoCreditoAsignar("");
      setIdClaseSeleccionada("");
      setActualizoClasesCliente(true);
      setActualizarHistorial(true);
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

  const generarOpcionesDias = () => {
    const dias = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ];
    let hoy = new Date();
    let opciones = [];

    for (let i = 0; i < 7; i++) {
      if (hoy.getDay() !== 0) {
        let dia = dias[hoy.getDay()];
        let fecha = `${hoy.getDate()}/${hoy.getMonth() + 1}`;
        opciones.push({ nombreDia: dia, etiqueta: `${dia} - ${fecha}` });
      }
      hoy.setDate(hoy.getDate() + 1);
    }

    return opciones;
  };

  const handleClose = () => {
    setDiaDeLaSemana("");
    setClasesOrdenadas([]);
    handleModalClaseRecupero();
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />
      <Modal
        isOpen={modalRecuperoAdmin}
        onRequestClose={handleModalRecuperoAdmin}
        className="fixed inset-0 z-10 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
        contentLabel="Recupero Admin Modal"
      >
        <div className="relative mx-auto w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
          <button
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-500"
            onClick={handleModalRecuperoAdmin}
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
          <h3 className="text-xl font-bold leading-6 text-gray-900">
            Inscribir a cliente en clase recupero
          </h3>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="text-sm font-bold uppercase text-gray-700">
                Selecciona la Sede
              </label>
              <select
                className="mt-2 w-full rounded-md border-2 p-2"
                value={idSede}
                onChange={(e) => setIdSede(e.target.value)}
              >
                <option value="">--Seleccionar--</option>
                {sedes.map((sede) => (
                  <option key={sede._id} value={sede._id}>
                    {sede.nombre ? sede.nombre + "-" : ""} {sede.direccion}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="text-sm font-bold uppercase text-gray-700">
                Dia
              </label>
              <select
                className="mt-2 w-full rounded-md border-2 p-2"
                value={diaDeLaSemana}
                onChange={(e) => handleRender(e.target.value)}
              >
                <option value="">--Seleccionar--</option>
                {opcionesDias.map((opcion, index) => (
                  <option key={index} value={opcion.nombreDia}>
                    {opcion.etiqueta}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="text-sm font-bold uppercase text-gray-700">
                Selecciona la Clase
              </label>
              <select
                className="mt-2 w-full rounded-md border-2 p-2"
                value={idClaseSeleccionada}
                onChange={(e) => setIdClaseSeleccionada(e.target.value)}
              >
                <option value="">--Seleccionar--</option>
                {clasesOrdenadas.map((clase) => (
                  <option key={clase._id} value={clase._id}>
                    {clase.nombreProfe} - {convertirHora(clase.horarioInicio)}{" "}
                    hs
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white hover:bg-blue-300"
            >
              Guardar
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalRecuperoAdmin;
