import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Cargando from "@/components/Cargando";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";
import { Button } from "@material-tailwind/react";
import { useEffect } from "react";

export function Terminos() {
  const {
    nuevosTerminos,
    content,
    setContent,
    estado,
    setEstado,
    obtenerTerminos,
    handleCargando,
  } = useAuth();

  useEffect(() => {
    const obtenerTerm = async () => {
      handleCargando();
      await obtenerTerminos();
      handleCargando();
    };
    obtenerTerm();
  }, []);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!estado) {
      Swal.fire("Error", "Debe seleccionar un estado", "error");
      return;
    }
    if (!content) {
      Swal.fire("Error", "Debe agregar contenido a los terminos", "error");
      return;
    }
    await nuevosTerminos(content, estado);
  };

  return (
    <>
      <div className="mt-10 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className=" text-2xl font-bold">Términos y Condiciones</h1>
          <Button
            className="hover:cursor-pointer"
            onClick={(e) => handleSubmit(e)}
          >
            Guardar
          </Button>
        </div>
        <div>
          <div className="mb-4 text-center ">
            <label
              className="text-sm font-bold uppercase text-gray-700"
              htmlFor="dia"
            >
              Estado
            </label>
            <select
              id="dia"
              className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="">--Seleccionar--</option>
              <option value="borrador">Borrador</option>
              <option value="activa">Activa</option>
            </select>
          </div>
        </div>
      </div>
      <div className=" flex flex-wrap ">
        <ToastContainer pauseOnFocusLoss={false} />

        <div className="mb-5 w-full">
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            className="h-[500px]"
          />
        </div>
        <Cargando />
      </div>
    </>
  );
}

export default Terminos;
