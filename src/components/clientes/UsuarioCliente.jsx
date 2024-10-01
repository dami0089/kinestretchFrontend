import {
  Avatar,
  Button,
  Card,
  CardBody,
  Progress,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

import React, { useEffect } from "react";
import { projectsTableData } from "@/data";
import useClientes from "@/hooks/useClientes";

import useAuth from "@/hooks/useAuth";
import Cargando from "../Cargando";

import { formatearFecha } from "@/helpers/formatearFecha";
import Swal from "sweetalert2";
import useClases from "@/hooks/useClases";

const UsuarioCliente = () => {
  const { idClienteEditar } = useClientes();

  const { setActualizoClasesCliente, actualizoClasesCliente } = useClases();

  const {
    handleCargando,
    usuarioCliente,
    obtenerUsuarioCliente,
    nuevoUsuairoPerfilAdmin,
    eliminarUsuario,
  } = useAuth();

  useEffect(() => {
    const traerData = async () => {
      handleCargando();
      await obtenerUsuarioCliente(idClienteEditar);
      handleCargando();
    };
    traerData();
  }, []);

  useEffect(() => {
    const traerData = async () => {
      if (actualizoClasesCliente) {
        handleCargando();
        await obtenerUsuarioCliente(idClienteEditar);
        setActualizoClasesCliente(false);
        handleCargando();
      }
    };
    traerData();
  }, [actualizoClasesCliente]);
  // Controlador para mostrar el modal de Swal al hacer clic en "Agregar"

  const handleAgregarUsuario = () => {
    Swal.fire({
      title: "Agregar nuevo usuario",
      text: "Ingresa el email del nuevo usuario:",
      input: "email",
      inputPlaceholder: "example@email.com",
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      preConfirm: (email) => {
        if (!email) {
          Swal.showValidationMessage("Por favor ingresa un email válido");
        }
        return email;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        const email = result.value;
        await nuevoUsuairoPerfilAdmin(idClienteEditar, email);
        setActualizoClasesCliente(true);
        handleCargando();
      }
    });
  };

  const handleEliminar = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleCargando();
        await eliminarUsuario(id);
        setActualizoClasesCliente(true);
        handleCargando();
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Typography className="ml-4 text-start font-bold uppercase text-blue-gray-700">
          Usuario del cliente
        </Typography>
        <Button onClick={handleAgregarUsuario}>Agregar</Button>
      </div>

      <div className=" mb-4 mt-10 grid grid-cols-1 gap-6  xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Nombre", "Email", "Accion"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 bg-blue-50 px-6 py-3 text-center"
                    >
                      <Typography
                        variant="small"
                        className=" text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usuarioCliente.map(({ _id, nombre, apellido, email }, key) => {
                  const className = `py-3 px-5  ${
                    key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={_id}>
                      <td className={className}>
                        <div className="flex items-center justify-center gap-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {nombre} {apellido}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="flex items-center justify-center gap-4">
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {email}
                          </Typography>
                        </div>
                      </td>

                      <td className={className}>
                        <div className="flex justify-center">
                          {/* <div className="mr-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.28em"
                              height="1em"
                              viewBox="0 0 1792 1408"
                              className="h-8 w-8 hover:cursor-pointer"
                            >
                              <path
                                fill="currentColor"
                                d="m888 1056l116-116l-152-152l-116 116v56h96v96zm440-720q-16-16-33 1L945 687q-17 17-1 33t33-1l350-350q17-17 1-33m80 594v190q0 119-84.5 203.5T1120 1408H288q-119 0-203.5-84.5T0 1120V288Q0 169 84.5 84.5T288 0h832q63 0 117 25q15 7 18 23q3 17-9 29l-49 49q-14 14-32 8q-23-6-45-6H288q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113V994q0-13 9-22l64-64q15-15 35-7t20 29m-96-738l288 288l-672 672H640V864zm444 132l-92 92l-288-288l92-92q28-28 68-28t68 28l152 152q28 28 28 68t-28 68"
                              />
                            </svg>
                          </div> */}
                          <div title="Eliminar">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                              className="h-8 w-8 hover:cursor-pointer"
                              onClick={(e) => handleEliminar(e, _id)}
                            >
                              <path
                                fill="currentColor"
                                d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Cargando />
      </div>
    </>
  );
};

export default UsuarioCliente;
