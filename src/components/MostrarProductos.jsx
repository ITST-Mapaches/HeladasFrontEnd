import axios from "axios";
import React, { useEffect, useState } from "react";
import EliminarProducto from "./EliminarProducto";
import ActualizarProducto from "./ActualizarProducto";
import AgregarProducto from "./AgregarProducto";

export default function MostrarProductos() {
  //url donde se encuentra el endpoint de mostrar las paletas
  const urlBase = "http://localhost:8080/paletas/";

  const [paletas, setPaletas] = useState([]);

  //se ejecuta cuando se carga la app, una sola vez
  useEffect(() => {
    cargarProductos();
  }, []);

  //peticion al endpoint mediante axios para recuperar las paletas
  const cargarProductos = async () => {
    const resultado = await axios.get(urlBase + "mostrar");
    setPaletas(resultado.data);
  };

  return (
    <>
      <AgregarProducto cargarProductos={cargarProductos} />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Descripción
              </th>
              <th scope="col" className="px-6 py-3">
                Cantidad
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {paletas.map((paleta) => (
              <tr
                key={paleta._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">#{paleta.id}</td>
                <td className="px-6 py-4">{paleta.nombre}</td>
                <td className="px-6 py-4">{paleta.descripcion}</td>
                <td className="px-6 py-4">{paleta.cantidad} pz</td>
                <td className="px-6 py-4">${paleta.precio}</td>
                <td className="px-6 py-4">
                  <ActualizarProducto idPaleta={paleta.id} cargarProductos={cargarProductos} />
                  <EliminarProducto idPaleta={paleta.id} cargarProductos={cargarProductos} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
