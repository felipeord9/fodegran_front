import { useState , useRef , useEffect} from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Navbar from "../../components/Navbar";
import { Modal, Button } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';
import { GiSandsOfTime } from "react-icons/gi";
import { verifyToken, addSignature , envioEstudioCredito } from '../../services/creditosServices';
import Webcam from 'react-webcam';
import './styles.css';

const CurrencyInput = ({cantidad}) => {
  
    return (
      <TextField
        id="standard-basic" 
        label="Valor solicitado"
        value={new Intl.NumberFormat('de-DE').format(cantidad)}
        className="w-100 mt-1 me-3"
        disabled
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          inputMode: 'numeric',
        }}
        variant="standard"
        autoComplete="off"
        required
      />
    );
};

export default function FirmaEmpleado (){

    //constante para guardar el valor del parametro
    const { token } = useParams();
    const webcamRef = useRef(null);
    const [previewPhoto, setPreviewPhoto] = useState(null); // Foto en previsualización

    useEffect(()=>{
        verifyToken(token)
        .then(({data})=>{
          setSearch(data);
        })
        .catch(()=>{
          setSearch({})
          Swal.fire({
            icon:'warning',
            title:'¡ATENCIÓN!',
            text:'Ha ocurrido un error al momento de abrir el vínculo. Vuelve a intentarlo, si el problema persiste comunícate con la auxiliar del fondo de empleados.',
            confirmButtonText:'OK',
            confirmButtonColor:'red'
          })
          .then(()=>{
              window.location.href = "about:blank"
          })
        })
    },[])

    const [search, setSearch] = useState({});

    const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal

    const sigCanvas = useRef(null); // Referencia al canvas de la firma

    // Funciones para abrir y cerrar el modal
    const handleClose = () => setShowModal(false);

    // Limpia el canvas de la firma
    const clearSignature = () => {
        sigCanvas.current.clear();
    };

    const handlerChangeSearch = (e) => {
        const { id, value } = e.target;
        console.log(value);
        setSearch({
          ...search,
          [id]: value,
        });
    };

    //constante de envio
    const [enviando, setEnviando] = useState(false);

    //Accion de submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Muestra la barra de carga
        let timerInterval;
        Swal.fire({
            title: 'Registrando...',
            text: 'Por favor, espera mientras se registra la firma en la solicitud...',
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

        setEnviando(true)
        const signature = sigCanvas.current.toDataURL('image/png');
        const body = {
            id: search.id,
            estado: 'Estudio 1',
            firmaAsociado: signature
        }
        addSignature(token, body)
        .then(()=>{
            envioEstudioCredito(body)
            .then(()=>{
                Swal.fire({
                    icon:'success',
                    title:'¡Felicidades!',
                    text:'Se ha firmado la solicitud de manera satisfactoria',
                    timer:5000,
                    showConfirmButton:false,
                    showCancelButton:false,
                })
                .then(()=>{
                    handleClear()
                    window.location.href = "about:blank"
                })
            })
            .catch(()=>{
                setEnviando(false)
                console.log('ERROR')
            })
        })
        .catch((error)=>{
            setEnviando(false)
            Swal.fire({
                icon:'warning',
                title:'¡ERROR!',
                text:'Ha ocurrido un error al momento hacer la firma de la solicitud. intenta de nuevo. Si el problema persiste informanos vía whatsapp.',
                showConfirmButton:true,
                confirmButtonColor: '#0101b5',
                showCancelButton:false
            })
        })
    }

    const [nameField, setNameField] = useState(null);
    const [activeField, setActiveField] = useState(null);

    const [photos, setPhotos] = useState({
        photoUser: null,
        frontCp: null,
        backCp: null,
        frontTp: null,
        backTp: null,
        frontCauth: null,
        backCauth: null,
    });

    const handleClear = () => {
        setSearch({})
        setEnviando(false)
    }

    const closeModal = () => {
        setShowModal(false);
        setNameField(null);
        setActiveField(null);
        setPreviewPhoto(null); // Resetear previsualización
    };

    const discardPhoto = () => {
        setPreviewPhoto(null); // Mostrar previsualización
        setNameField(null);
    };

    const savePhoto = () => {
        setPhotos((prevPhotos) => ({
          ...prevPhotos,
          [activeField]: previewPhoto,
        }));
        closeModal();
    };

    const capturePhoto = () => {
        const photo = webcamRef.current.getScreenshot();
        setPreviewPhoto(photo); // Mostrar previsualización
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setPreviewPhoto(event.target.result); // Mostrar previsualización
          };
          reader.readAsDataURL(file);
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
                        <div className="bg-light rounded shadow-sm p-2 mb-3">
                        <div className="d-flex flex-column gap-1">
                            <div>

                                <label className="fw-bold">DATOS DEL CRÉDITO</label>

                                {/* Valor del prestamo, plazo y modalidad de pago */}
                                <div className="row row-cols-sm-3">
                                    <div>
                                        <CurrencyInput cantidad={search.valorSolicitado}/>
                                    </div>
                                    <div>
                                        <TextField 
                                            id="standard-basic" 
                                            className="w-100 mt-1"
                                            label="Plazo" 
                                            variant="standard" 
                                            value={search.plazo}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                                endAdornment: <InputAdornment position="end">meses</InputAdornment>,
                                                inputProps: { maxLength: 2 }, // Restringir la longitud máxima a 1 dígito
                                                inputMode: 'numeric'
                                            }}
                                            disabled
                                            autoComplete="off"
                                        />
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
                                                disabled
                                                control={
                                                    <Checkbox 
                                                        placeholder="Quincenal" 
                                                        color="success" 
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                        checked={search.modalidad === 'quincena' ? true : false}
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
                                                disabled
                                                control={
                                                    <Checkbox 
                                                        placeholder="Mensual" 
                                                        color="success" 
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                        checked={search.modalidad === 'mensual' ? true : false}
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
                                                disabled
                                                label="Educación"
                                                control={
                                                    <Checkbox 
                                                        placeholder="educacion" 
                                                        color="success" 
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                        checked={search.destinoCredito === 'educacion' && true}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '1rem', // Cambia el tamaño del texto del label
                                                    },
                                                }}
                                                disabled
                                                label="Recreación y turismo"
                                                control={
                                                    <Checkbox 
                                                        placeholder="turismo" 
                                                        color="success" 
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                        checked={search.destinoCredito === 'turismo' && true}
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
                                                disabled
                                                control={
                                                    <Checkbox 
                                                        placeholder="otros" 
                                                        color="success" 
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                        checked={search.destinoCredito === 'otros' && true}
                                                    />
                                                }
                                            />
                                        </div>
                                    </div>
                                    {search.destinoCredito === 'otros' && (
                                    <div>
                                            <TextField 
                                                id="cualDestino"
                                                label="Cual" 
                                                variant="standard" 
                                                type="text"
                                                disabled
                                                className="w-100"
                                                value={search.descipDestino}
                                                autoComplete="off"
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
                                            type="number"
                                            className="form-control form-control-sm"
                                            disabled
                                            value={search.rowId && search.rowId}
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Expedida en:</label>
                                        <input
                                            id="expedidaEn"
                                            disabled
                                            value={search.lugarExpedicion && search.lugarExpedicion.toUpperCase()}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            type="text"
                                            className="form-control form-control-sm"
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
                                            disabled
                                            value={search.nombre && search.nombre.toUpperCase()}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Email:</label>
                                        <input
                                            id="email"
                                            type="email"
                                            disabled
                                            value={search.correo}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Estado civil:</label>
                                        <select
                                            id="estadoCivil"
                                            disabled
                                            value={search.estadoCivil}
                                            className="form-select form-select-sm"
                                            onChange={(e) => handlerChangeSearch(e)}
                                        >
                                            <option selected value="" disabled>
                                            -- Seleccione el estado civil --
                                            </option>
                                            <option id="Soltero" value='Soltero'>Soltero(a)</option>
                                            <option id="Casado" value='Casado'>Casado(a)</option>
                                            <option id="Conviviente" value='Conviviente civil'>Conviviente civil</option>
                                            <option id="Separado" value='Separado'>Separado(a) judicialmente</option>
                                            <option id="Divorciado" value='Divorciado'>Divorciado(a)</option>
                                            <option id="Viudo" value='Viudo'>Viudo(a)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* sexo, fecha de nacimiento, lugar de nacimiento y personas a cargo */}
                                <div className="row row-cols-sm-4 mt-1">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Sexo:</label>
                                        <div className="modalidad-pago w-100 justify-content-center">
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '1rem', // Cambia el tamaño del texto del label
                                                    },
                                                }}
                                                label="Masculino"
                                                disabled
                                                control={
                                                    <Checkbox 
                                                        placeholder="Masculino" 
                                                        color="success" 
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                        checked={search.sexo === 'masculino' && true}
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '1rem', // Cambia el tamaño del texto del label
                                                    },
                                                }}
                                                disabled
                                                label="Femenino"
                                                control={
                                                    <Checkbox 
                                                        placeholder="Femenino" 
                                                        color="success" 
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                        checked={search.sexo === 'femenino' && true}
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
                                            disabled
                                            value={search.fechaNacimiento && new Date(search.fechaNacimiento).toISOString().split("T")[0]}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Lugar nacimiento:</label>
                                        <input
                                            id="lugarNacimiento"
                                            type="text"
                                            disabled
                                            value={search.lugarNacimiento && search.lugarNacimiento.toUpperCase()}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Personas a Cargo:</label>
                                        <input
                                            id="personasAcargo"
                                            type="number"
                                            disabled
                                            value={search.personasAcargo}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                {/* Direccion de residencia, ciudad y celular  */}
                                <div className="row row-cols-sm-3 mt-1">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Dirección residencia:</label>
                                        <input
                                            id="direccionResidencia"
                                            type="text"
                                            disabled
                                            value={search.direccionResidencia && search.direccionResidencia.toUpperCase()}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Ciudad:</label>
                                        <input
                                            id="ciudadResidencia"
                                            type="text"
                                            disabled
                                            value={search.ciudadResidencia && search.ciudadResidencia.toUpperCase()}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Celular:</label>
                                        <input
                                            id="celularResidencia"
                                            type="text"
                                            disabled
                                            value={search.celularResidencia}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                {/* Informacion de la agencia */}
                                <div className="row row-cols-sm-2 mt-1">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Nombre agencia:</label>
                                        <input
                                            id="nombreAgencia"
                                            type="text"
                                            disabled
                                            value={search.nombreAgencia && search.nombreAgencia.toUpperCase()}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Ciudad Agencia:</label>
                                        <input
                                            id="ciudadAgencia"
                                            type="text"
                                            disabled
                                            value={search.ciudadAgencia && search.ciudadAgencia.toUpperCase()}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                {/* informacion cuenta bancaria */}
                                <div className="row row-cols-sm-3 mt-1">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Número cuenta bancaria:</label>
                                        <input
                                            id="cuentaBancaria"
                                            type="number"
                                            disabled
                                            value={search.cuentaBancaria}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
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
                                                disabled
                                                control={
                                                    <Checkbox 
                                                        placeholder="Cta. Ahorros" 
                                                        color="success" 
                                                        checked={search.tipoCuenta === 'ahorros' && true}
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
                                                disabled
                                                control={
                                                    <Checkbox 
                                                        placeholder="Cta. Corriente" 
                                                        color="success" 
                                                        checked={search.tipoCuenta === 'corriente' && true}
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
                                            disabled
                                            value={search.entidadBancaria && search.entidadBancaria.toUpperCase()}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                        </div>
                        <div className="d-flex flex-row gap-3 mb-3">
                        <button
                            className="bt-envio fw-bold w-100"
                            style={{fontSize:13}}
                            onClick={(e)=>setShowModal(!showModal)}
                        >
                            {enviando ? <strong>FIRMANDO... <GiSandsOfTime /></strong>:'FIRMAR'}
                        </button>
                        {/* Modal con el cuadro de firma */}
                        <Modal show={showModal} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Firma Electrónica</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="signature-pad">
                                <div 
                                    className="d-flex w-100 h-100 signature-pad" 
                                    style={{ 
                                        border: '1px solid #ccc', 
                                        padding: '10px' , 
                                    }}
                                >
                                    <SignatureCanvas
                                        ref={sigCanvas}
                                        penColor="black"
                                        canvasProps={{
                                            className: 'w-100 ',
                                            height: 200,
                                            style: { background: 'white', borderRadius: '5px' },
                                        }}
                                    />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={clearSignature}>
                                    Borrar
                                </Button>
                                <Button variant="success" onClick={(e)=>handleSubmit(e)}>
                                    {enviando ? <strong>FIRMANDO... <GiSandsOfTime /></strong>:'FIRMAR'}
                                </Button>
                                {/* <Button variant="danger" onClick={handleClose}>
                                    Cerrar
                                </Button> */}
                            </Modal.Footer>
                        </Modal>
                        {/* <Modal show={showModal} onHide={closeModal} centered>
                            <Modal.Header closeButton>
                            <Modal.Title>Capturar Foto: {nameField}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            {!previewPhoto ? (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{
                                width: 1280,
                                height: 720,
                                facingMode: "user", // 'user' para camara delante O 'enviroment' para la cámara trasera
                                }}
                                style={{ width: '100%', height: '100%', border: '2px solid #ccc', borderRadius: '10px' }}
                            />
                            ):(
                            <img
                                src={previewPhoto}
                                alt="Previsualización"
                                style={{ width: '100%', height: '100%', border: '2px solid #ccc', borderRadius: '10px' }}
                            />
                            )}
                            </Modal.Body>
                            <Modal.Footer>
                            {!previewPhoto ? (
                            <>
                                <button
                                onClick={capturePhoto}
                                style={{
                                    padding: "10px 20px",
                                    fontSize: "16px",
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                }}
                                >
                                Capturar
                                </button>
                                <label
                                style={{
                                    padding: "10px 20px",
                                    fontSize: "16px",
                                    backgroundColor: "#6c757d",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                                >
                                Subir
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUpload}
                                    style={{ display: "none" }}
                                />
                                </label>
                            </>
                            ) : (
                            <>
                                <button
                                onClick={savePhoto}
                                style={{
                                    padding: "10px 20px",
                                    fontSize: "16px",
                                    backgroundColor: "#28a745",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    marginRight: "10px",
                                }}
                                >
                                Guardar
                                </button>
                                <button
                                onClick={() => discardPhoto()}
                                style={{
                                    padding: "10px 20px",
                                    fontSize: "16px",
                                    backgroundColor: "#dc3545",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                }}
                                >
                                Descartar
                                </button>
                            </>
                            )} 
                            </Modal.Footer>
                        </Modal> */}
                        </div>
                </div>
            </div>
        </div>
    )
}