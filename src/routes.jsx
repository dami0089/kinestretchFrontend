import { HomeIcon, CalendarIcon, UserIcon } from "@heroicons/react/24/solid";
// import { Home, Profile, Tables, Notifications } from "@/pages/inicio";

import RutaProtegida from "@/layouts/RutaProtegida";

import { Clientes } from "@/pages/inicio/clientes";

import { Home } from "./pages/inicio";
import Profesores from "./pages/inicio/profesores";
import Sedes from "./pages/inicio/sedes";
import Clases from "./pages/inicio/clases";
import Terminos from "./pages/inicio/terminos";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "inicio",
    pages: [
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-home-2"
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
            <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
            <path d="M10 12h4v4h-4z"></path>
          </svg>
        ),
        name: "inicio",
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    layout: "clientes",
    pages: [
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-users"
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
            <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
          </svg>
        ),
        name: "Clientes",
        path: "/",
        element: <Clientes />,
      },
    ],
  },
  {
    layout: "profesores",
    pages: [
      {
        icon: (
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
          </svg>
        ),
        name: "Profesores",
        path: "/",
        element: <Profesores />,
      },
    ],
  },
  {
    layout: "sedes",
    pages: [
      {
        icon: (
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
          </svg>
        ),
        name: "Sedes",
        path: "/",
        element: <Sedes />,
      },
    ],
  },
  {
    layout: "clases",
    pages: [
      {
        icon: (
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
          </svg>
        ),
        name: "Clases",
        path: "/",
        element: <Clases />,
      },
    ],
  },
  {
    layout: "terminos-condiciones",
    pages: [
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="24"
            height="24"
          >
            <path
              fill="currentColor"
              d="M14.63 7L13 3h1V2H9V1H8v1H3v1h1L2.38 7H2v1h.15c.156.498.473.93.9 1.23a2.47 2.47 0 0 0 2.9 0A2.44 2.44 0 0 0 6.86 8H7V7h-.45L4.88 3H8v8H6l-.39.18l-2 2.51l.39.81h9l.39-.81l-2-2.51L11 11H9V3h3.13l-1.67 4H10v1h.15a2.48 2.48 0 0 0 4.71 0H15V7zM5.22 8.51a1.5 1.5 0 0 1-.72.19a1.45 1.45 0 0 1-.71-.19A1.5 1.5 0 0 1 3.25 8h2.5a1.5 1.5 0 0 1-.53.51M5.47 7h-2l1-2.4zm5.29 5L12 13.5H5L6.24 12zm1.78-7.38l1 2.4h-2zm.68 3.91a1.4 1.4 0 0 1-.72.19a1.35 1.35 0 0 1-.71-.19a1.55 1.55 0 0 1-.54-.53h2.5a1.37 1.37 0 0 1-.53.53"
            />
          </svg>
        ),
        name: "Terminos",
        path: "/",
        element: <Terminos />,
      },
    ],
  },
];

export default routes;
