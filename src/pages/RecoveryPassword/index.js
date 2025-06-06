import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import InputPassword from '../../components/InputPassword';
import useUser from '../../hooks/useUser';
import Navbar from '../../components/Navbar';
import { changeRecoveryPassword } from '../../services/authService';
import Logo from '../../assets/fodegran.jpeg'
import './styles.css'

export default function RecoveryPassword() {
    const { isLogged } = useUser()
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [errorInput, setErrorInput] = useState('')
    const { token } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      if (isLogged) navigate('/inicio');
    }, [isLogged, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault()
    if(newPassword !== confirmNewPassword) {
      setErrorInput('La contraseña nueva no coincide')
      return setTimeout(() => setErrorInput (''), 3000)
    }
    changeRecoveryPassword({token, newPassword})
      .then((data) => {
        Swal.fire({
          title: "¡CORECTO!",
          text: "La contraseña se ha cambiado exitosamente.",
          icon: 'success',
          confirmButtonText: "Aceptar",
          timer: 3000
        })
        navigate('/login')
      })
      .catch((error) => {
        setErrorInput('El token ha expirado, será redirigido al login')
        return setTimeout(() => navigate('/login'), 4000)
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
          <form className='d-flex container gap-3' style={{fontSize: 13.5}} onSubmit={handleSubmit}>
            <div className='row'>
              <div className="logo-soli col col-12 col-lg-6 col-md-12 mb-2">
                <img src={Logo} className="w-100 h-100 shadow" alt="logo" />
              </div>
              <div className='col col-12 col-lg-6 col-md-12'>
                <h4 className='fw-bold mt-1 d-flex w-100 justify-content-center'>Reestablecer contraseña</h4>
                <div>
                  <InputPassword
                    id="new-password"
                    label="Nueva Contraseña"
                    password={newPassword}
                    setPassword={setNewPassword}
                  />
                </div>
                <div>
                  <InputPassword
                    id="confirm-new-password"
                    label="Repite la Nueva Contraseña"
                    password={confirmNewPassword}
                    setPassword={setConfirmNewPassword}
                  />
                </div>
                <button 
                  type='submit'
                  className='text-light btn btn-sm mt-3 w-100' 
                  style={{ backgroundColor: '#0101b5'}}
                >
                  Recuperar contraseña
                </button>
              </div>
            </div>
          </form>
          <span className="text-center text-danger m-0 mt-2" style={{ fontSize: 13, height: 0 }}>{errorInput}</span>
        </div>
      </div>
    </div>
  )
}