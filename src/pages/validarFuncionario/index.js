import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import NavBitacora from '../../components/NavBitacora';
import Logo from '../../assets/fodegran2.jpeg'
import ModalFuncionario from '../../components/ModalFuncionario';
import { GiSandsOfTime } from "react-icons/gi";
import { findOneFuncionario } from '../../services/funcionarioService';
import './styles.css'

export default function ValidarFuncionario() {
  const [info, setInfo] = useState({
    cedula:''
  })
  const [ empleado , setEmpleado ] = useState({})
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [ enviando , setEnviando ] = useState(false);

  const [ showModal, setShowModal ] = useState(false);

  const handleCedula = (e) => {
    const { id, value } = e.target;
    if(id==='cedula'){
      if(/^\d*$/.test(value)){
        setInfo({
          ...info,
          [id]:value
        })
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviando(true)
    if(info.cedula !== ''){
      findOneFuncionario(info.cedula)
      .then(({data})=>{
        setEnviando(true)
        setEmpleado(data)
        showModal(true)
      })
      .catch(()=>{
        setEnviando(true)
        Swal.fire({
          icon:'error',
          title:'¡ERROR!',
          text:`La persona con número de identificación: ${info.cedula}, no se encuentra registrado en nuestra base de datos. `,
          timer:10000,
          showConfirmButton:false
        })
      })
    }else{
      setEnviando(true)
      Swal.fire({
        icon:'warning',
        title:'ATENCION!',
        text:`Debes especificar el número de identificación del empleado para poder hacer la busqueda.`,
        timer:10000,
        showConfirmButton:false
      })
    }
  }

  return (
    <div>
      <NavBitacora/>
      <div className="d-flex justify-content-center align-items-center h-100 w-100 m-auto">
        <div
          className="center-container soli border border-4 shadow rounded-4 m-auto "
          style={{ maxWidth: 850 , backgroundColor: 'whitesmoke'}}
        >           
        <ModalFuncionario 
          empleado={empleado}
          setEmpleado={setEmpleado}
          showModal={showModal}
          setShowModal={setShowModal}
        />
          <form className='container d-flex align-items-center justify-content-center' style={{fontSize: 13.5 }} onSubmit={handleSubmit}>
            <div className='row w-100 d-flex' >
              <div className="logo-soli col col-12 col-lg-6 col-md-12 mb-2 mt-2" >
                <img src={Logo} className="w-100 h-100 shadow" alt="logo" />
              </div>
              <div className='col col-12 col-lg-6 col-md-12'  >
                <h4 className='fw-bold mt-1 w-100 justify-content-center' style={{color:'#0101b5'}}>Validación de Empleado</h4>
                <label className='fw-bold w-100'>Número de identificación</label>
                <input
                  type='text'
                  id='cedula'
                  value={info.cedula}
                  autoComplete='off'
                  className='form-control form-control-sm shadow-sm mb-3 w-100 d-flex'
                  onChange={(e) => handleCedula(e)}
                  required
                />
                <button 
                  type='submit'
                  className='text-light btn btn-sm w-100 mb-2' 
                  style={{ backgroundColor: '#0101b5'}}
                >
                  {enviando ? <strong>Consultando... <GiSandsOfTime /></strong>:<strong>Consultar</strong>}
                </button>
                <span className='text-center text-danger text-rowrap w-100 m-0 my-2' style={{height: 0}}>{error.message}</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}