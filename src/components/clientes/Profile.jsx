import {
  Card,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ArrowLeftCircleIcon,
  CurrencyDollarIcon,
  PlusIcon,
  BanknotesIcon,
  ReceiptPercentIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import { projectsTableData } from "@/data";
import { SpinnerCircular } from "spinners-react";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";

import useClientes from "@/hooks/useClientes";
import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";

import EditarCliente from "./EditarCliente";
import Swal from "sweetalert2";

import { formatearFecha } from "@/helpers/formatearFecha";

export function Profile() {
  const {
    cuitEditar,
    setSeleccion,
    setCuitEditar,
    editarCliente,
    obtenerCliente,
    modalAgregarUsuario,
    setEditarCliente,
    valueProfile,
    setValueProfile,
    setFormaDePago,
    formaDePago,
    obtenerUsuario,
    cargando,
    setEfectivo,
    setTipo,
    setNombre,
    setCuit,
    setDomicilio,
    setEmailFactura,
    setFechaVencimiento,
    setCantidad,
    nombreUsuario,
    setConfiguracionDelCliente,
    configuracionDelCliente,
    isActivo,
    desactivarCliente,
    obtenerUsuarioProfile,
    handleModalAgregarUsuario,
    handleModalEditarCliente,
    dataUserProvider,
    handleModalEditarUsuario,
    setPlanes,
    setNombreUsuario,
    setApellidoUsuario,
    setDniUsuario,
    setEmailUsuario,
    setCeluUsuario,
    setIdUsuarioModificar,
    handleModalAdicional,
    obtenerAdicionales,
    adicional,
    handleModalEditarAdicional,
    descripcionAd,
    setDescripcionAd,
    importeAd,
    setImporteAd,
    notasAd,
    setNotasAd,
    idAdicionalmodificar,
    setIdAdicionalModificar,
    actualizoUsuarios,
    setActualizoUsuarios,
  } = useClientes();

  const [renderizo, setRenderizo] = useState(false);

  useEffect(() => {
    obtenerCliente(cuitEditar);
    // obtenerUs(obtenerUs);
    setConfiguracionDelCliente("Configuracion del Cliente");
  }, []);

  useEffect(() => {
    const obtener = async () => {
      await obtenerUsuarioProfile(cuitEditar);
    };
    obtener();
  }, []);

  useEffect(() => {
    const actualizo = async () => {
      if (actualizoUsuarios) {
        await obtenerUsuarioProfile(cuitEditar);
        setActualizoUsuarios(false);
      }
    };
    actualizo();
  }, [actualizoUsuarios]);

  useEffect(() => {
    const obtener = async () => {
      await obtenerAdicionales(cuitEditar);
    };
    obtener();
  }, []);

  const handleBack = (e) => {
    e.preventDefault();
    setEditarCliente("");
    setTipo("");
    setCuitEditar("");
    setNombre("");
    setCuit("");
    setDomicilio("");
    setEmailFactura("");
    setFechaVencimiento("");
    setCantidad("");
    setSeleccion(1);
  };

  const handleAgregarUser = () => {
    console.log("Agregar usuario");
    handleModalAgregarUsuario();
  };

  const handleClick = async () => {
    if (isActivo == true) {
      Swal.fire({
        title: "Seguro queres desactivar al cliente?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await desactivarCliente({
            id: cuitEditar,
            isActivo: isActivo,
          });
        }
      });
    } else {
      Swal.fire({
        title: "Seguro queres activar al cliente?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await desactivarCliente({
            id: cuitEditar,
            isActivo: isActivo,
          });
        }
      });
    }
  };

  const handleEdit = async (celu, email, dni, apellido, nombre, plan, _id) => {
    setPlanes(plan);
    setNombreUsuario(nombre);
    setApellidoUsuario(apellido);
    setDniUsuario(dni);
    setEmailUsuario(email);
    setCeluUsuario(celu);
    setIdUsuarioModificar(_id);
    handleModalEditarUsuario();
  };

  const handleClickEditar = async () => {
    setRenderizo(true);
    handleModalEditarCliente();
    setRenderizo(false);
  };

  const handleAdicional = async () => {
    handleModalAdicional();
  };

  const handleModificarAdicional = async (_id, detalle, importe, notas) => {
    setDescripcionAd(detalle);
    setImporteAd(importe);
    setNotasAd(notas);
    setIdAdicionalModificar(_id);
    handleModalEditarAdicional();
  };

  if (cargando)
    return (
      <div className="align-middle">
        <SpinnerCircular />
      </div>
    );
  return (
    <>
      {cargando ? (
        <div className="text-center align-middle">
          <SpinnerCircular />
        </div>
      ) : (
        <>
          <ToastContainer pauseOnFocusLoss={false} />

          <div>
            <button
              type="button"
              className="bg-red rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={(e) => handleBack(e)}
            >
              <ArrowLeftCircleIcon />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              ></svg>
            </button>
          </div>

          <div className="relative h-10 w-full overflow-hidden rounded-xl bg-center">
            <div className=" absolute inset-0 h-full w-full " />
          </div>

          <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
            <CardBody className="p-4">
              <div className="mb-10 flex items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {editarCliente.nombre}
                    </Typography>
                    <Typography
                      variant="small"
                      className={`font-normal ${
                        isActivo ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isActivo ? "Cliente Activo" : "Cliente inactivo"}
                    </Typography>
                  </div>
                </div>
                <div className="block w-96">
                  <Tabs value="app">
                    <TabsHeader>
                      <Tab value="app" onClick={(e) => setValueProfile(1)}>
                        <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                        Inicio
                      </Tab>
                      <Tab value="message" onClick={(e) => setValueProfile(2)}>
                        <CurrencyDollarIcon className="w-15 -mt-0.5 mr-2 inline-block h-5" />
                        Resumen
                      </Tab>
                      <Tab value="settings" onClick={(e) => setValueProfile(3)}>
                        <PlusIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                        Adicionales
                      </Tab>
                    </TabsHeader>
                  </Tabs>
                </div>
              </div>
              {valueProfile == 1 ? (
                <>
                  <div className="mb-12 grid grid-cols-2 gap-28 px-4 lg:grid-cols-2 xl:grid-cols-2">
                    <div>
                      <ProfileInfoCard
                        title="Informacion"
                        details={{
                          Nombre: `${editarCliente.nombre}`,
                          "Telefono Corporativo": `${
                            editarCliente.telefono ? editarCliente.telefono : ""
                          }`,
                          "Email Factura": `${editarCliente.mailFactura}`,
                          Direccion: `${editarCliente.domicilio}`,
                          // "Fecha de Vencimiento": `${formatearFecha(
                          //   editarCliente.fechaVencimiento
                          // )}`,
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-end">
                      <div className="mb-2">
                        <Button
                          className={`bg-red-300 ${
                            isActivo ? "bg-red-500" : "bg-green-500"
                          }`}
                          onClick={(e) => handleClick()}
                        >
                          {isActivo === true
                            ? "Desactivar Cliente"
                            : "Activar Cliente"}
                        </Button>
                      </div>

                      <div className="mb-2">
                        <Button
                          className={`bg-blue-gray-300`}
                          onClick={(e) => handleAgregarUser()}
                        >
                          Agregar Usuario
                        </Button>
                      </div>
                      <div className="mb-2">
                        <Button
                          className={`bg-green-300`}
                          onClick={(e) => handleClickEditar()}
                        >
                          Editar Datos
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
                    <table className="w-full min-w-[640px] table-auto">
                      <thead>
                        <tr>
                          {[
                            "Nombre",
                            "Email",
                            "Celu",
                            "confirmado",
                            "Accion",
                          ].map((el) => (
                            <th
                              key={el}
                              className="border-b border-blue-gray-50 px-6 py-3 text-left"
                            >
                              <Typography
                                variant="small"
                                className="text-[11px] font-medium uppercase text-blue-gray-400"
                              >
                                {el}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {obtenerUsuario.map(
                          (
                            {
                              _id,
                              nombre,
                              apellido,
                              plan,
                              email,
                              confirmado,
                              celu,
                              dni,
                            },
                            key
                          ) => {
                            const className = `py-3 px-5 ${
                              key === projectsTableData.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                            }`;

                            return (
                              <tr key={_id}>
                                <td className={className}>
                                  <div className="flex items-center gap-4">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-bold"
                                    >
                                      {nombre}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    className="text-xs font-medium text-blue-gray-600"
                                  >
                                    {email}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    className="text-xs font-medium text-blue-gray-600"
                                  >
                                    {celu}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    className="text-xs font-medium text-blue-gray-600"
                                  >
                                    {confirmado ? "SI" : "NO"}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    className="mx-2 flex text-xs font-medium text-blue-gray-600"
                                  >
                                    <Button
                                      color="gradient"
                                      className="items-center gap-4 px-6 capitalize"
                                      fullWidth
                                      onClick={(e) =>
                                        handleEdit(
                                          celu,
                                          email,
                                          dni,
                                          apellido,
                                          nombre,
                                          plan,
                                          _id
                                        )
                                      }
                                    >
                                      <Typography
                                        color="inherit"
                                        className="font-medium capitalize"
                                      >
                                        editar
                                      </Typography>
                                    </Button>
                                  </Typography>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </CardBody>
                </>
              ) : valueProfile == 2 ? (
                <>
                  <div className="mb-12 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3 ">
                    <Card>
                      <Button
                        variant="gradient"
                        color="pink"
                        className="absolute -mt-4 grid h-16 w-16 place-items-center"
                        // onClick={(e)=> log}
                      >
                        <BanknotesIcon />
                      </Button>
                      <CardBody className="p-4 text-right">
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-600"
                        >
                          Nueva Factura
                        </Typography>
                      </CardBody>
                    </Card>
                    <Card>
                      <Button
                        variant="gradient"
                        color="green"
                        className="absolute -mt-4 grid h-16 w-16 place-items-center"
                        onClick={(e) => setSeleccion(4)}
                      >
                        <ReceiptPercentIcon />
                      </Button>
                      <CardBody className="p-4 text-right">
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-600"
                        >
                          Nuevo Recibo
                        </Typography>
                      </CardBody>
                    </Card>

                    <Card>
                      <Button
                        variant="gradient"
                        color="blue"
                        className="absolute -mt-4 grid h-16 w-16 place-items-center"
                        onClick={(e) => handleOpen(e, "asistencia")}
                      >
                        <CalendarDaysIcon />
                      </Button>
                      <CardBody className="p-4 text-right">
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-600"
                        >
                          Reservar Sala
                        </Typography>
                      </CardBody>
                    </Card>
                  </div>
                  <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
                    <table className="w-full min-w-[640px] table-auto">
                      <thead>
                        <tr>
                          {[
                            "Comprobante",
                            "Numero",
                            "Importe",
                            "Debe",
                            "Haber",
                            "Editar",
                            "Descargar",
                          ].map((el) => (
                            <th
                              key={el}
                              className="border-b border-blue-gray-50 px-6 py-3 text-left"
                            >
                              <Typography
                                variant="small"
                                className="text-[11px] font-medium uppercase text-blue-gray-400"
                              >
                                {el}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>
                    </table>
                  </CardBody>
                </>
              ) : valueProfile == 3 ? (
                <>
                  <div className="mb-12 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4 ">
                    <Card>
                      <Button
                        variant="gradient"
                        color="pink"
                        className="absolute -mt-4 grid h-16 w-16 place-items-center"
                        onClick={(e) => handleAdicional()}
                      >
                        <BanknotesIcon />
                      </Button>
                      <CardBody className="p-4 text-right">
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-600"
                        >
                          Nuevo Adicional
                        </Typography>
                      </CardBody>
                    </Card>
                  </div>
                  <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
                    <table className="w-full min-w-[640px] table-auto">
                      <thead>
                        <tr>
                          {[
                            "Fecha",
                            "Concepto",
                            "Importe",
                            "Notas",
                            "Accion",
                          ].map((el) => (
                            <th
                              key={el}
                              className="border-b border-blue-gray-50 px-6 py-3 text-left"
                            >
                              <Typography
                                variant="small"
                                className="text-[11px] font-medium uppercase text-blue-gray-400"
                              >
                                {el}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      {adicional == "" ? (
                        ""
                      ) : (
                        <>
                          <tbody>
                            {adicional.map(
                              (
                                { _id, fecha, detalle, importe, notas },
                                key
                              ) => {
                                const className = `py-3 px-5 ${
                                  key === projectsTableData.length - 1
                                    ? ""
                                    : "border-b border-blue-gray-50"
                                }`;

                                return (
                                  <tr key={_id}>
                                    <td className={className}>
                                      <div className="flex items-center gap-4">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-bold"
                                        >
                                          {formatearFecha(fecha)}
                                        </Typography>
                                      </div>
                                    </td>
                                    <td className={className}>
                                      <Typography
                                        variant="small"
                                        className="text-xs font-medium text-blue-gray-600"
                                      >
                                        {detalle}
                                      </Typography>
                                    </td>
                                    <td className={className}>
                                      <Typography
                                        variant="small"
                                        className="text-xs font-medium text-blue-gray-600"
                                      >
                                        $ {importe}
                                      </Typography>
                                    </td>
                                    <td className={className}>
                                      <Typography
                                        variant="small"
                                        className="text-xs font-medium text-blue-gray-600"
                                      >
                                        {notas}
                                      </Typography>
                                    </td>
                                    <td className={className}>
                                      <Typography
                                        variant="small"
                                        className="mx-2 flex text-xs font-medium text-blue-gray-600"
                                      >
                                        <Button
                                          className="items-center gap-4 px-6 capitalize"
                                          fullWidth
                                          onClick={(e) =>
                                            handleModificarAdicional(
                                              _id,
                                              detalle,
                                              importe,
                                              notas
                                            )
                                          }
                                        >
                                          <Typography
                                            color="inherit"
                                            className="mr-5 font-medium capitalize"
                                          >
                                            editar
                                          </Typography>
                                        </Button>
                                      </Typography>
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </>
                      )}
                    </table>
                  </CardBody>
                </>
              ) : (
                ""
              )}
            </CardBody>
          </Card>
        </>
      )}

      <EditarCliente />
    </>
  );
}

export default Profile;
