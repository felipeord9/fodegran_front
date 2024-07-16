import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2'
import { createFuncionario , updateFuncionario } from "../../services/funcionarioService";
import './styles.css'

export default function ModalNewFuncionario({
  empleado,
  setEmpleado,
  showModal,
  setShowModal,
  reloadInfo,
}) {
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
    if(id==='rowId'){
      if(/^\d*$/.test(value)){
        setInfo({
          ...info,
          [id]: value,
        });
      }
    }else{
      setInfo({
        ...info,
        [id]: value,
      });
    }
  };

  const handleCreateNewFuncionario = (e) => {
    e.preventDefault();
    createFuncionario(info)
      .then((data) => {
        setShowModal(!showModal)
        reloadInfo();
        Swal.fire({
          title: '¡Correcto!',
          text: 'El funcionario se ha registrado correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500
        })
        cleanForm()
      })
      .catch((error) => {
        setError(error.response.data.errors.original.detail)
        setTimeout(() => setError(''), 2500)
      });
  };

  const handleUpdateFuncionario = (e) => {
    e.preventDefault();
    updateFuncionario(empleado.id, info)
      .then((data) => {
        cleanForm()
        setShowModal(!showModal)
        reloadInfo();
        Swal.fire({
          title: '¡Correcto!',
          text: 'El usuario se ha actualizado correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500
        })
      })
      .catch((error) => {
        setError(error.response.data.errors.original.detail)
        setTimeout(() => setError(''), 2500)
      });
  };

  const cleanForm = () => {
    setInfo({
      rowId: "",
      name: "",
      email: "",
    })
  }

  return (
    <Modal show={showModal} style={{ fontSize: 11 }} centered>
      <Modal.Header>
        <Modal.Title 
          className="d-flex justify-content-center align-items-center w-100 fw-bold" 
          style={{fontSize:27,color:'#0101b5'}}
        >
          {empleado ? "Actualizar" : "Registrar"} funcionario
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={empleado ? handleCreateNewFuncionario : handleUpdateFuncionario}>
      <Modal.Body className="p-2" style={{fontSize:15}}>
        <div className="container h-100">
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
                  value={info.name.toUpperCase()}
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
        </div>
      </Modal.Body>
      <Modal.Footer>
            <div className="d-flex justify-content-end gap-2 mt-0">
              <Button 
                className="bt-envio" type="submit" 
                style={{backgroundColor:'#0101b5',color:'white' , borderColor:'#0101b5'}}
              >
                {empleado ? "Guardar Cambios" : "Registrar"}
              </Button>
              <Button 
                className="bt-cancel h-100 d-flex" 
                style={{backgroundColor:'red',color:'white', borderColor:'red'}} 
                onClick={(e) => {
                setShowModal(false)
                cleanForm()
                setEmpleado(null)
              }}>
                Cerrar
              </Button>
            </div>
      </Modal.Footer>
      </form>
    </Modal>
  );
}
