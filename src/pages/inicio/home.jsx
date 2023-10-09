import React, { useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";

import useClientes from "@/hooks/useClientes";

import { ToastContainer } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import Qr from "@/components/Qr";
import TarjetasDash from "@/widgets/cards/tarjetas-dashboard";
import clases from "../../../public/img/clases.svg";
import clientes from "../../../public/img/clientes.svg";
import profesores from "../../../public/img/profesores.svg";
import ProximasClases from "@/components/inicio/ProximasClases";
import UltimasActualizaciones from "@/components/inicio/UltimasActualizaciones";

export function Home() {
  const { conteo, clientesRecientes, handleModalNuevoUsuario } = useClientes();

  const { modalQr, setUsuarioAutenticado, auth } = useAuth();

  useEffect(() => {
    setUsuarioAutenticado(auth._id);
  }, []);

  return (
    <div className="mt-12">
      <ToastContainer pauseOnFocusLoss={false} />

      <div className="mb-12 grid gap-x-6 gap-y-10 hover:cursor-pointer md:grid-cols-2 xl:grid-cols-3">
        <Card onClick={(e) => handleModalNuevoUsuario()}>
          <TarjetasDash
            key="1"
            title="Clases esta semana"
            value={
              <img
                src={clases}
                alt="Clases"
                className="max-h-48 w-full object-cover"
              />
            }
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className=" text-3xl font-bold text-blue-500">
                  30
                </strong>
              </Typography>
            }
          />
        </Card>

        <TarjetasDash
          key="2"
          title="Total de Clientes"
          value={
            <img
              src={clientes}
              alt="Clases"
              className="max-h-48 w-full object-cover"
            />
          }
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className=" text-3xl font-bold text-blue-500">980</strong>
            </Typography>
          }
        />
        <TarjetasDash
          key="3"
          title="Profesores"
          value={
            <img
              src={profesores}
              alt="Clases"
              className="max-h-48 w-full object-cover"
            />
          }
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className=" text-3xl font-bold text-blue-500">20</strong>
            </Typography>
          }
        />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ProximasClases />

        <UltimasActualizaciones />
      </div>

      {modalQr ? <Qr /> : ""}
    </div>
  );
}

export default Home;
