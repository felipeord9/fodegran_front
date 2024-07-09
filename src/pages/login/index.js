import { useState, useCallback, useEffect } from "react";
import Navbar from "../../components/Navbar";
import User from '../../assets/user.png'
import * as Bs from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import './styles.css'

export default function Login(){
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false)
    const [ remember, setRemember ] = useState(false)

    const [ credenciales , setCRedenciales ] = useState({
        user:'',
        pass:''
    })
    const change = (e) =>{
        const { id, value } = e.target;
        setCRedenciales({
            ...credenciales,
            [id]:value
        })
    }

    useEffect(()=>{
        const user = (localStorage.getItem('user'))
        const pass = (localStorage.getItem('pass'))
        if(user && pass){
            setEmail(JSON.parse(user))
            setPassword(JSON.parse(pass))
            setRemember(true)
        }
    },[])

    const handleRemember = (e) => {
        setRemember(remember === false ? true:false);
        if(remember === false && email !== '' && password !=='' ){
            localStorage.setItem('user',JSON.stringify(email))
            localStorage.setItem('pass',JSON.stringify(password))
        }else if(remember === true){
            localStorage.removeItem('user')
            localStorage.removeItem('pass')
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
                    <div className="w-100 d-flex justify-content-center align-items-center">
                        <img src={User} style={{width:90 , userSelect:'none'}}/>
                    </div>

                    <div className="input-container mt-3" >
                        <FontAwesomeIcon icon={faUser} className="icon" />
                        <input id="email" value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className="input-with-icon" placeholder="Username" />
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

                    <div className="d-flex flex-row">
                        <FormGroup>
                            <FormControlLabel checked={remember} onChange={(e)=>handleRemember(e)} control={<Checkbox color="default" />} label="Recordarme" style={{color:'grey'}} />
                        </FormGroup>
                    </div>

                    <div className="d-flex w-100 justify-content-center align-items-center mt-0 pt-0">
                        <label><a href='/send/recovery' className='text-decoration-none' style={{fontSize:'medium'}}>¿Olvidaste tu constraseña?</a></label>
                    </div>

                    <div className="d-flex w-100 justify-content-center align-items-center mt-2">
                        <button className="bt-login" style={{color:'white',borderRadius:10}} >INGRESAR</button>
                    </div>

                </div>
            </div>  
        </div>  
    )
}