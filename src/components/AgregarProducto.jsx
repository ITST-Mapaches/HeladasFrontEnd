import axios from "axios";
import { Modal } from "flowbite-react";
import React, { useState } from "react";

export default function AgregarProducto({ cargarProductos }) {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    cantidad: "",
  });

  const urlBase = "http://localhost:8080/paletas/";

  const agregar = async (e) => {
    e.preventDefault();
    try {
      await axios.post(urlBase + "agregar", formData);
      cargarProductos();
      setOpenModal(false);
      setFormData({
        nombre: "",
        descripcion: "",
        precio: "",
        cantidad: "",
      });
    } catch (error) {
      console.error(error);
      // Manejar errores de forma adecuada
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <button
        onClick={() => {
          setOpenModal(true);
        }}
        type="button"
        className="text-white block mx-auto bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-7 active:scale-95"
      >
        Agregar
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
            Agregar producto
          </h3>
          <div className="text-center">
            <form className="p-4 md:p-5" onSubmit={agregar}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="nombre"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre
                  </label>
                  <input
                    name="nombre"
                    id="nombre"
                    type="text"
                    placeholder="Nombre de producto"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="descripcion"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    rows="4"
                    placeholder="Descripción de producto"
                    value={formData.descripcion}
                    onChange={handleChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></textarea>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="precio"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Precio
                  </label>
                  <input
                    name="precio"
                    id="precio"
                    type="number"
                    placeholder="Precio"
                    min={2}
                    value={formData.precio}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="cantidad"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Cantidad
                  </label>
                  <input
                    name="cantidad"
                    id="cantidad"
                    type="number"
                    placeholder="Cantidad"
                    min={2}
                    value={formData.cantidad}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>
              </div>
              <div className="flex">
                <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 active:scale-95"
                >
                  Agregar producto
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
