import axios from "axios";
import { Modal } from "flowbite-react";
import React, { useState } from "react";

export default function ActualizarProducto({ idPaleta, cargarProductos  }) {
  const [openModal, setOpenModal] = useState(false);

  //url donde se encuentra el endpoint de mostrar las paletas
  const urlBase = "http://localhost:8080/paletas/";

  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    cantidad: "",
  });

  const buscar = async (idPaleta) => {
    const resultado = await axios.get(urlBase + "buscar/" + idPaleta);

    setFormulario(resultado.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultado = await axios.put(
        urlBase + "actualizar/" + idPaleta,
        formulario
      );

      cargarProductos();

      console.log(resultado.data);
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      // Manejar errores de forma adecuada
    }
  };

  return (
    <>
      <button
        onClick={() => {
          buscar(idPaleta);
          setOpenModal(true);
        }}
        type="button"
        class="text-white block mx-auto bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 active:scale-95"
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
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Actualizar producto
          </h3>
          <div className="text-center">
            <form class="p-4 md:p-5" onSubmit={handleSubmit}>
              <div class="grid gap-4 mb-4 grid-cols-2">
                <div class="col-span-2">
                  <label
                    for="nombre"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre
                  </label>
                  <input
                    name="nombre"
                    id="nombre"
                    value={formulario["nombre"]}
                    onChange={handleChange}
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required=""
                  />
                </div>
                <div class="col-span-2">
                  <label
                    for="descripcion"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Descripcion
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={formulario["descripcion"]}
                    onChange={handleChange}
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></textarea>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="precio"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Precio
                  </label>
                  <input
                    value={formulario["precio"]}
                    onChange={handleChange}
                    type="number"
                    name="precio"
                    id="precio"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required=""
                  />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="cantidad"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Cantidad
                  </label>
                  <input
                    value={formulario["cantidad"]}
                    onChange={handleChange}
                    type="number"
                    name="cantidad"
                    id="cantidad"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required=""
                  />
                </div>
              </div>
              <div className="flex">
                <button
                  type="submit"
                  class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 active:scale-95"
                >
                  Actualizar producto
                </button>
                <button
                  onClick={() => setOpenModal(false)}
                  className="text-white block mx-auto bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 active:scale-95"
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
