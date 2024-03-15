import axios from "axios";
import { Modal } from "flowbite-react";
import React, { useState } from "react";
import BaseURL from "./urlBase";

export default function ActualizarProducto({ idPaleta, cargarProductos }) {
  const [openModal, setOpenModal] = useState(false);

  //url donde se encuentra el endpoint de mostrar las paletas
  const urlBase = BaseURL();

  //declara un estado para guardar los datos del formulario y setFormulario lo actualiza
  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    cantidad: "",
  });

  //hace una peticion para buscar el producto por su id
  const buscar = async () => {
    const resultado = await axios.get(urlBase + "buscar/" + idPaleta);

    //actualiza los datos del formulario
    setFormulario(resultado.data);
  };

  //funcion para actualizar un producto
  const actualizarProducto = async (e) => {
    //permite evitar que la patiga se recarge al enviar la informacion al endpoint
    e.preventDefault();

    try {
      //envia al endpoint la información del formulario
      const resultado = await axios.put(
        urlBase + "actualizar/" + idPaleta,
        formulario
      );

      //actualiza el estado de las paletas para mostrar el producto actualizado
      cargarProductos();

      //oculta el modal
      setOpenModal(false);
      //actualiza el estado donde se guarda los datos del formulario
      setFormData({
        nombre: "",
        descripcion: "",
        precio: "",
        cantidad: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  //actualiza el estado de los valores del formulario cuando el usuario ingresa nuevos
  //valores
  const actualizarEstadoForm = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  return (
    <>
      <button
        onClick={() => {
          buscar(idPaleta);
          setOpenModal(true);
        }}
        type="button"
        className="text-white block mx-auto bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 active:scale-95"
      >
        Actualizar
      </button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Actualizar producto
          </h3>
          <div className="text-center">
            <form className="p-4 md:p-5" onSubmit={actualizarProducto}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    for="nombre"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre
                  </label>
                  <input
                    name="nombre"
                    id="nombre"
                    value={formulario["nombre"]}
                    onChange={actualizarEstadoForm}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required=""
                  />
                </div>
                <div className="col-span-2">
                  <label
                    for="descripcion"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Descripcion
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={formulario["descripcion"]}
                    onChange={actualizarEstadoForm}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></textarea>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    for="precio"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Precio
                  </label>
                  <input
                    value={formulario["precio"]}
                    onChange={actualizarEstadoForm}
                    type="number"
                    min={2}
                    name="precio"
                    id="precio"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required=""
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    for="cantidad"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Cantidad
                  </label>
                  <input
                    value={formulario["cantidad"]}
                    onChange={actualizarEstadoForm}
                    type="number"
                    min={2}
                    name="cantidad"
                    id="cantidad"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required=""
                  />
                </div>
              </div>
              <div className="flex justify-around">
                <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 active:scale-95"
                >
                  Actualizar producto
                </button>
                <button
                  onClick={() => setOpenModal(false)}
                  className="text-white block bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 active:scale-95"
                  type="button"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
