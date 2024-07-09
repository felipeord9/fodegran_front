import { useState } from "react";
import Swal from "sweetalert2";
import Logo from '../../assets/fodegran.jpeg'
import Logo2 from '../../assets/fodegran2.jpeg'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { GiSandsOfTime } from "react-icons/gi";
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Navbar from "../../components/Navbar";
import CurrencyInput from "../../components/inputCantidad";
import { createCredito , mailAuxiliar , deleteCredito } from '../../services/creditosServices';
import './styles.css';

export default function SolicitudCredito (){
    //Declaramos variables
    const [ cedula , setCedula ] = useState ("");
    const [ nombre , setNombre ] = useState ("");
    const [ correo , setCorreo ] = useState ("");
    const [ TipoCredito , setTipoCredito ] = useState ("Crédito");
    const [ cantidad , setCantidad ] = useState ("");
    const [ plazo , setPlazo ] = useState ("");

    //constante de envio
    const [enviando, setEnviando] = useState(false);

    //Accion de submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setEnviando(true)
        if(cedula !== "" && nombre !== "" && correo !== "" 
            && TipoCredito !== "" && cantidad !== "" 
            && plazo !== ""
        ){
            const body = {
                cedula: cedula,
                nombre: nombre,
                correo: correo,
                TipoCredito: TipoCredito,
                cantidad: cantidad.replace(/\./g, ''),
                plazo: plazo,
                estado: 'Solicitado',
                createdAt: new Date()
            }
            localStorage.setItem('body',JSON.stringify(body))
            createCredito(body)
            .then(({data})=>{
                mailAuxiliar(body)
                .then(()=>{
                    Swal.fire({
                        icon:'success',
                        title:'¡Felicidades!',
                        text:'Se ha generado la solicitud de manera satisfactoria',
                        timer:5000,
                        showConfirmButton:false,
                        showCancelButton:false,
                    })
                    handleClear()
                })
                .catch(()=>{
                    setEnviando(false)
                    deleteCredito(data.id)
                    Swal.fire({
                        icon:'warning',
                        title:'¡ERROR!',
                        text:'Ha ocurrido un error al momento de generar la solicitud. intenta de nuevo. Si el problema persiste informanos vía whatsapp.',
                        showConfirmButton:true,
                        confirmButtonColor: '#0101b5',
                        showCancelButton:false
                    })
                })
            })
            .catch((error)=>{
                setEnviando(false)
                Swal.fire({
                    icon:'warning',
                    /* title:`${error}`, */
                    title:'¡ERROR!',
                    text:'Ha ocurrido un error al momento de generar la solicitud. intenta de nuevo. Si el problema persiste informanos vía whatsapp.',
                    showConfirmButton:true,
                    confirmButtonColor: '#0101b5',
                    showCancelButton:false
                })
            })
        }else{
            setEnviando(false)
            Swal.fire({
                icon:'warning',
                title:'¡ATENCIÓN!',
                text:'Para llevar a cabo la solicitud de crédito, debes llenar todos los campos del formulario.',
                timer: 5000,
                showConfirmButton:false,
                showCancelButton:false
            })
        }
    }

    const handleClear = () => {
        setCedula('')
        setNombre('')
        setCantidad('')
        setCorreo('')
        /* setTipoCredito('') */
        setPlazo('')
        setEnviando(false)
    }

    /* logica de el plazo */
    const handlePlazo = (e) => {
        const inputValue = e.target.value;
        if (/^\d{0,2}$/.test(inputValue)) {
            setPlazo(inputValue);
        }
      };

    return(
        <div>
            <Navbar/>
        <div className="d-flex justify-content-center align-items-center h-100 w-100 m-auto">
            <div
                className="center-container soli border border-4 shadow rounded-4 m-auto w-100"
                style={{ maxWidth: 850 , backgroundColor: 'whitesmoke'}}
            >
                <form onSubmit={handleSubmit}>
                <h1 className="logo-soli fw-bold justify-content-center text-align-center w-100 align-items-center" style={{color:'#0101b5'}}>Solicitud de crédito</h1>
                <div className="container">
                    <div className="row">
                        <div className="logo-soli col col-12 col-lg-6 col-md-12">
                            <img src={Logo} className="h-100 shadow" alt="logo" />
                        </div>
                        <div className="col col-12 col-lg-6 col-md-12 d-flex flex-column">
                            <h1 className="logo-compressed fw-bold" style={{color:'#0101b5'}}>Formulario de Solicitud de crédito</h1>
                            <div className="d-flex info-funcionario">
                                <TextField 
                                    id="standard-basic"
                                    className="me-3 w-100 " 
                                    label="No. de identificación" 
                                    variant="standard" 
                                    type="number"
                                    value={cedula}
                                    onChange={(e)=>setCedula(e.target.value)}
                                    autoComplete="off"
                                    required
                                />
                                <TextField 
                                    id="standard-basic" 
                                    className="w-100"
                                    label="Nombre" 
                                    variant="standard" 
                                    type="text"
                                    value={nombre}
                                    onChange={(e)=>setNombre(e.target.value)}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div className="d-flex info-funcionario w-100 mt-1">
                                <TextField 
                                    id="standard-basic" 
                                    className="me-3 w-100"
                                    label="Correo Electrónico" 
                                    variant="standard" 
                                    type="email"
                                    value={correo}
                                    onChange={(e)=>setCorreo(e.target.value)}
                                    autoComplete="off"
                                    required
                                />
                                <TextField 
                                    id="standard-basic" 
                                    label="Tipo: Crédito" 
                                    className="w-100"
                                    variant="standard" 
                                    disabled
                                    value={TipoCredito}
                                    onChange={(e)=>setTipoCredito(e.target.value)}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div className="d-flex info-funcionario w-100 mt-1">

                                <CurrencyInput cantidad={cantidad} setCantidad={setCantidad}/>
                                
                                {/* <FormControl fullWidth className="mt-1 me-3" variant="standard">
                                    <InputLabel htmlFor="standard-adornment-amount">Monto</InputLabel>
                                    <Input
                                        id="standard-adornment-amount"
                                        onChange={(e)=>setCantidad(e)}
                                        type="number"
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    />
                                </FormControl> */}
                                <TextField 
                                    id="standard-basic" 
                                    className="w-100 mt-1"
                                    label="Plazo" 
                                    variant="standard" 
                                    /* type="number" */
                                    value={plazo}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        endAdornment: <InputAdornment position="end">meses</InputAdornment>,
                                        inputProps: { maxLength: 2 }, // Restringir la longitud máxima a 1 dígito
                                        inputMode: 'numeric'
                                    }}
                                    onChange={handlePlazo}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div className="d-flex text-align-center align-items-center justify-content-center">
                                <button 
                                    className="mt-3 bt-envio w-50 mb-2" 
                                    style={{color:'white', borderRadius:12}}
                                    onSubmit={(e)=>handleSubmit(e)}
                                >
                                    {enviando ? <strong>Enviando... <GiSandsOfTime /></strong>:<strong>Enviar</strong>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
        </div>
    )
}