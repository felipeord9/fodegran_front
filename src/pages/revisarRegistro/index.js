import React , {useEffect, useState , useContext } from "react"
import { useNavigate } from "react-router-dom";
import NavBicatacora from "../../components/NavBitacora";
import Logo2 from '../../assets/fodegran.jpeg'
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { fa } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaPhone } from "react-icons/fa6";
import { GiSandsOfTime } from "react-icons/gi";
import { createOdontologia , findByCedula , findOdontologia , updateOdontologia } from "../../services/odontologiaService";
import Swal from "sweetalert2";
import AuthContext from "../../context/authContext";
import './styles.css'

export default function RevisarRegistro ({ registro , setRegistro }){
    const { user } = useContext(AuthContext);
    const [info,setInfo] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        const registro = localStorage.getItem('registro');
        if(registro){
            setInfo(JSON.parse(registro))
        }
    },[])

    const handleInfo = (e) => {
        const { id, value } = e.target;
        if(id==='IdBene1' || id==='IdBene2' 
            || id==='IdBene3' || id==='idCotizante'
            || id==='numeroCotizante'
        ){
            if(/^\d*$/.test(value)){
                setInfo({
                    ...info,
                    [id]: value,
                });
            }
        }else if(id==='DescBene2' || id==='parenBene2' ||
            id==='DescBene3' || id==='parenBene3' ||
            id==='DescBene1' || id==='parenBene1' || 
            id==='nameCotizante'
        ){
            setInfo({
                ...info,
                [id]: (value).toUpperCase(),
            });
        }else if(id==='correoCotizante'){
            setInfo({
                ...info,
                [id]: (value).toLowerCase(),
            });
        }else{
            setInfo({
                ...info,
                [id]: value,
            });
        }
    }

    const [enviando, setEnviando] = useState(false);

    const editar = (e) => {
        e.preventDefault();
        navigate('/editar/registro')
    }

    const handleCancel = (e) => {
        e.preventDefault();
        localStorage.removeItem('registro')
        navigate('/registros/odontologia')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setEnviando(true);
        const revisado = {
            estado:'REVISADO'
        }
        updateOdontologia(info.id,revisado)
        .then(()=>{
            setEnviando(false)
            navigate('/registros/odontologia')
            Swal.fire({
                icon:'success',
                title:'¡Excelente!',
                text:'El registro se ha marcado como "REVISADO" en el sistema.',
                showConfirmButton:false,
                timer:6000
            })
        })
        .catch(()=>{
            setEnviando(false)
            Swal.fire({
              icon:'warning',
              title:'¡ERROR!',
              text:'Ha ocurrido un error al momento de actualizar el estado del registro. intentalo de nuevo.',
              timer:5000,
              showConfirmButton:false
            })
        })
    }

    const handleClear = () => {
        setInfo({})
        navigate('/odontologia')
    }

    // Obtener la fecha actual
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses comienzan desde 0
    const day = String(today.getDate()).padStart(2, '0');
    const maxDate = `${year}-${month}-${day}`;

    /* logica de convertir de new date a tipo date */
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
        const day = String(date.getDate()+1).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    return(
        <div>
            <div>
                <NavBicatacora />
            </div>
            <div style={{height:63}}></div>
            <div className="container">
               <form onSubmit={handleSubmit}>
                <div className="">
                <div className="row row-cols-sm-2 p-3">
                    <h3 className="fw-bold w-100 d-flex justify-content-center align-items-center" style={{color:'#0101b5'}} ><strong>REVISA DETALLAMENTE LA INFORMACIÓN</strong></h3>
                    <h5 className="fw-bold w-100 d-flex justify-content-center align-items-center" style={{color:'black'}} >Afiliado: {info.idCotizante} - {info.nameCotizante}</h5>
                    <h4 className="fw-bold w-100 d-flex justify-content-start align-items-start" style={{color:'green'}} ><strong>INFORMACIÓN DEL COTIZANTE</strong></h4>
                    <div className="input-add">
                        <label>No. Identificación:</label>
                        <input
                            id="cedula"
                            type="text"
                            placeholder="Completa este campo sin puntos ni comas"
                            value={ info.idCotizante }
                            className="form-control form-control-sm"
                            aria-controls="off"
                            onChange={(e) => {
                                handleInfo(e);
                            }}
                            disabled
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="input-add">
                    <label>Nombre completo:</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Completa este campo"
                        value={ info.nameCotizante }
                        className="form-control form-control-sm"
                        aria-controls="off"
                        onChange={(e) => {
                            handleInfo(e);
                        }}
                        disabled
                        required
                        autoComplete="off"
                    />
                    </div>
                    <div className="input-add">
                        <label>Correo electrónico:</label>
                        <input
                            id="correo"
                            type="email"
                            placeholder="ejemplo@gmail.com"
                            value={ info.correoCotizante }
                            className="form-control form-control-sm"
                            min={1000}
                            aria-controls="off"
                            onChange={(e) => {
                                handleInfo(e);
                            }}
                            disabled
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="input-add">
                        <label>Número telefónico:</label>
                        <input
                            id="numero"
                            type="text"
                            placeholder="Número de teléfono sin puntos ni comas"
                            value={ info.numeroCotizante }
                            className="form-control form-control-sm"
                            min={1000}
                            aria-controls="off"
                            onChange={(e) => {
                                handleInfo(e);
                            }}
                            disabled
                            required
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="bg-light rounded shadow-sm p-3 mb-3">
                    <div>
                    <h4 className="fw-bold w-100 d-flex justify-content-start" style={{color:'green'}}><strong>AGREGAR BENEFICIARIO</strong></h4>
                    <label className="fw-bold">BENEFICIARIO 1</label>
                    <form>
                        {/* Beneficiario 1 */}
                        <div className="row row-cols-sm-2">
                            <div className="col input-add">
                                <label>No. Identificación:</label>
                                <input
                                id="idBene1"
                                type="text"
                                placeholder="Completa este campo para agregar sin comas ni puntos"
                                value={ info.idBene1 }
                                className="form-control form-control-sm"
                                min={1000}
                                aria-controls="off"
                                onChange={(e) => {
                                    handleInfo(e);
                                }}
                                disabled
                                required
                                autoComplete="off"
                                />
                            </div>
                            <div className="input-add">
                            <label>Nombre completo:</label>
                                <input
                                id="nameBene1"
                                type="text"
                                autoComplete="off"
                                placeholder="Completa este campo para agregar"
                                value={ info.nameBene1 }
                                className="form-control form-control-sm"
                                aria-controls="off"
                                onChange={(e) => {
                                    handleInfo(e);
                                }}
                                disabled
                                required
                                />
                            </div>
                            <div className="input-add">
                                <label>Fecha nacimiento:</label>
                                <input
                                type="date"
                                autoComplete="off"
                                id="fechaBene1"
                                value={formatDate(new Date(info.fechaBene1))}
                                onChange={(e) => {
                                    handleInfo(e);
                                }} 
                                disabled               
                                className="form-control form-control-sm"
                                required
                                max={maxDate}
                                />
                            </div>
                            <div className="input-add">
                                <label>Parentezco:</label>
                                <input
                                id="parenBene1"
                                type="text"
                                autoComplete="off"
                                placeholder="Completa este campo para agregar"
                                value={info.parenBene1}
                                min={0.1}
                                disabled
                                className="form-control form-control-sm"
                                onChange={(e)=>handleInfo(e)}
                                required
                                />
                            </div>
                        </div>

                        {/* beneficiario 2 */}
                        <label className="fw-bold mt-4">BENEFICIARIO 2</label>
                        <div className="row row-cols-sm-2">
                            <div className="col input-add">
                                <label>No. Identificación:</label>
                                <input
                                    id="idBene2"
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Completa este campo para agregar sin puntos ni comas"
                                    value={ info.idBene2 }
                                    className="form-control form-control-sm"
                                    aria-controls="off"
                                    onChange={(e) => {
                                        handleInfo(e);
                                    }}
                                    disabled
                                />
                            </div>
                            <div className="input-add">
                                <label>Nombre completo:</label>
                                <input
                                    id="nameBene2"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Completa este campo para agregar"
                                    value={ info.nameBene2 }
                                    className="form-control form-control-sm"
                                    aria-controls="off"
                                    onChange={(e) => {
                                        handleInfo(e);
                                    }}
                                    disabled
                                />
                            </div>
                            <div className="input-add">
                                <label>Fecha nacimiento:</label>
                                <input
                                    type="date"
                                    autoComplete="off"
                                    id="fechaBene2"
                                    value={formatDate(new Date(info.fechaBene2))}
                                    onChange={(e) => {
                                        handleInfo(e);
                                    }}     
                                    disabled           
                                    className="form-control form-control-sm"
                                    max={maxDate}
                                />
                            </div>
                            <div className="input-add">
                                <label>Parentezco:</label>
                                <input
                                    id="parenBene2"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Completa este campo para agregar"
                                    value={ info.parenBene2 }
                                    min={0.1}
                                    disabled
                                    className="form-control form-control-sm"
                                    onChange={handleInfo}
                                />
                            </div>
                        </div>

                        {/* beneficiario 3 */}
                        <label className="fw-bold mt-4">BENEFICIARIO 3</label>
                        <div className="row row-cols-sm-2">
                            <div className="col input-add">
                                <label>No. Identificación:</label>
                                <input
                                    id="idBene3"
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Completa este campo para agregar sin puntos ni comas"
                                    value={ info.idBene3 }
                                    className="form-control form-control-sm"
                                    min={1000}
                                    aria-controls="off"
                                    onChange={(e) => {
                                        handleInfo(e);
                                    }}
                                    disabled
                                />
                            </div>
                            <div className="input-add">
                                <label>Nombre completo:</label>
                                <input
                                    id="nameBene3"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Completa este campo para agregar"
                                    value={ info.nameBene3 }
                                    className="form-control form-control-sm"
                                    aria-controls="off"
                                    onChange={(e) => {
                                        handleInfo(e);
                                    }}
                                    disabled
                                />
                            </div>
                            <div className="input-add">
                                <label>Fecha nacimiento:</label>
                                <input
                                    type="date"
                                    autoComplete="off"
                                    id="fechaBene3"
                                    value={formatDate(new Date(info.fechaBene3))}
                                    onChange={(e) => {
                                        handleInfo(e);
                                    }}  
                                    disabled              
                                    className="form-control form-control-sm"
                                    max={maxDate}
                                />
                            </div>
                            <div className="input-add">
                                <label>Parentezco:</label>
                                <input
                                    id="parenBene3"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Completa este campo para agregar"
                                    value={ info.parenBene3 }
                                    min={0.1}
                                    disabled
                                    className="form-control form-control-sm"
                                    onChange={handleInfo}
                                />
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
                {/* {new Date('1111-01-01').toLocaleDateString()} */}
                {user.role !== 'odontologa' &&
                    <div className="d-flex w-100 justify-content-end align-items-end">
                        <div className="div-botones text-align-center align-items-center justify-content-center">
                            <button 
                                className="mt-1 boton-ojo w-100 mb-4 ms-2 me-2 ps-4 pe-4" 
                                style={{color:'white', borderRadius:12}}
                                onSubmit={(e)=>handleSubmit(e)}
                            >
                                {enviando ? <strong>Enviando... <GiSandsOfTime /></strong>:<strong>Revisado</strong>}
                            </button>
                            <button 
                                className="mt-1 bt-envio w-100 mb-4 ms-2 me-2 ps-4 pe-4" 
                                style={{color:'white', borderRadius:12 , backgroundColor:'#0101b5'}}
                                onClick={(e)=>editar(e)}
                            >
                                <strong>Editar</strong>
                            </button>
                            <button 
                                className="mt-1 boton-cancel w-100 mb-4 ms-2 me-2 ps-4 pe-4" 
                                style={{color:'white', borderRadius:12}}
                                onClick={(e)=>handleCancel(e)}
                            >
                                <strong>Cancelar</strong>
                            </button>
                        </div>
                    </div>
                }
                </div>
                </form> 
            </div>
        </div>
    )
}