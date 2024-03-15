import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function EliminarProducto({ idPaleta, cargarProductos }) {
  const [openModal, setOpenModal] = useState(false);

  //url donde se encuentra el endpoint de mostrar las paletas
  const urlBase = "http://localhost:8080/paletas/";

  const eliminar = async (idPaleta) => {
    const resultado = await axios.delete(urlBase + "eliminar/" + idPaleta);

    cargarProductos();
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="text-white block mx-auto bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 active:scale-95"
        type="button"
      >
        Eliminar
      </button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Estas seguro de que quieres eliminar este producto?
              <br />
              {idPaleta}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  eliminar(idPaleta);
                  setOpenModal(false);
                  refreshPage();
                }}
              >
                {"Sí, estoy seguro"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
