import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import clienteAxios from "@/configs/clinteAxios";
import useAuth from "@/hooks/useAuth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import imagen from "../../../public/img/DSC_4871.jpg";
import Cargando from "@/components/Cargando";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setAuth, handleCargando } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if ([email, password].includes("")) {
      toast("⚠️ Todos los campos son obligatorios!", {
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

    try {
      handleCargando();
      const { data } = await clienteAxios.post("/usuarios/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      await setAuth(data);
      handleCargando();

      navigate("/inicio");
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <img
        src={imagen}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <ToastContainer pauseOnFocusLoss={false} />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute left-2/4 top-2/4 w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4">
          <CardHeader
            variant="gradient"
            className="mb-4 grid h-28 place-items-center bg-blue-gray-200"
          >
            <Typography variant="h2" color="white" className="uppercase">
              KINESTRETCH
            </Typography>
            <Typography variant="h3" color="white" className="uppercase">
              Ingresar
            </Typography>
          </CardHeader>

          <CardBody className="flex flex-col gap-4">
            <Input
              type="text"
              label="Usuario o Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="relative">
              {" "}
              {/* Contenedor relativo para el input y el ícono */}
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6" />
                )}
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="bg-blue-gray-200 hover:bg-blue-gray-300"
              fullWidth
              onClick={handleSubmit}
            >
              Iniciar Sesion
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Olvidaste tu Password?
              <Link to="/olvide-password">
                <Typography
                  as="span"
                  variant="small"
                  className="ml-1 font-bold text-blue-gray-200"
                >
                  Recuperar
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
        <Cargando />
      </div>
    </>
  );
}

export default SignIn;
