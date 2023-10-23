import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

import React, { useEffect } from "react";
import { projectsTableData } from "@/data";
import { useNavigate } from "react-router-dom";
import useSedes from "@/hooks/useSedes";

const TarjetasSede = () => {
  const { obtenerSedes, sedes, idVerSede, setIdVerSede } = useSedes();

  useEffect(() => {
    const obtenerInfo = async () => {
      await obtenerSedes();
    };
    obtenerInfo();
  }, []);

  const navigate = useNavigate();

  const handleVer = (e, id) => {
    e.preventDefault();
    setIdVerSede(id);
    navigate("/sedes/profile-sede");
  };

  const svgs = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-barbell"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M2 12h1"></path>
      <path d="M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2"></path>
      <path d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z"></path>
      <path d="M9 12h6"></path>
      <path d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z"></path>
      <path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2"></path>
      <path d="M22 12h-1"></path>
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-stretching"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M16 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
      <path d="M5 20l5 -.5l1 -2"></path>
      <path d="M18 20v-5h-5.5l2.5 -6.5l-5.5 1l1.5 2"></path>
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-building-estate"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M3 21h18"></path>
      <path d="M19 21v-4"></path>
      <path d="M19 17a2 2 0 0 0 2 -2v-2a2 2 0 1 0 -4 0v2a2 2 0 0 0 2 2z"></path>
      <path d="M14 21v-14a3 3 0 0 0 -3 -3h-4a3 3 0 0 0 -3 3v14"></path>
      <path d="M9 17v4"></path>
      <path d="M8 13h2"></path>
      <path d="M8 9h2"></path>
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-building-pavilion"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M3 21h7v-3a2 2 0 0 1 4 0v3h7"></path>
      <path d="M6 21l0 -9"></path>
      <path d="M18 21l0 -9"></path>
      <path d="M6 12h12a3 3 0 0 0 3 -3a9 8 0 0 1 -9 -6a9 8 0 0 1 -9 6a3 3 0 0 0 3 3"></path>
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-smart-home"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M19 8.71l-5.333 -4.148a2.666 2.666 0 0 0 -3.274 0l-5.334 4.148a2.665 2.665 0 0 0 -1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-7.2c0 -.823 -.38 -1.6 -1.03 -2.105"></path>
      <path d="M16 15c-2.21 1.333 -5.792 1.333 -8 0"></path>
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-window"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 3c-3.866 0 -7 3.272 -7 7v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1 -1v-10c0 -3.728 -3.134 -7 -7 -7z"></path>
      <path d="M5 13l14 0"></path>
      <path d="M12 3l0 18"></path>
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-building"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M3 21l18 0"></path>
      <path d="M9 8l1 0"></path>
      <path d="M9 12l1 0"></path>
      <path d="M9 16l1 0"></path>
      <path d="M14 8l1 0"></path>
      <path d="M14 12l1 0"></path>
      <path d="M14 16l1 0"></path>
      <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"></path>
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-building-castle"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M15 19v-2a3 3 0 0 0 -6 0v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-14h4v3h3v-3h4v3h3v-3h4v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
      <path d="M3 11l18 0"></path>
    </svg>,
  ];

  const getRandomSVG = () => {
    const randomIndex = Math.floor(Math.random() * svgs.length);
    return svgs[randomIndex];
  };

  return (
    <>
      <Typography className="mb-10 ml-2 mt-10 text-xl font-bold uppercase">
        Sedes
      </Typography>

      <div className="mb-4 mt-10 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {sedes.map(({ _id, nombre, direccion, localidad, provincia }) => (
          <div
            key={_id}
            onClick={(e) => handleVer(e, _id)}
            className="flex h-[70px] w-full max-w-[500px] transform items-center justify-start rounded-[20px] border bg-[#ffffff] shadow-sm backdrop-blur-[10px] transition-transform duration-500 ease-in-out hover:scale-105 hover:cursor-pointer"
          >
            <div className="transition-background ml-[10px] h-[50px] w-[50px] rounded-[10px] bg-gradient-to-b from-[#d7cfcf] to-[#9198e5] duration-500 ease-in-out hover:from-[#9198e5] hover:to-[#712020]">
              {getRandomSVG()}
            </div>
            <div className="font-poppins ml-[10px] flex-grow text-black">
              <p className="text-ms font-light">{nombre}</p>
              <p className="text-xs font-light">{direccion}</p>
              <p className="text-xs font-light">{localidad}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TarjetasSede;
