import { useEffect, useState , useRef } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Navbar from "../../components/NavBitacora";
import { GiSandsOfTime } from "react-icons/gi";
import { getAllAgencies } from "../../services/agencyService";
import CurrencyInput from "../../components/inputCantidad";
import { createCredito , deleteCredito , mailSolicitante } from '../../services/creditosServices';
import { fileSend } from '../../services/updateFilesService'
import Swal from "sweetalert2";
import './styles.css';

export default function SolicitudCredito (){

    //Declaramos variables
    const [ valorSolicitado , setValorSolicitado ] = useState (null);
    const [ plazo , setPlazo ] = useState (null);
    const [ modalidad, setModalidad ] = useState(null)
    const [ destino, setDestino ] = useState(null)
    const [ sexo, setSexo ] = useState(null);
    const [ cuenta, setCuenta ] = useState(null);
    const [ agencias, setAgencias ] = useState([]);
    const [ agencia, setAgencia ] = useState(null);
    const today = new Date();
    const maxDate = today.setFullYear(today.getFullYear() - 18);
    const convertMaxDate = new Date(maxDate).toISOString().split("T")[0];
    const navigate = useNavigate();

    const selectBranchRef = useRef();

    useEffect(()=>{
        getAllAgencies().then((data) => setAgencias(data));
    },[])

    const [files, setFiles] = useState({
        simuladorCredito: null,
        relacionCuentas: null,
    });
    
    const handleFileChange = (fieldName, e) => {
        const selectedFile = e.target.files[0];
        setFiles(prevFiles => ({ ...prevFiles, [fieldName]: selectedFile }));
    };
  
    const [search, setSearch] = useState({
        cualDestino: "",
        tipoSolicitante: '',
        cedula: "",
        expedidaEn: "",
        nombre: '',
        email:'',
        estadoCivil:'',
        fechaNacimiento:'',
        fechaAfiliacion: null,
        lugarNacimiento:'',
        personasAcargo:'',
        direccion:'',
        ciudad:'',
        celular:'',
        NombreAgencia:'EL GRAN LANGOSTINO S.A.S',
        cityAgencia:'',
        cuentaBancaria:'',
        entidadBancaria:'',
    });

    const handlerChangeSearch = (e) => {
        const { id, value } = e.target;
        console.log(value);
        setSearch({
          ...search,
          [id]: value,
        });
    };

    const [invoiceType, setInvoiceType] = useState(false);
    const [typeClient, setTypeClient] = useState('asociado');
    const changeType = (e) => {
        if(typeClient === 'no asociado'){
            setTypeClient('asociado')
        }else if(typeClient === 'asociado'){
            setTypeClient('no asociado')
        }
        setInvoiceType(!invoiceType);
        /* setClient(null); */
        /* setSucursal(null); */
        selectBranchRef.current.selectedIndex = 0;
    };

    //constante de envio
    const [enviando, setEnviando] = useState(false);

    //variables de la modalidad de pago
    const [modalidades, setModalidades] = useState({
        quincena: false,
        mensual: false,
    });
    //logica del llenado de los checkbox
    const handleCheckboxChange = (type) => {
        setModalidades({
            quincena: type === 'quincena' ? true : false,
            mensual: type === 'mensual' ? true : false,
        });
        setModalidad(type)
    };

    //variables del genero
    const [sexos, setSexos] = useState({
        masculino: false,
        femenino: false,
    });
    //logica del llenado de los checkbox
    const handlesexo = (type) => {
        setSexos({
            masculino: type === 'masculino' ? true : false,
            femenino: type === 'femenino' ? true : false,
        });
        setSexo(type)
    };

    //variables del tipo de cuenta
    const [cuentas, setCuentas] = useState({
        ahorros: false,
        corriente: false,
    });
    //logica del llenado de los checkbox
    const handleCuentaBancaria = (type) => {
        setCuentas({
            ahorros: type === 'ahorros' ? true : false,
            corriente: type === 'corriente' ? true : false,
        });
        setCuenta(type)
    };

    //logica para el check box de destino del crédito
    const [destinos, setDestinos] = useState({
        retanqueo: false,
        turismo: false,
        otros: false,
    });
    //logica del llenado de los checkbox
    const handleCheckboxDestino = (type) => {
        setDestinos({
            retanqueo: type === 'retanqueo' ? true : false,
            turismo: type === 'turismo' ? true : false,
            otros: type === 'otros' ? true : false,
        });
        setDestino(type)
    };

    //Accion de submit
    const handleSubmit = (e) => {
        e.preventDefault();

        setEnviando(true)
        if(valorSolicitado !== null && plazo !== null && modalidad !== null && destino !== null && cuenta !== null){
            if(search.email !=='' && search.email.includes('@') && search.email.split('@')[1].includes('.')){
                if(!files.relacionCuentas || !files.simuladorCredito){
                    alert("Por favor adjunta el simulador de crédito y la relación de cuentas y terceros para poder realizar la solicitud de crédito.");
                    return;
                }else{
                    // Muestra la barra de carga
                    let timerInterval;
                    Swal.fire({
                    title: 'Registrando...',
                    text: 'Por favor, espera mientras se registra la solicitud...',
                    timer: 10000,
                    timerProgressBar: true,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {}, 200);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    },
                    onBeforeOpen: () => {
                        Swal.showLoading();
                    },
                    showConfirmButton: false,
                    });
                    const body = {
                        valorSolicitado: valorSolicitado.replace(/\./g, ''),
                        plazo: plazo,
                        modalidad: modalidad,
                        destinoCredito: destino,
                        descipDestino: search.cualDestino.toUpperCase(),
                        tipoSolicitante: typeClient.toUpperCase(),
                        fechaAfiliacion: search.fechaAfiliacion,
                        rowId: search.cedula,
                        lugarExpedicion: search.expedidaEn.toUpperCase(),
                        nombre: search.nombre.toUpperCase(),
                        correo: search.email.toLocaleLowerCase(),
                        estadoCivil: search.estadoCivil.toUpperCase(),
                        sexo: sexo,
                        fechaNacimiento: new Date(search.fechaNacimiento),
                        lugarNacimiento: search.lugarNacimiento.toUpperCase(),
                        personasAcargo: search.personasAcargo,
                        direccionResidencia: search.direccion.toUpperCase(),
                        ciudadResidencia: search.ciudad.toUpperCase(),
                        celularResidencia: search.celular,
                        nombreAgencia: search.NombreAgencia.toUpperCase(),
                        ciudadAgencia: agencia.toUpperCase(),
                        cuentaBancaria: search.cuentaBancaria,
                        tipoCuenta: cuenta,
                        entidadBancaria: search.entidadBancaria.toUpperCase(),
                        estado: 'Nuevo',
                        createdAt: new Date(),
                    }
                    
                    const formData = new FormData();
                    for (const fieldName in files) {
                        if (files[fieldName]) {
                        formData.append(fieldName, files[fieldName]);
                        }
                    }                
                    formData.append("clientName", search.nombre)

                    createCredito(body)
                    .then(({data})=>{
                        fileSend(formData)
                        .then(()=>{
                            mailSolicitante(data)
                            .then(()=>{
                                Swal.fire({
                                    icon:'success',
                                    title:'¡Felicidades!',
                                    text:'Se ha generado la solicitud de manera satisfactoria',
                                    timer:5000,
                                    showConfirmButton:false,
                                    showCancelButton:false,
                                })
                                setEnviando(false)
                                handleClear()
                                navigate('/bitacora/creditos')
                            })
                            .catch(()=>{
                                setEnviando(false)
                                deleteCredito(data.id)
                                Swal.fire({
                                    icon:'warning',
                                    title:'¡ERROR!',
                                    text:'Ha ocurrido un error al momento de adjuntar los documentos. intenta de nuevo. Si el problema persiste comunicate con el área de sistemas.',
                                    showConfirmButton:true,
                                    confirmButtonColor: 'red',
                                    showCancelButton:false
                                })
                            })
                        })
                        .catch((error)=>{
                            setEnviando(false)
                            deleteCredito(data.id)
                            Swal.fire({
                                icon:'warning',
                                title:'¡ERROR!',
                                text:'Ha ocurrido un error al momento de generar la solicitud. intenta de nuevo. Si el problema persiste informanos vía whatsapp.',
                                showConfirmButton:true,
                                confirmButtonColor: 'red',
                                showCancelButton:false
                            })
                        })
                    })
                    .catch((error)=>{
                        setEnviando(false)
                        Swal.fire({
                            icon:'warning',
                            title:'¡ERROR!',
                            text:'Ha ocurrido un error al momento de generar la solicitud. intenta de nuevo. Si el problema persiste informanos vía whatsapp.',
                            showConfirmButton:true,
                            confirmButtonColor: 'red',
                            showCancelButton:false
                        })
                    })
                }
            }else{
                setEnviando(false)
                Swal.fire({
                    icon:'warning',
                    title:'¡CORREO INVÁLIDO!',
                    text:'Este correo no cumple con los parámetros adecuados, recuerda que este será el usado para enviar el token de la firma digital. Verificalo y vuelve a intentarlo.',
                    timer: 9000,
                    showConfirmButton:false,
                    showCancelButton:false
                })
            }
        }else{
            setEnviando(false)
            Swal.fire({
                icon:'warning',
                title:'¡ATENCIÓN!',
                text:'Para llevar a cabo la solicitud de crédito, debes llenar todos los campos del formulario.',
                timer: 9000,
                showConfirmButton:false,
                showCancelButton:false
            })
        }
    }

    const handleClear = () => {
        setSearch({
            cualDestino: "",
            cedula: "",
            expedidaEn: "",
            fechaAfiliacion:'',
            tipoSolicitante:'',
            nombre: '',
            email:'',
            estadoCivil:'',
            fechaNacimiento:'',
            lugarNacimiento:'',
            personasAcargo:'',
            direccion:'',
            ciudad:'',
            celular:'',
            NombreAgencia:'',
            cityAgencia:'',
            cuentaBancaria:'',
            entidadBancaria:'',
        })
        setTypeClient('asociado')
        setInvoiceType(false)
        setModalidad(null)
        setDestino(null)
        setSexo(null)
        setCuenta(null)
        setValorSolicitado('')
        setPlazo('')
        setEnviando(false)
    }

    /* logica de el plazo */
    const handlePlazo = (e) => {
        const inputValue = e.target.value;
        if (/^\d{0,2}$/.test(inputValue) && inputValue <= 24) {
            setPlazo(inputValue);
        }
    };

    const handleNumeric = (e) => {
        let { id, value } = e.target;
        // ✅ Permitir solo números
        value = value.replace(/[^0-9]/g, '');
        if (/^\d{0,10}$/.test(value)) {
            /* setPlazo(inputValue); */
            setSearch({
                ...search,
                [id]: value
            })
        }
    };

    const handleCuenta = (e) => {
        let { id, value } = e.target;
        // ✅ Permitir solo números
        value = value.replace(/[^0-9]/g, '');
        if (/^\d{0,24}$/.test(value)) {
            /* setPlazo(inputValue); */
            setSearch({
                ...search,
                [id]: value
            })
        }
    };

    return(
        <div>
            <Navbar/>
            <div className="d-flex justify-content-center align-items-center h-100 w-100 m-auto">
                <div
                    className="container d-flex flex-column w-100 py-3"
                    style={{ fontSize: 10.5 }}
                >
                    <h1 className="text-center fs-5 fw-bold pt-5 mt-1" style={{color:'blue'}}>Solicitud de crédito</h1>
                    <form className="" onSubmit={handleSubmit}>
                        <div className="bg-light rounded shadow-sm p-2 mb-3">
                        <div className="d-flex flex-column gap-1">
                            <div>
                                <div className="row row-cols-sm-2">
                                    <div className="mt-2 mb-1" >
                                        <label className="fw-bold " >DATOS DEL CRÉDITO</label>
                                    </div>
                                    <div className=" typeClient d-flex flex-column ">
                                        <strong className="me-4">Tipo de solicitante</strong>
                                        <div className="d-flex flex-row align-items-center gap-2">
                                        <span id="estandar" className={!invoiceType && "text-primary"}>Afiliado</span>
                                        <button
                                            className="position-relative d-flex align-items-center btn bg-body-secondary rounded-pill toggle-container p-0 m-0"
                                            value={typeClient}
                                            onClick={(e)=>changeType(e)}
                                        >
                                            <div
                                            className={
                                                !invoiceType
                                                ? "d-flex align-items-center justify-content-center position-absolute bg-primary rounded-circle toggle"
                                                : "d-flex align-items-center justify-content-center position-absolute bg-success rounded-circle toggle active"
                                            }
                                            ></div>
                                        </button>
                                        <span id="pos" className={invoiceType ? "text-success" : undefined}>
                                            No afiliado
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Valor del prestamo, plazo y modalidad de pago */}
                                <div className="row row-cols-sm-3">
                                    <div>
                                        <CurrencyInput cantidad={valorSolicitado} setCantidad={setValorSolicitado}/>
                                    </div>
                                    <div>
                                        <TextField 
                                            id="standard-basic" 
                                            className="w-100 mt-1"
                                            label="Plazo" 
                                            variant="standard" 
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
                                        <label style={{display:'none'}}>{plazo}</label>
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Modalidad de pago:</label>
                                        <div className="modalidad-pago w-100 justify-content-center">
                                            <FormControlLabel
                                                label="Quincenal"
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '1rem', // Cambia el tamaño del texto del label
                                                    },
                                                }}
                                                control={
                                                    <Checkbox 
                                                        placeholder="Quincenal" 
                                                        color="success" 
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                        checked={modalidades.quincena}
                                                        onChange={() => handleCheckboxChange('quincena')}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                label="Mensual"
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '1rem', // Cambia el tamaño del texto del label
                                                    },
                                                }}
                                                control={
                                                    <Checkbox 
                                                        placeholder="Mensual" 
                                                        color="success" 
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                        checked={modalidades.mensual}
                                                        onChange={() => handleCheckboxChange('mensual')}
                                                    />
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Destino del prestamo */}
                                <div className="row row-cols-sm-2">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Destino del crédito:</label>
                                        <div className="modalidad-pago w-100 justify-content-center">
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '1rem', // Cambia el tamaño del texto del label
                                                    },
                                                }}
                                                label="Retanqueo"
                                                control={
                                                    <Checkbox 
                                                        placeholder="retanqueo" 
                                                        color="success" 
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                        checked={destinos.retanqueo}
                                                        onChange={() => handleCheckboxDestino('retanqueo')}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '1rem', // Cambia el tamaño del texto del label
                                                    },
                                                }}
                                                label="Recreación y turismo"
                                                control={
                                                    <Checkbox 
                                                        placeholder="turismo" 
                                                        color="success" 
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                        checked={destinos.turismo}
                                                        onChange={() => handleCheckboxDestino('turismo')}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                label="Otros"
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '1rem', // Cambia el tamaño del texto del label
                                                    },
                                                }}
                                                control={
                                                    <Checkbox 
                                                        placeholder="otros" 
                                                        color="success" 
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                        checked={destinos.otros}
                                                        onChange={() => handleCheckboxDestino('otros')}
                                                    />
                                                }
                                            />
                                        </div>
                                    </div>
                                    {destinos.otros !== false && (
                                    <div>
                                            <TextField 
                                                id="cualDestino"
                                                label="Cual" 
                                                variant="standard" 
                                                type="text"
                                                className="w-100"
                                                style={{textTransform:'uppercase'}}
                                                value={search.cualDestino && search.cualDestino.toUpperCase()}
                                                onChange={(e)=>handlerChangeSearch(e)}
                                                autoComplete="off"
                                                required
                                            />
                                        </div>
                                    )}
                                </div>

                            </div>
                            <hr className="my-1" />
                            <div>
                                <label className="fw-bold">DATOS DEL TRABAJADOR AFILIADO</label>

                                {/*  cedula y lugar de expedición */}
                                <div className="row row-cols-sm-2">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>NIT/Cédula:</label>
                                        <input
                                            id="cedula"
                                            type="text"
                                            className="form-control form-control-sm"
                                            /* placeholder="Buscar por NIT/Cédula" */
                                            min={0}
                                            value={search.cedula}
                                            onChange={(e)=>handleNumeric(e)}
                                            autoComplete="off"
                                            required
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Expedida en:</label>
                                        <input
                                            id="expedidaEn"
                                            value={search.expedidaEn}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            type="text"
                                            style={{textTransform:'uppercase'}}
                                            className="form-control form-control-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Nombre, email y estado civil */}
                                <div className="row row-cols-sm-3 mt-1">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Nombres y apellidos:</label>
                                        <input
                                            id="nombre"
                                            type="text"
                                            value={search.nombre}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            required
                                            style={{textTransform:'uppercase'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Email:</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={search.email}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            required
                                            style={{textTransform:'lowercase'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Estado civil:</label>
                                        <select
                                            id="estadoCivil"
                                            value={search.estadoCivil}
                                            className="form-select form-select-sm"
                                            onChange={(e) => handlerChangeSearch(e)}
                                            required
                                        >
                                            <option selected value="" disabled>
                                            -- Seleccione el estado civil --
                                            </option>
                                            <option id="SOLTERO" value='SOLTERO'>SOLTERO(A)</option>
                                            <option id="CASADO" value='CASADO'>CASADO(A)</option>
                                            <option id="SEPARADO" value='SEPARADO'>SEPARADO(A)</option>
                                            <option id="UNIONLIBRE" value='UNION LIBRE'>UNION LIBRE</option>
                                            <option id="DIVORCIADO" value='DIVORCIADO'>DIVORCIADO(A)</option>
                                            <option id="VIUDO" value='VIUDO'>VIUDO(A)</option>
                                        </select>
                                    </div>
                                </div>
                                {/* sexo, fecha de nacimiento, lugar de nacimiento y personas a cargo */}
                                <div className="row row-cols-sm-4 mt-1">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Genero:</label>
                                        <div className="modalidad-pago w-100 justify-content-center">
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '1rem', // Cambia el tamaño del texto del label
                                                    },
                                                }}
                                                label="Masculino"
                                                control={
                                                    <Checkbox 
                                                        placeholder="Masculino" 
                                                        color="success" 
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                        checked={sexos.masculino}
                                                        onChange={() => handlesexo('masculino')}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '1rem', // Cambia el tamaño del texto del label
                                                    },
                                                }}
                                                label="Femenino"
                                                control={
                                                    <Checkbox 
                                                        placeholder="Femenino" 
                                                        color="success" 
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                        checked={sexos.femenino}
                                                        onChange={() => handlesexo('femenino')}
                                                    />
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Fecha nacimiento:</label>
                                        <input
                                            id="fechaNacimiento"
                                            type="date"
                                            value={search.fechaNacimiento}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            required
                                            max={convertMaxDate} // Limita las fechas seleccionables
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Lugar nacimiento:</label>
                                        <input
                                            id="lugarNacimiento"
                                            type="text"
                                            style={{textTransform:'uppercase'}}
                                            value={search.lugarNacimiento}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Personas a Cargo:</label>
                                        <input
                                            id="personasAcargo"
                                            type="number"
                                            value={search.personasAcargo}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                {/* Direccion de residencia, ciudad y celular  */}
                                {typeClient === 'no asociado' &&
                                    <div className="row row-cols-sm-3 mt-1">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Dirección residencia:</label>
                                        <input
                                            id="direccion"
                                            type="text"
                                            style={{textTransform:'uppercase'}}
                                            value={search.direccion}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Ciudad:</label>
                                        <input
                                            id="ciudad"
                                            type="text"
                                            value={search.ciudad}
                                            style={{textTransform:'uppercase'}}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Celular:</label>
                                        <input
                                            id="celular"
                                            type="text"
                                            value={search.celular}
                                            onChange={(e)=>handleNumeric(e)}
                                            className="form-control form-control-sm"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                    </div>
                                }
                                {typeClient === 'asociado' &&
                                    <div className="row row-cols-sm-4 mt-1">
                                        <div className="d-flex flex-column align-items-start">
                                            <label>Dirección residencia:</label>
                                            <input
                                                id="direccion"
                                                type="text"
                                                style={{textTransform:'uppercase'}}
                                                value={search.direccion}
                                                onChange={(e)=>handlerChangeSearch(e)}
                                                className="form-control form-control-sm"
                                                required
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="d-flex flex-column align-items-start">
                                            <label>Ciudad:</label>
                                            <input
                                                id="ciudad"
                                                type="text"
                                                value={search.ciudad}
                                                style={{textTransform:'uppercase'}}
                                                onChange={(e)=>handlerChangeSearch(e)}
                                                className="form-control form-control-sm"
                                                required
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="d-flex flex-column align-items-start">
                                            <label>Celular:</label>
                                            <input
                                                id="celular"
                                                type="text"
                                                value={search.celular}
                                                onChange={(e)=>handleNumeric(e)}
                                                className="form-control form-control-sm"
                                                required
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="d-flex flex-column align-items-start">
                                                <label>Fecha afiliación:</label>
                                                <input
                                                    id="fechaAfiliacion"
                                                    type="date"
                                                    value={search.fechaAfiliacion}
                                                    onChange={(e)=>handlerChangeSearch(e)}
                                                    className="form-control form-control-sm"
                                                    required={typeClient === 'asociado' ? true : false}
                                                    max={new Date().toISOString().split("T")[0]} // Limita las fechas seleccionables
                                                    autoComplete="off"
                                                />
                                        </div>
                                    </div>
                                }

                                {/* Informacion de la agencia */}
                                <div className="row row-cols-sm-2 mt-1">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Empresa:</label>
                                        <input
                                            id="NombreAgencia"
                                            type="text"
                                            value={search.NombreAgencia}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            required
                                            disabled
                                            style={{textTransform:'uppercase'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Agencia:</label>
                                        <select
                                            ref={selectBranchRef}
                                            className="form-select form-select-sm w-100"
                                            required
                                            onChange={(e)=>setAgencia(JSON.parse(e.target.value))}
                                        >
                                            <option selected value='' disabled>
                                            -- Seleccione la Agencia --
                                            </option>
                                            {agencias
                                            .sort((a, b) => a.id - b.id)
                                            .map((elem) => (
                                                <option id={elem.id} value={JSON.stringify(elem.description)}>
                                                {elem.rowId + " - " + elem.description}
                                                </option>
                                            ))}
                                        </select>
                                        {/* <input
                                            id="cityAgencia"
                                            type="text"
                                            value={search.cityAgencia}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            required
                                            style={{textTransform:'uppercase'}}
                                            autoComplete="off"
                                        /> */}
                                    </div>
                                </div>

                                {/* informacion cuenta bancaria */}
                                <div className="row row-cols-sm-3 mt-1">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Número cuenta bancaria:</label>
                                        <input
                                            id="cuentaBancaria"
                                            type="text"
                                            value={search.cuentaBancaria}
                                            onChange={(e)=>handleCuenta(e)}
                                            className="form-control form-control-sm"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Tipo cuenta:</label>
                                        <div className="modalidad-pago w-100 justify-content-center">
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '1rem', // Cambia el tamaño del texto del label
                                                    },
                                                }}
                                                label="Cta. Ahorros"
                                                control={
                                                    <Checkbox 
                                                        placeholder="Cta. Ahorros" 
                                                        color="success" 
                                                        checked={cuentas.ahorros}
                                                        onChange={() => handleCuentaBancaria('ahorros')}
                                                        className="mt-0 t-0"
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '1rem', // Cambia el tamaño del texto del label
                                                    },
                                                }}
                                                label="Cta. Corriente"
                                                control={
                                                    <Checkbox 
                                                        placeholder="Cta. Corriente" 
                                                        color="success" 
                                                        checked={cuentas.corriente}
                                                        onChange={() => handleCuentaBancaria('corriente')}
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                    />
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Entidad bancaria:</label>
                                        <input
                                            id="entidadBancaria"
                                            type="text"
                                            value={search.entidadBancaria}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            required
                                            style={{textTransform:'uppercase'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                        </div>
                        <hr className="my-1" />
                        <div>
                            <label className="fw-bold">DOCUMENTOS QUE DEBES ADJUNTAR</label>
                            <div className="row row-cols-sm-2 mt-1">
                                <div className="d-flex flex-column align-items-start">
                                    <label>Simulador del crédito</label>
                                    <input
                                        id="simulador"
                                        type="file"
                                        required
                                        accept=".png,.jpg,.jpeg,.txt,.pdf"
                                        onChange={(e)=>handleFileChange('simuladorCredito',e)}
                                        style={{backgroundColor:'#f3f3f3'}}
                                        className="form-control form-control-sm border border-5 rounded-3"
                                    />
                                </div>
                                <div className="d-flex flex-column align-items-start">
                                    <label className="">Relacción de cuentas y terceros</label>
                                    <input
                                        id="relacion"
                                        type="file"
                                        accept=".png,.jpg,.jpeg,.txt,.pdf"
                                        required
                                        style={{backgroundColor:'#f3f3f3'}}
                                        className="form-control form-control-sm border border-5 rounded-3"
                                        onChange={(e)=>handleFileChange('relacionCuentas',e)}
                                    />
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                        <div className="d-flex flex-row gap-3 mb-2">
                        <button
                            type="submit"
                            className="bt-envio fw-bold w-100"
                            style={{fontSize:13}}
                        >
                            {enviando ? <strong>REGISTRANDO... <GiSandsOfTime /></strong>:'REGISTRAR'}
                        </button>
                        <button
                            type="button"
                            className="bt-cancelar fw-bold w-100"
                            style={{fontSize:13}}
                        >
                            CANCELAR
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}