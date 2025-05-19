import { useState, useCallback, useEffect , useContext } from "react";
import Navbar from "../../components/NavBeneficiarios";
import User from '../../assets/user.png'
import { FaLock } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import useUser from "../../hooks/useUser";
import AuthContext from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { GiSandsOfTime } from "react-icons/gi";
import './styles.css'

export default function LoginOdontologia(){
    const { login, isLoginLoading, hasLoginError, isLogged } = useUser();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [ entrando , setEntrando ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false)

    useEffect(() => {
        if (isLogged && user.role==='admin') navigate('/bitacora')
        /* if (isLogged && user.role==='odontologa' ||
            isLogged && user.role==='contabilidad' ||
            isLogged && user.role==='recursos humanos' ||
            isLogged && user.role==='auxiliar'
        )navigate('/bitacora'); */
        if (isLogged && user.role==='odontologa') navigate('/registros/odontologia')
    }, [isLogged, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setEntrando(true);
        if(email !== '' && password !== ''){
            login({ email, password });
            setEntrando(false)
        }else{
            setEntrando(false)
            Swal.fire({
                title:'¡Atención!',
                text:'Debes de ingresar tu Username y tu contraseña para poder ingresar.',
                showConfirmButton:true,
                confirmButtonColor:'green'
            }) 
        }
    };
  
    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(!showPassword);
    });

    const handleChange = useCallback((e) => {
        const { value } = e.target;
        setPassword(value);
    });
      
    return(
        <div>
            <Navbar/>
            <div className="d-flex justify-content-center align-items-center h-100 w-100 m-auto">
                <div
                    className="center-container soli border border-4 shadow rounded-4 m-auto "
                    style={{ maxWidth: 850 , backgroundColor: 'whitesmoke'}}
                >   
                <form onSubmit={handleLogin}>
                    <div className="w-100 d-flex justify-content-center align-items-center">
                        <img src={User} style={{width:90 , userSelect:'none'}}/>
                    </div>

                    <div className="input-container mt-3" >
                        <FontAwesomeIcon icon={faUser} className="icon" />
                        <input id="email" value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className="input-with-icon" placeholder="Username" required />
                    </div>

                    <div className="d-flex align-items-center input-container mt-2">
                        <span
                            className="icon"
                            onClick={togglePasswordVisibility}
                            style={{ left: 10, cursor: "pointer"}}
                        >
                            <FaLock />
                        </span>
                        <input
                            id={password}
                            type={showPassword ? "text" : "password"}
                            className=" input-with-icon"
                            onChange={handleChange}
                            style={{ paddingRight: 33 }}
                            placeholder="⁕⁕⁕⁕⁕⁕⁕⁕⁕⁕"
                            minLength={8}
                            autoComplete="off"
                            required
                        />
                        <span
                            className="icon"
                            onClick={togglePasswordVisibility}
                            style={{ right: 10, cursor: "pointer" }}
                        >
                            {showPassword ? <IoEye /> : <IoEyeOff />}
                        </span>
                    </div>

                    {/* <div className="d-flex flex-row">
                        <FormGroup>
                            <FormControlLabel checked={remember} onChange={(e)=>handleRemember(e)} control={<Checkbox color="default" />} label="Recordarme" style={{color:'grey'}} />
                        </FormGroup>
                    </div> */}

                    <div className="d-flex w-100 justify-content-center align-items-center mt-0 pt-3">
                        <label><a href='/send/recovery' className='text-decoration-none' style={{fontSize:'medium'}}>¿Olvidaste tu constraseña?</a></label>
                    </div>

                    <div className="d-flex w-100 justify-content-center align-items-center mt-3">
                        <button className="bt-login" onSubmit={(e)=>handleLogin(e)} style={{color:'white',borderRadius:10}} >
                            {entrando ? <strong>INGRESANDO... <GiSandsOfTime /></strong>:<strong>INGRESAR</strong>}
                        </button>
                    </div>
                    {hasLoginError && (
                        <div className="text-danger text-center mt-2">
                            Usuario o contraseña incorrectos
                        </div>
                    )}
                </form>
                </div>
            </div>  
        </div>  
    )
}