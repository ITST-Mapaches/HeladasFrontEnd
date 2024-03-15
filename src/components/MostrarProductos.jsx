import axios from "axios";
import React, { useEffect, useState } from "react";
import EliminarProducto from "./EliminarProducto";
import ActualizarProducto from "./ActualizarProducto";
import AgregarProducto from "./AgregarProducto";
import BaseURL from "./urlBase";

export default function MostrarProductos() {
  //url donde se encuentra el endpoint de mostrar las paletas
  const urlBase = BaseURL();

  //Esto se utiliza para almacenar y actualizar la lista de paletas recuperadas del endpoint.
  //paletas es el array y setPaletas se usa para actualizarlo
  const [paletas, setPaletas] = useState([]);

  //se ejecuta cuando se carga la app, una sola vez
  useEffect(() => {
    cargarProductos();
  }, []);

  //! peticion al endpoint mediante axios para recuperar las paletas
  const cargarProductos = async () => {
    const resultado = await axios.get(urlBase + "mostrar");
    //actualizamos las paletas
    setPaletas(resultado.data);
  };

  return (
    <>
      {/* componente para agregar un producto */}
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
            {/* recorremos el arreglo, retornando cada paleta envuelta en una línea de una tabla */}
            {paletas.map((paleta) => (
              <tr
                key={paleta.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">#{paleta.id}</td>
                <td className="px-6 py-4">{paleta.nombre}</td>
                <td className="px-6 py-4">{paleta.descripcion}</td>
                <td className="px-6 py-4">{paleta.cantidad} pz</td>
                <td className="px-6 py-4">${paleta.precio}</td>
                <td className="px-6 py-4">
                  {/* componente para actualizar producto */}
                  <ActualizarProducto
                    idPaleta={paleta.id}
                    cargarProductos={cargarProductos}
                    />
                    {/* componente para eliminar producto */}
                  <EliminarProducto
                    idPaleta={paleta.id}
                    cargarProductos={cargarProductos}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
