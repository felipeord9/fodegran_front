import { useState, useEffect , useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2'
import AuthContext from "../../context/authContext";

export default function ModalFuncionario({
  empleado,
  setEmpleado,
  showModal,
  setShowModal,
  reloadInfo,
}) {
  const { user } = useContext(AuthContext);
  const [info, setInfo] = useState({
    rowId: "",
    name: "",
    email: "",
  });
  const [error, setError] = useState('')
 
  useEffect(() => {
    if(empleado) {
      setInfo({
        rowId: empleado?.rowId,
        name: empleado?.name,
        email: empleado?.email,
      })
    }
  }, [empleado])

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo({
      ...info,
      [id]: value,
    });
  };

  const cleanForm = () => {
    setInfo({
      rowId: "",
      name: "",
      email: "",
      password: "",
      role: "",
    })
  }

  return (
    <Modal show={showModal} style={{ fontSize: 11 }} centered>
      <Modal.Header>
        <Modal.Title className="text-danger">
          Información empleado
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-2">
        <div className="container h-100">
          <form >
            <div>
              <div>
                <label className="fw-bold">Número de identificación</label>
                <input
                  id="rowId"
                  type="text"
                  value={info.rowId}
                  className="form-control form-control-sm"
                  maxLength={10}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label className="fw-bold">Nombre</label>
                <input
                  id="name"
                  type="text"
                  value={info.name}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label className="fw-bold">Correo</label>
                <input
                  id="email"
                  type="email"
                  value={info.email}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="d-flex w-100 mt-2">
              <span 
                className="text-center text-danger w-100 m-0"
                style={{height: 15}}
              >
                {error}
              </span>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4">
              {/* <Button type="submit" variant="success">
                {user ? "Guardar Cambios" : "Guardar"}
              </Button> */}
              <Button variant="secondary" onClick={(e) => {
                setShowModal(false)
                cleanForm()
                setEmpleado(null)
              }}>
                Cerrar
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
