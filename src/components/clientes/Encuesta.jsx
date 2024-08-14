import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import useClases from "@/hooks/useClases";
import { ToastContainer } from "react-toastify";
import Cargando from "../Cargando";
import useAuth from "@/hooks/useAuth";

const Encuesta = () => {
  const { enviarEncuesta } = useClases();
  const { handleCargando } = useAuth();
  const params = useParams();
  const { id, kind } = params;
  const [gustoClase, setGustoClase] = useState("");
  const [diferenciaPostClase, setDiferenciaPostClase] = useState("");
  const [acompanamiento, setAcompanamiento] = useState("");
  const [comentarios, setComentarios] = useState("");

  useEffect(() => {
    if (kind === "1") {
      setGustoClase("mucho");
    }
    if (kind === "2") {
      setGustoClase("regular");
    }
    if (kind === "3") {
      setGustoClase("poco");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      handleCargando();
      await enviarEncuesta(
        gustoClase,
        diferenciaPostClase,
        acompanamiento,
        comentarios,
        id
      );
      handleCargando();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />
      <form className="mx-auto my-8 w-full max-w-lg" onSubmit={handleSubmit}>
        <Typography className="text-center font-bold uppercase" variant="h4">
          Encuesta de satisfacción
        </Typography>

        {/* Pregunta 1 */}
        <label
          htmlFor="gustoClase"
          className="my-2 block text-sm font-bold text-gray-700"
        >
          1- ¿Te gustó la clase?
        </label>
        <select
          id="gustoClase"
          value={gustoClase}
          onChange={(e) => setGustoClase(e.target.value)}
          className="mb-3 w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow"
        >
          <option value="">Selecciona una opción</option>
          <option value="mucho">Mucho</option>
          <option value="algo">Regular</option>
          <option value="poco">Poco</option>
        </select>

        {/* Pregunta 2 */}
        <label
          htmlFor="diferenciaPostClase"
          className="my-2 block text-sm font-bold text-gray-700"
        >
          2- ¿Notaste alguna diferencia después de la clase?
        </label>
        <select
          id="diferenciaPostClase"
          value={diferenciaPostClase}
          onChange={(e) => setDiferenciaPostClase(e.target.value)}
          className="w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow"
        >
          <option value="">Selecciona una opción</option>
          <option value="mucho">Mucho</option>
          <option value="algo">Regular</option>
          <option value="poco">Poco</option>
        </select>

        {/* Pregunta 3 */}
        <label
          htmlFor="acompanamiento"
          className="my-2 block text-sm font-bold text-gray-700"
        >
          3- ¿Te sentiste acompañado/a por el profesional que dio la clase?
        </label>
        <select
          id="acompanamiento"
          value={acompanamiento}
          onChange={(e) => setAcompanamiento(e.target.value)}
          className="w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow"
        >
          <option value="">Selecciona una opción</option>
          <option value="mucho">Mucho</option>
          <option value="algo">Regular</option>
          <option value="poco">Poco</option>
        </select>

        {/* Textarea para comentarios */}
        <label
          htmlFor="comentarios"
          className="my-2 block text-sm font-bold text-gray-700"
        >
          ¿Puedes comentarnos más sobre tu experiencia en Kinestretch?
        </label>
        <textarea
          id="comentarios"
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
          className="w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow"
          rows="4"
        ></textarea>

        {/* Botón de envío */}
        <button
          type="submit"
          className="focus:shadow-outline my-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Enviar Encuesta
        </button>
      </form>
      <Cargando />
    </>
  );
};

export default Encuesta;
