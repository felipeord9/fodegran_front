import React , {useEffect, useState} from "react"
import NavBeneficiario from "../../components/NavBeneficiarios";
import Logo2 from '../../assets/fodegran.jpeg'
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { fa } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaPhone } from "react-icons/fa6";
import { GiSandsOfTime } from "react-icons/gi";
import { createOdontologia , findByCedula , findOdontologia } from "../../services/odontologiaService";
import Swal from "sweetalert2";
import './styles.css'

export default function Odontologia (){
    /* constante de beneficiarios */
    const [datos, setDatos] = useState({
        IdBene1: "",
        DescBene1: "",
        fechaBene1: null,
        parenBene1: "",
    
        IdBene2:'',
        DescBene2:'',
        fechaBene2: null,
        parenBene2:'',
    
        IdBene3:'',
        DescBene3:'',
        fechaBene3: null,
        parenBene3:'',
    });
    const handlerDatos = (e) => {
        const { id, value } = e.target;
        if(id==='IdBene1' || id==='IdBene2' || id==='IdBene3'){
            if(/^\d*$/.test(value)){
                setDatos({
                    ...datos,
                    [id]: value,
                });
            }
        }else if(id==='DescBene2' || id==='parenBene2' ||
            id==='DescBene3' || id==='parenBene3' ||
            id==='DescBene1' || id==='parenBene1'
        ){
            setDatos({
                ...datos,
                [id]: (value).toUpperCase(),
              });
        }else{
            setDatos({
              ...datos,
              [id]: value,
            });
        }
    };

    const [registros,setRegistros] = useState({});
    useEffect(()=>{
        findOdontologia()
        .then(({data})=>{
            setRegistros(data)
        })
    },[])

    const [enviando, setEnviando] = useState(false);

    const handleInstagramClick = () => {
        // Redirigir a la página de Instagram
        window.location.href = 'https://www.instagram.com/oncaabox?igsh=ejRxZndjdmZlNW5o';
    };
    const handleFacebookClick = () => {
        const correo = 'asistentefodegran@gmail.com';
        window.location.href = `mailto:${correo}`;
        // Redirigir a la página de facebook
        /* window.location.href = 'https://www.facebook.com/oncaabox?mibextid=ZbWKwL'; */
    };
    const correo = 'asistentefodegran@gmail.com';
    const handleClick = () => {
        window.location.href = `mailto:${correo}`;
    };
    const [ cotizante, setCotizante ] = useState({
        cedula:'',
        nombre:'',
        correo:'',
        numero:''
    })

    const handlerChange = (e) => {
        const { id, value } = e.target;
        if(id==='cedula' || id==='numero'){
            if(/^\d*$/.test(value)){
                setCotizante({
                    ...cotizante,
                    [id]: value,
                });
            }
        }else if(id==='nombre'){
            setCotizante({
                ...cotizante,
                [id]: (value).toUpperCase(),
            });
        }else if(id==='correo'){
            setCotizante({
                ...cotizante,
                [id]: (value).toLowerCase(),
            });
        }
        else{
            setCotizante({
              ...cotizante,
              [id]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEnviando(true)
        if(cotizante.correo!=='' && cotizante.correo.includes('@') 
            && cotizante.correo.split('@')[1].includes('.'))
        {
            if(cotizante.cedula !=='' && cotizante.correo !== ''
                && cotizante.nombre !=='' && datos.IdBene1 !==''
                && datos.DescBene1 !== '' && datos.fechaBene1 !== null
                && datos.parenBene1 !=='' && cotizante.numero 
            ){
                findByCedula(cotizante.cedula)
                .then(()=>{
                    setEnviando(false)
                    Swal.fire({
                        icon:'warning',
                        title:'¡ERROR!',
                        text:'Esta cédula ya se encuentra registrada en la base de datos de odontología. NO puedes hacer dos registros. Si deseas actualizar información envianos un correo a: 	asistentefodegran@gmail.com.',
                        showConfirmButton:true,
                        showCancelButton:false,
                        confirmButtonColor:'red',
                        confirmButtonText:'OK'
                    })
                })
                .catch(()=>{
                    const body ={
                        cotizante: cotizante,
                        datos: datos,
                        createdAt: new Date(),
                        estado: 'NUEVO',
                        cortesia: false,
                    }
                    createOdontologia(body)
                    .then(()=>{
                        setEnviando(false)
                        Swal.fire({
                            icon:'success',
                            title:'¡Felicidades!',
                            text:'Has quedado registrado de manera satisfactoria',
                            timer:5000,
                            showConfirmButton:true,
                            confirmButtonColor:'green'
                        })
                        handleClear()
                    })
                    .catch(()=>{
                        setEnviando(false)
                        Swal.fire({
                            icon:'warning',
                            title:'¡Oups!',
                            text:'Ha ocurrido un error al momento de hacer el registro. Vuelve a intentarlo. Si el problema persiste comunicanos al whatsapp.',
                            timer:5000,
                            showConfirmButton:true,
                            confirmButtonColor:'red'
                        })
                    })
                })
            }else{
                if(cotizante.cedula === '' || cotizante.correo ===''
                    || cotizante.nombre === '' || cotizante.numero
                ){
                    setEnviando(false)
                    Swal.fire({
                        icon:'warning',
                        title:'¡ERROR!',
                        text:'Porfavor llena toda la información del cotizante para poder hacer el registro.',
                        showConfirmButton:true,
                        showCancelButton:false,
                        confirmButtonColor:'red',
                        confirmButtonText:'OK'
                    })
                }else 
                if(datos.IdBene1 ==='' || datos.DescBene1 === '' 
                    || datos.fechaBene1 === null || datos.parenBene1 === '' )
                {
                    setEnviando(false)
                    Swal.fire({
                        icon:'warning',
                        title:'¡ERROR!',
                        text:'Debes de llenas toda la información de por lo menos el "Beneficiario 1" para poder efectuar el registro.',
                        showConfirmButton:true,
                        showCancelButton:false,
                        confirmButtonColor:'red',
                        confirmButtonText:'OK'
                    }) 
                }
            }   
        }else{
                setEnviando(false)
                Swal.fire({
                    title:'¡Atención!',
                    text:'Correo inválido para el registro. Verifícalo y vuelve a intentarlo.',
                    showConfirmButton:true,
                    confirmButtonColor:'green'
                })
        }
    }

    const handleClear = () => {
        setDatos({
            DescBene1:'',
            DescBene3:'',
            DescBene2:'',
            fechaBene1:null,
            fechaBene2:null,
            fechaBene3:null,
            IdBene1:'',
            IdBene2:'',
            IdBene3:'',
            parenBene1:'',
            parenBene2:'',
            parenBene3:''
        })
        setCotizante({
            cedula:'',
            correo:'',
            nombre:'',
            numero:''
        })
    }

    /* 3.508444227406495, -76.50901063381151 */
    const handleMaps = () => {
        // Reemplaza estas coordenadas con las de tu ubicación deseada
        const latitude = 3.508444227406495;
        const longitude = -76.50901063381151;
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

        window.open(googleMapsUrl, '_blank');
    };

    // Obtener la fecha actual
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses comienzan desde 0
    const day = String(today.getDate()).padStart(2, '0');
    const maxDate = `${year}-${month}-${day}`;

    //logica de dar click en el numero de celular
    const PhoneNumber = ({ number }) => {
        //logica de saber si es celular
        const isMobile = () => {
          const userAgent = navigator.userAgent || navigator.vendor || window.opera;
          return /android|iPhone|iPad|iPod/i.test(userAgent);
        };
      
        const handleClick = () => {
          if (isMobile()) {
            window.location.href = `tel:${number}`;
          } else {
            navigator.clipboard.writeText(number)
              .then(() => {
                alert('Número copiado al portapapeles');
              })
              .catch(err => {
                console.error('Error al copiar el número: ', err);
              });
          }
        };
      
        return (
          <label className="d-flex mt-0"><a onClick={handleClick} style={{ cursor: 'pointer', border: 'none', background: 'none', color: 'blue', textDecoration: 'underline' }}><FaPhone className="me-1"/>315 697 3320</a></label>
        );
    };

    /* logica de validar registro cuando de click en otro input */
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const filtroRegistro = registros.filter((item)=>{
              if(item.idCotizante === cotizante.cedula){
                return item
              }
            })
            if(filtroRegistro.length>0){
              Swal.fire({
                icon:'warning',
                title:'¡ATENCIÓN!',
                text:`El numero de identificación ${cotizante.cedula} 
                ya se encuentra registrado en nuestra base de datos.`,
                showCancelButton:false,
                showConfirmButton:false,
                timer:10000
              })
            }
        };
    }

    //funcion cuando cambie de input haga la busqueda
    const handleInputBlur = () => {
          const filtroRegistro = registros.filter((item)=>{
            if(item.idCotizante === cotizante.cedula){
              return item
            }
          })
          if(filtroRegistro.length>0){
            Swal.fire({
                icon:'warning',
                title:'¡ATENCIÓN!',
                text:`El numero de identificación ${cotizante.cedula} 
                ya se encuentra registrado en nuestra base de datos.`,
                showCancelButton:false,
                showConfirmButton:false,
                timer:10000
            })
        }
    };

    return(
        <div>
            <div>
                <NavBeneficiario />
            </div>
            <div style={{height:63}}></div>
            <div className="container">
               <form onSubmit={handleSubmit}>
                <div className="">
                <div className="row row-cols-sm-2 p-3">
                    <h4 className="fw-bold w-100 d-flex justify-content-center" style={{color:'#0101b5'}} ><strong>INFORMACIÓN DEL COTIZANTE</strong></h4>
                    <div className="input-add">
                        <label>No. Identificación:</label>
                        <input
                            id="cedula"
                            type="text"
                            placeholder="Completa este campo sin puntos ni comas"
                            value={ cotizante.cedula }
                            className="form-control form-control-sm"
                            min={1000}
                            aria-controls="off"
                            onChange={(e) => {
                                handlerChange(e);
                            }}
                            required
                            autoComplete="off"
                            onKeyPress={(e)=>handleKeyPress(e)}
                            onBlur={handleInputBlur}
                        />
                    </div>
                    <div className="input-add">
                    <label>Nombre completo:</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Completa este campo"
                        value={ cotizante.nombre }
                        className="form-control form-control-sm"
                        aria-controls="off"
                        onChange={(e) => {
                            handlerChange(e);
                        }}
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
                            value={ cotizante.correo }
                            className="form-control form-control-sm"
                            min={1000}
                            aria-controls="off"
                            onChange={(e) => {
                            handlerChange(e);
                            }}
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
                            value={ cotizante.numero }
                            className="form-control form-control-sm"
                            min={1000}
                            aria-controls="off"
                            onChange={(e) => {
                                handlerChange(e);
                            }}
                            required
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="bg-light rounded shadow-sm p-3 mb-3">
                    <div>
                    <h4 className="fw-bold w-100 d-flex justify-content-center" style={{color:'green'}}><strong>AGREGAR BENEFICIARIO</strong></h4>
                    <label className="fw-bold">BENEFICIARIO 1</label>
                    <form>
                        {/* Beneficiario 1 */}
                        <div className="row row-cols-sm-2">
                            <div className="col input-add">
                                <label>No. Identificación:</label>
                                <input
                                id="IdBene1"
                                type="text"
                                placeholder="Completa este campo para agregar sin comas ni puntos"
                                value={ datos.IdBene1 }
                                className="form-control form-control-sm"
                                min={1000}
                                aria-controls="off"
                                onChange={(e) => {
                                    handlerDatos(e);
                                }}
                                required
                                autoComplete="off"
                                />
                            </div>
                            <div className="input-add">
                            <label>Nombre completo:</label>
                                <input
                                id="DescBene1"
                                type="text"
                                autoComplete="off"
                                placeholder="Completa este campo para agregar"
                                value={ datos.DescBene1 }
                                className="form-control form-control-sm"
                                aria-controls="off"
                                onChange={(e) => {
                                    handlerDatos(e);
                                }}
                                required
                                />
                            </div>
                            <div className="input-add">
                                <label>Fecha nacimiento:</label>
                                <input
                                type="date"
                                autoComplete="off"
                                id="fechaBene1"
                                value={datos.fechaBene1}
                                onChange={(e) => {
                                    handlerDatos(e);
                                }}                
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
                                value={datos.parenBene1}
                                min={0.1}
                                className="form-control form-control-sm"
                                onChange={(e)=>handlerDatos(e)}
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
                                    id="IdBene2"
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Completa este campo para agregar sin puntos ni comas"
                                    value={ datos.IdBene2 }
                                    className="form-control form-control-sm"
                                    aria-controls="off"
                                    onChange={(e) => {
                                        handlerDatos(e);
                                    }}
                                />
                            </div>
                            <div className="input-add">
                                <label>Nombre completo:</label>
                                <input
                                    id="DescBene2"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Completa este campo para agregar"
                                    value={ datos.DescBene2 }
                                    className="form-control form-control-sm"
                                    aria-controls="off"
                                    onChange={(e) => {
                                        handlerDatos(e);
                                    }}
                                />
                            </div>
                            <div className="input-add">
                                <label>Fecha nacimiento:</label>
                                <input
                                    type="date"
                                    autoComplete="off"
                                    id="fechaBene2"
                                    value={datos.fechaBene2}
                                    onChange={(e) => {
                                        handlerDatos(e);
                                    }}                
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
                                    value={datos.parenBene2 }
                                    min={0.1}
                                    className="form-control form-control-sm"
                                    onChange={handlerDatos}
                                />
                            </div>
                        </div>

                        {/* beneficiario 3 */}
                        <label className="fw-bold mt-4">BENEFICIARIO 3</label>
                        <div className="row row-cols-sm-2">
                            <div className="col input-add">
                                <label>No. Identificación:</label>
                                <input
                                    id="IdBene3"
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Completa este campo para agregar sin puntos ni comas"
                                    value={ datos.IdBene3 }
                                    className="form-control form-control-sm"
                                    min={1000}
                                    aria-controls="off"
                                    onChange={(e) => {
                                        handlerDatos(e);
                                    }}
                                />
                            </div>
                            <div className="input-add">
                                <label>Nombre completo:</label>
                                <input
                                    id="DescBene3"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Completa este campo para agregar"
                                    value={ datos.DescBene3 }
                                    className="form-control form-control-sm"
                                    aria-controls="off"
                                    onChange={(e) => {
                                        handlerDatos(e);
                                    }}
                                />
                            </div>
                            <div className="input-add">
                                <label>Fecha nacimiento:</label>
                                <input
                                    type="date"
                                    autoComplete="off"
                                    id="fechaBene3"
                                    value={datos.fechaBene3}
                                    onChange={(e) => {
                                        handlerDatos(e);
                                    }}                
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
                                    value={ datos.parenBene3 }
                                    min={0.1}
                                    className="form-control form-control-sm"
                                    onChange={handlerDatos}
                                />
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
                {/* {new Date('1111-01-01').toLocaleDateString()} */}
                <div className="d-flex text-align-center align-items-center justify-content-center">
                    <button 
                        className="mt-1 bt-envio w-50 mb-4" 
                        style={{color:'white', borderRadius:12}}
                        onSubmit={(e)=>handleSubmit(e)}
                    >
                        {enviando ? <strong>Enviando... <GiSandsOfTime /></strong>:<strong>Enviar</strong>}
                    </button>
                </div>
                </div>
                </form> 
            </div>

            {/* Pie de pagina */}
            <footer>
                <div className="container-fluid" style={{backgroundColor:'black', color:'white'}}>
                    <div className="row">
                    <div className="col p-4 ps-5 col-12 col-md-12 col-lg-12 justify-content-center text-align-center d-flex w-100">
                    <div className="d-flex w-50 justify-content-end align-items-end me-2 mt-1">
                        <img className="mt-0 ms-0 logo h-70 me-1" style={{borderRadius:10, userSelect:'none'}} src={Logo2} />
                    </div>
                    <div className="d-flex flex-column mt-1 w-50 ms-2 me-2">
                        <div className="d-flex flex-row mt-1 ">
                            <label><a className="mt-1 d-flex" href={`mailto:${correo}`} onClick={handleClick}><FontAwesomeIcon style={{width:40,height:40}} className="facebook-icon ms-2" icon={faEnvelope} /></a></label>
                            <FontAwesomeIcon className="instagram-icon ms-2 ps-1 mt-2" onClick={handleMaps} icon={faMapMarkerAlt} size="2x" />
                            {/* <FontAwesomeIcon onClick={handleInstagramClick} style={{width:40,height:40}} className="instagram-icon ms-3" icon={faInstagram} /> */}
                        </div>

                        <h5 className="d-flex pb-0 mb-0">FodeGran</h5>
                        <label className="d-flex mt-0 mb-0">Calle 13 # 32 - 417, Bodega 4, Acopi Yumbo</label>
                        {/* <label><a className="mt-1 d-flex" href={`mailto:${correo}`} onClick={handleClick}>{correo}</a></label> */}
                        <PhoneNumber number="+57 3156973320" />
                        {/* <label className="d-flex mt-0"><FaPhone className="me-1"/>315 697 3320</label> */}
                    </div>
                    </div> 
                    </div>             
                </div>
            </footer>
        </div>
    )
}