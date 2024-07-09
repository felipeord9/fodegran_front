import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2'
import * as Bs from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function ModalSolicitud({
  selectedCredito,
  setSelectedCredito,
  showModal,
  setShowModal,
}) {
  const [info, setInfo] = useState({});

  useEffect(()=>{
    if(selectedCredito){
      setInfo(selectedCredito)
    }
  },[])

  return (
    <div className="wrapper d-flex justify-content-center align-content-center" style={{userSelect:'none'}}>
    <Modal show={showModal} style={{ fontSize: 18, userSelect:'none' }} centered>
      <Modal.Header>
        <center>
        <Modal.Title className="text-danger" style={{fontSize:40}}>
          <strong>Detalles de la solicitud</strong>
        </Modal.Title>
        </center>
      </Modal.Header>
      <Modal.Body className="p-2">
        <div className="m-2 h-100">
          <form >
            <div className="d-flex w-100 flex-row">
              <div className="d-flex flex-column me-2 w-75">
                <label className="fw-bold">ID</label>
                <input
                  id="rowId"
                  type="number"
                  value={info.rowId}
                  className="form-control form-control-sm"
                  disabled
                  /* onChange={handleChange} */
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="d-flex flex-column w-100 mt-2">
                <label className="fw-bold">Nombre</label>
                <textarea
                  id="nombre"
                  type="text"
                  value={info.nombre}
                  className="form-control form-control-sm"
                  disabled
                  /* onChange={handleChange} */
                  autoComplete="off"
                  required
                />
              </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
      <form>
        <div className="d-flex justify-content-center gap-0 mt-2 ">
              <Button variant="secondary" onClick={(e) => {
                setShowModal(false)
                setSelectedCredito('')
              }}>
                Salir
              </Button>
            </div>
            </form>
      </Modal.Footer>
    </Modal>
    </div>
  );
}
