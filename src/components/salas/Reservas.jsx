import React, { useState } from "react";
import Calendar from "react-calendar";

const Reservas = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [reservas, setReservas] = useState([
    { hora: "9:00 AM", usuario: "Juan" },
    { hora: "10:00 AM", usuario: "María" },
    { hora: "11:00 AM", usuario: "Pedro" },
  ]);
  const [nuevaReserva, setNuevaReserva] = useState({
    hora: "",
    usuario: "",
  });

  const handleFechaSeleccionada = (fecha) => {
    setFechaSeleccionada(fecha);
  };

  const handleNuevaReserva = (e) => {
    e.preventDefault();
    setReservas([...reservas, nuevaReserva]);
    setNuevaReserva({ hora: "", usuario: "" });
  };

  const handleNuevaReservaHora = (e) => {
    setNuevaReserva({ ...nuevaReserva, hora: e.target.value });
  };

  const handleNuevaReservaUsuario = (e) => {
    setNuevaReserva({ ...nuevaReserva, usuario: e.target.value });
  };

  return (
    <div className="mx-auto max-w-lg p-4">
      <h1 className="mb-4 text-3xl font-bold">Reservas</h1>
      <Calendar
        className="mb-4 rounded border p-2"
        onChange={handleFechaSeleccionada}
        value={fechaSeleccionada}
      />
      <h2 className="mb-2 text-xl font-bold">
        Reservas para el {fechaSeleccionada.toLocaleDateString()}
      </h2>
      {reservas.length > 0 ? (
        <ul className="mb-4 rounded border p-2">
          {reservas.map((reserva) => (
            <li key={reserva.hora} className="mb-2">
              {reserva.hora} - {reserva.usuario}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay reservas para esta fecha.</p>
      )}
      <h2 className="mb-2 text-xl font-bold">Crear nueva reserva</h2>
      <form onSubmit={handleNuevaReserva} className="mb-4 rounded border p-2">
        <label className="mb-2 block">
          Hora:
          <input
            type="text"
            className="w-full rounded border p-2"
            value={nuevaReserva.hora}
            onChange={handleNuevaReservaHora}
          />
        </label>
        <label className="mb-2 block">
          Usuario:
          <input
            type="text"
            className="w-full rounded border p-2"
            value={nuevaReserva.usuario}
            onChange={handleNuevaReservaUsuario}
          />
        </label>
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
        >
          Crear reserva
        </button>
      </form>
    </div>
  );
};

export default Reservas;
