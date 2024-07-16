import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useUser from '../../hooks/useUser';
import Navbar from '../../components/Navbar';
import { sendRecovery } from '../../services/authService';
import Logo from '../../assets/fodegran.jpeg'
import { GiSandsOfTime } from "react-icons/gi";
import { RiArrowGoBackFill } from "react-icons/ri";
import './styles.css'

export default function SendRecoveryPassword() {
  const { isLogged } = useUser()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [ enviando , setEnviando ] = useState(false);

  useEffect(() => {
    if (isLogged) navigate('/inicio');
  }, [isLogged, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviando(true)
    sendRecovery(email)
      .then((data) => {
        setEnviando(false)
        Swal.fire({
          title: "¡CORECTO!",
          text: "El correo de recuperación fue enviado de manera exitosa",
          icon: 'success',
          confirmButtonText: "Aceptar",
          confirmButtonColor:'green'
        })
        navigate('/login')
      })
      .catch((error) => {
        setEnviando(false)
        Swal.fire({
          icon:'error',
          title:'¡ERROR!',
          text:'Este correo no lo tenemos registrado en nuestra base de datos. Verifícalo y vuelve a intentarlo.',
          timer:6000,
          showConfirmButton:false
        })
      })
  }

  return (
    <div>
      <Navbar/>
      <div className="d-flex justify-content-center align-items-center h-100 w-100 m-auto">
        <div
          className="center-container soli border border-4 shadow rounded-4 m-auto "
          style={{ maxWidth: 850 , backgroundColor: 'whitesmoke'}}
        >           
          <form className='container d-flex gap-3' style={{fontSize: 13.5}} onSubmit={handleSubmit}>
            <div className='row'>
              <div className="logo-soli col col-12 col-lg-6 col-md-12 mb-2">
                <img src={Logo} className="w-100 h-100 shadow" alt="logo" />
              </div>
              <div className='col col-12 col-lg-6 col-md-12'>
                <h4 className='fw-bold mt-3 d-flex w-100 justify-content-center'>Validación de correo</h4>
                <label className='fw-bold w-100'>Correo electrónico</label>
                <input
                  type='email'
                  value={email}
                  className='form-control form-control-sm shadow-sm mb-3'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type='submit'
                  className='text-light btn btn-sm w-100' 
                  style={{ backgroundColor: '#0101b5'}}
                >
                  {enviando ? <strong>Enviando... <GiSandsOfTime /></strong>:<strong>Obtener token de recuperación</strong>}
                </button>
                <span className='text-center text-danger text-rowrap w-100 m-0 my-2' style={{height: 0}}>{error.message}</span>
                <Link 
                  to="/login" style={{fontSize:'medium'}} 
                  className='text-decoration-none text-center mt-3 w-100 d-flex justify-content-center align-items-center'
                >
                  <RiArrowGoBackFill className="me-1" />Volver al login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}