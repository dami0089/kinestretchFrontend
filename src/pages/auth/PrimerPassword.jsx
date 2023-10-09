import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import fondo from "../../../public/img/DSC_4871.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clienteAxios from "@/configs/clinteAxios";

export function PrimerPassword() {
  const params = useParams();
  const [tokenValido, setTokenValido] = useState(false);
  const { token } = params;
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const navigate = useNavigate();
  const [passwordModificado, setPasswordModificado] = useState(false);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/crear-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        toast.error(error.response.data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async () => {
    if (password != repetirPassword) {
      toast.error("Las contraseñas no coinciden", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (password.length < 6) {
      toast.error("El password es muy corto, minimo 6 caracteres", {
        position: "top-right",
        autoClose: 3000,
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
      const url = `/usuarios/crear-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });

      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPasswordModificado(true);
      setPassword("");
      setRepetirPassword("");
      setCheck(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 3000,
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
    <>
      <img
        src={fondo}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <ToastContainer pauseOnFocusLoss={false} />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Configura tu Contraseña
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Password"
              size="lg"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Repetir Password"
              size="lg"
              value={repetirPassword}
              type="password"
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
            <div className="-ml-2.5">
              <Checkbox
                label="Acepto el reglamento del coworking"
                value={check}
                onChange={(e) => setCheck(!check)}
              />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit}>
              Sign Up
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default PrimerPassword;
