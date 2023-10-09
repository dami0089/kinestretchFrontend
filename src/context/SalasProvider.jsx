import clienteAxios from "@/configs/clinteAxios";
import React from "react";
import { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";

const SalasContext = createContext();

const SalasProvider = ({ children }) => {
  const [modalNuevaReserva, setModalNuevaReserva] = useState(false);
  const [modalRerservaCliente, setModalReservaCliente] = useState(false);
  const [idUsuarioReservaSala, setIdUsuarioReservaSala] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [fechaReserva, setFechaReserva] = useState("");
  const [horaReserva, setHoraReserva] = useState("");
  const [horafin, setHoraFin] = useState("");
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [modalDisponibilidad, setModalDisponibilidad] = useState(false);
  const [seleccionSala, setSeleccionSala] = useState(1);

  const handleModalNuevaReserva = () => {
    setModalNuevaReserva(!modalNuevaReserva);
  };
  const handleModalNuevaReservaCliente = () => {
    setModalReservaCliente(!modalRerservaCliente);
  };
  const handleModalDisponibilidad = () => {
    setModalDisponibilidad(!modalDisponibilidad);
  };

  const obtenerDisponibilidad = async (fecha, horaInicio, horaFin) => {
    const info = {
      fecha,
      horaInicio,
      horaFin,
    };
    console.log(info);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/salas/verificar-disponibilidad",
        info,
        config
      );
      console.log(data);
      setDisponibilidad(data);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevaReserva = async (fecha, horaInicio, horaFin, sala, id) => {
    const info = {
      fecha,
      horaInicio,
      horaFin,
      sala,
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post(`salas/crear-reserva/${id}`, info, config);

      toast.success("Reserva creada correctamente", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [reservasSalaMadrid, setReservasSalaMadrid] = useState([]);

  const obtenerSalaMadrid = async (fechaInicio) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/salas/reservas-sala-madrid",
        { fechaInicio },
        config
      );
      console.log(data);
      setReservasSalaMadrid(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [reservasSalaAmsterdam, setReservasSalaAmsterdam] = useState([]);

  const obtenerSalaAmsterdam = async (fechaInicio) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/salas/reservas-sala-amsterdam",
        { fechaInicio },
        config
      );
      setReservasSalaAmsterdam(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [reservasSalaParis, setReservasSalaParis] = useState([]);

  const obtenerSalaParis = async (fechaInicio) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/salas/reservas-sala-paris",
        { fechaInicio },
        config
      );

      setReservasSalaParis(data);
    } catch (error) {
      console.log(error);
    }
  };
  const [reservasSalaBsAs, setReservasSalaBsAs] = useState([]);

  const obtenerSalaBsAs = async (fechaInicio) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/salas/reservas-sala-bsas",
        { fechaInicio },
        config
      );

      setReservasSalaBsAs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [reservasSalaCabina, setReservasSalaCabina] = useState([]);

  const obtenerSalaCabina = async (fechaInicio) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/salas/reservas-sala-cabina",
        { fechaInicio },
        config
      );
      setReservasSalaCabina(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SalasContext.Provider
      value={{
        handleModalNuevaReserva,
        modalNuevaReserva,
        handleModalNuevaReservaCliente,
        modalRerservaCliente,
        idUsuarioReservaSala,
        setIdUsuarioReservaSala,
        fechaReserva,
        setFechaReserva,
        horaReserva,
        setHoraReserva,
        horafin,
        setHoraFin,
        disponibilidad,
        obtenerDisponibilidad,
        handleModalDisponibilidad,
        modalDisponibilidad,
        nombreUsuario,
        setNombreUsuario,
        nuevaReserva,
        reservasSalaMadrid,
        obtenerSalaMadrid,
        reservasSalaAmsterdam,
        obtenerSalaAmsterdam,
        reservasSalaParis,
        obtenerSalaParis,
        reservasSalaBsAs,
        obtenerSalaBsAs,
        reservasSalaCabina,
        obtenerSalaCabina,
        seleccionSala,
        setSeleccionSala,
      }}
    >
      {children}
    </SalasContext.Provider>
  );
};

export { SalasProvider };

export default SalasContext;
