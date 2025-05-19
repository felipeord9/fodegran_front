import { useState , useContext , useEffect} from "react";
import TextField from '@mui/material/TextField';
import { useParams , useNavigate } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import Navbar from "../../components/NavBitacora";
import { GiSandsOfTime } from "react-icons/gi";
import AuthContext from "../../context/authContext";
import { verifyTokenWhithId , findOneCredito, updateCredito } from '../../services/creditosServices'
import { createEstudioCredito , mailAuxiliar } from '../../services/estudioCreditoService';
import Swal from "sweetalert2";
import './styles.css';

export default function EstudioCredito (){
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    //constante para guardar el valor del parametro
    const { token } = useParams();

    useEffect(()=>{
        if(user && (user.role === 'estudio' || user.role === 'admin')){
        verifyTokenWhithId(token)
            .then(({data})=>{
                setSearch(data);
            })
            .catch(()=>{
                findOneCredito(token)
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
            })
        }else{
            window.location.href = "about:blank"    
        }
    },[])

    const [ search, setSearch ] = useState({});

    const [ infoEmpresa, setInfoEmpresa ] = useState({
        FechaIngreso:'',
        salarioBasico:'',
        cesantias:'',
        primas:'',
        vacaciones:'',
        libranza:'',
        otros:'',
        banco:'',
        numeroCuenta:'',
        monto:'',
        totalDescuentoEmpresa:'',
    })

    const monto = (infoEmpresa.salarioBasico !== '') ? ((infoEmpresa.salarioBasico.replace(/\./g, '') * 8) / 100) : 0 ;
    const total= (infoEmpresa.salarioBasico !== '') ? ( Number(monto) + Number(infoEmpresa.libranza.replace(/\./g, '')) + Number(infoEmpresa.otros.replace(/\./g, ''))) : 0 ;

    const handlerChangeSearch = (e) => {
        const { id, value } = e.target;
        console.log(value);
        setSearch({
          ...search,
          [id]: value,
        });
    };

    const handlerChangeInfoEmpresa = (e) => {
        const { id, value } = e.target;
        console.log(value);
        setInfoEmpresa({
          ...infoEmpresa,
          [id]: value,
        });
    };

    //constante de envio
    const [enviando, setEnviando] = useState(false);

    //Accion de submit
    const handleSubmit = (e) => {
        e.preventDefault();
        let numero = total
        const decimal = numero % 1; // Extrae la parte decimal
      
        if (decimal >= 0.5) {
          numero = Math.ceil(numero); // Aproxima al siguiente si es mayor o igual a 0.5
        } else {
          numero = Math.floor(numero); // Aproxima al anterior si es menor a 0.5
        }
        if(infoEmpresa.banco !== search.entidadBancaria || infoEmpresa.numeroCuenta !== search.cuentaBancaria){
            Swal.fire({
                icon:'warning',
                title:'¡ATENCIÓN!',
                text:`El número de cuenta bancaria y/o la entidad bancaria son diferentes a los registrados en la solicitud. 
                - No. cuenta en solicitud: ${ search.cuentaBancaria} 
                - Entidad bancaria en solicitud: ${search.entidadBancaria}
                ¿Desea cambiarlos?`,
                showConfirmButton: true,
                showDenyButton:'true',
                confirmButtonText: 'Cambiar',
                denyButtonText:'Descartar',
                confirmButtonColor:'blue',
                denyButtonColor:'red'
            }).then(({isConfirmed,isDenied})=>{
                // Muestra la barra de carga
                let timerInterval;
                Swal.fire({
                    title: 'Registrando...',
                    text: 'Por favor, espera mientras se registra el estudio de crédito...',
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
                if(isConfirmed){
                    const body = {
                        FechaIngreso: new Date(infoEmpresa.FechaIngreso),
                        salarioBasico: infoEmpresa.salarioBasico.replace(/\./g, ''),
    
                        cesantias: infoEmpresa.cesantias.replace(/\./g, ''),
                        primas: infoEmpresa.primas.replace(/\./g, ''),
                        vacaciones: infoEmpresa.vacaciones.replace(/\./g, ''),
                        libranza: infoEmpresa.libranza.replace(/\./g, ''),
                        otrosDescuentos: infoEmpresa.otros.replace(/\./g, ''),
                        banco: infoEmpresa.banco.toUpperCase(),
                        numeroCuenta: infoEmpresa.numeroCuenta,
                        totalDescuentoEmpresa: numero,
    
                        createdAt: new Date(),
                        creditoId: search.id,
                    }
                    createEstudioCredito(body)
                        .then(({data})=>{
                            const item = {
                                id: data.id
                            }
                            const update = {
                                estado: 'Estudio 2',
                                cuentaBancaria: infoEmpresa.numeroCuenta,
                                entidadBancaria: infoEmpresa.banco.toUpperCase(),
                            }
                            updateCredito(search.id, update);
                            mailAuxiliar(item)
                            .then(()=>{
                                Swal.fire({
                                    icon:'success',
                                    title:'¡Felicidades!',
                                    text:'Se ha registrado el estudio de crédito de manera satisfactoria',
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
                                Swal.fire({
                                    icon:'warning',
                                    title:'¡ERROR!',
                                    text:'Ha ocurrido un error al momento de generar el estudio de crédito. intenta de nuevo. Si el problema persiste informanos vía whatsapp.',
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
                                title:'¡ERROR!',
                                text:'Ha ocurrido un error al momento de generar el estudio de crédito. intenta de nuevo. Si el problema persiste informanos vía whatsapp.',
                                showConfirmButton:true,
                                confirmButtonColor: '#0101b5',
                                showCancelButton:false
                            })
                        })
                }else if(isDenied){
                    const body = {
                        FechaIngreso: new Date(infoEmpresa.FechaIngreso),
                        salarioBasico: infoEmpresa.salarioBasico.replace(/\./g, ''),
    
                        cesantias: infoEmpresa.cesantias.replace(/\./g, ''),
                        primas: infoEmpresa.primas.replace(/\./g, ''),
                        vacaciones: infoEmpresa.vacaciones.replace(/\./g, ''),
                        libranza: infoEmpresa.libranza.replace(/\./g, ''),
                        otrosDescuentos: infoEmpresa.otros.replace(/\./g, ''),
                        banco: search.entidadBancaria.toUpperCase(),
                        numeroCuenta: search.cuentaBancaria,
                        totalDescuentoEmpresa: numero,
    
                        createdAt: new Date(),
                        creditoId: search.id,
                    }
                    createEstudioCredito(body)
                        .then(({data})=>{
                            const item = {
                                id: data.id
                            }
                            const update = {
                                estado: 'Estudio 2'
                            }
                            updateCredito(search.id, update);
                            mailAuxiliar(item)
                            .then(()=>{
                                Swal.fire({
                                    icon:'success',
                                    title:'¡Felicidades!',
                                    text:'Se ha registrado el estudio de crédito de manera satisfactoria',
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
                                Swal.fire({
                                    icon:'warning',
                                    title:'¡ERROR!',
                                    text:'Ha ocurrido un error al momento de generar el estudio de crédito. intenta de nuevo. Si el problema persiste informanos vía whatsapp.',
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
                                title:'¡ERROR!',
                                text:'Ha ocurrido un error al momento de generar el estudio de crédito. intenta de nuevo. Si el problema persiste informanos vía whatsapp.',
                                showConfirmButton:true,
                                confirmButtonColor: '#0101b5',
                                showCancelButton:false
                            })
                        })
                }
            })
        }else{
            // Muestra la barra de carga
            let timerInterval;
            Swal.fire({
                title: 'Registrando...',
                text: 'Por favor, espera mientras se registra el estudio de crédito...',
                timer: 6000,
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
                FechaIngreso: new Date(infoEmpresa.FechaIngreso),
                salarioBasico: infoEmpresa.salarioBasico.replace(/\./g, ''),

                cesantias: infoEmpresa.cesantias.replace(/\./g, ''),
                primas: infoEmpresa.primas.replace(/\./g, ''),
                vacaciones: infoEmpresa.vacaciones.replace(/\./g, ''),
                libranza: infoEmpresa.libranza.replace(/\./g, ''),
                otrosDescuentos: infoEmpresa.otros.replace(/\./g, ''),
                banco: infoEmpresa.banco.toUpperCase(),
                numeroCuenta: infoEmpresa.numeroCuenta,
                totalDescuentoEmpresa: numero,

                createdAt: new Date(),
                creditoId: search.id,
            }
            createEstudioCredito(body)
                .then(({data})=>{
                    const item = {
                        id: data.id
                    }
                    const update = {
                        estado: 'Estudio de crédito Auxiliar'
                    }
                    updateCredito(search.id, update);
                    mailAuxiliar(item)
                    .then(()=>{
                        Swal.fire({
                            icon:'success',
                            title:'¡Felicidades!',
                            text:'Se ha registrado el estudio de crédito de manera satisfactoria',
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
                        Swal.fire({
                            icon:'warning',
                            title:'¡ERROR!',
                            text:'Ha ocurrido un error al momento de generar el estudio de crédito. intenta de nuevo. Si el problema persiste informanos vía whatsapp.',
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
                        title:'¡ERROR!',
                        text:'Ha ocurrido un error al momento de generar el estudio de crédito. intenta de nuevo. Si el problema persiste informanos vía whatsapp.',
                        showConfirmButton:true,
                        confirmButtonColor: '#0101b5',
                        showCancelButton:false
                    })
                })
        }
    };

    const handleClear = () => {
        setSearch({});
        setEnviando(false);
        setInfoEmpresa({
            FechaIngreso:'',
            salarioBasico:'',
            cesantias:'',
            primas:'',
            vacaciones:'',
            libranza:'',
            otros:'',
            banco:'',
            numeroCuenta:'',
            monto:'',
            totalDescuentoEmpresa:'',
        });
    };

    
    const formatNumber = (value) => {
        if (!value) return '';
        const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return formattedValue;
    };

    const parseNumber = (value) => {
        return value.replace(/\./g, '');
    };

    const handleChangeNumber = (e) => {
        const { id, value } = e.target;
    
        if (/^\d*\.?\d*\.?\d*$/.test(value)) {
          const numericValue = parseNumber(value);
          setInfoEmpresa({
            ...infoEmpresa,
            [id]: formatNumber(numericValue)
            })
        }else{
            setInfoEmpresa({
                ...infoEmpresa,
                [id]: ''
            })
        }
    };

    const handleCuenta = (e) => {
        let { id, value } = e.target;
        // ✅ Permitir solo números
        value = value.replace(/[^0-9]/g, '');
        if (/^\d{0,24}$/.test(value)) {
            /* setPlazo(inputValue); */
            setInfoEmpresa({
                ...infoEmpresa,
                numeroCuenta: value
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
                    <h1 className="text-center fs-5 fw-bold pt-5 mt-1" style={{color:'blue'}}>Estudio de crédito</h1>
                    <form className="" onSubmit={handleSubmit}>
                        <div className=" rounded shadow-sm p-2 mb-3">
                        <div className="d-flex flex-column gap-1" style={{backgroundColor:'whitesmoke', borderRadius:5}}>
                            <div>
                                <label className="fw-bold">DATOS DEL CRÉDITO</label>

                                <div className="row row-cols-sm-3">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>NIT/Cédula:</label>
                                        <input
                                            id="cedula"
                                            type="number"
                                            className="form-control form-control-sm"
                                            min={0}
                                            disabled
                                            value={search.rowId}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Expedida en:</label>
                                        <input
                                            id="expedidaEn"
                                            value={search.lugarExpedicion}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            type="text"
                                            disabled
                                            className="form-control form-control-sm"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Nombres y apellidos:</label>
                                        <input
                                            id="nombre"
                                            type="text"
                                            value={search.nombre}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="row row-cols-sm-3">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Empresa:</label>
                                        <input
                                            id="nombre"
                                            type="text"
                                            value='EL GRAN LANGOSTINO S.A.S'/* {search.nombreAgencia} */
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            disabled
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Ciudad:</label>
                                        <input
                                            id="nombre"
                                            type="text"
                                            value={search.ciudadAgencia}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            disabled
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Fecha afiliación:</label>
                                        <input
                                            id="nombre"
                                            type="Date"
                                            value={search.nombre}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            disabled
                                        />
                                    </div>
                                </div>

                            </div>
                            <hr className="my-1" />
                        </div>
                            <div>
                                <label className="fw-bold">INFORMACIÓN EMPRESA</label>

                                {/* informacion de la empresa */}
                                <div className="row row-cols-sm-2 mt-1 mb-2">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Fecha de ingreso:</label>
                                        <input
                                            id="FechaIngreso"
                                            type="date"
                                            value={infoEmpresa.FechaIngreso}
                                            onChange={(e)=>handlerChangeInfoEmpresa(e)}
                                            className="form-control form-control-sm"
                                            required
                                            max={new Date().toISOString().split("T")[0]}
                                            disabled={user.role==='auxiliar'}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <TextField
                                            id="salarioBasico" 
                                            label="Salario básico"
                                            value={infoEmpresa.salarioBasico}
                                            className="w-100 me-3"
                                            onChange={(e)=>handleChangeNumber(e)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                inputMode: 'numeric',
                                            }}
                                            variant="standard"
                                            autoComplete="off"
                                            required
                                            disabled={user.role==='auxiliar' && true}
                                        />
                                    </div>
                                    
                                </div>

                                <hr className="mt-1 mb-1" />

                                <label className="fw-bold mt-1">INFORMACIÓN DEL PERIODO ACTUAL CON EL GRAN LANGOSTINO</label>

                                {/* Informacion del periodo actual con el gran langostino */}
                                <div className="row row-cols-sm-4 mt-1">
                                    
                                    <div className="d-flex flex-column align-items-start">
                                        <TextField
                                            id="cesantias" 
                                            label="Cesantias"
                                            value={infoEmpresa.cesantias}
                                            className="w-100 me-3"
                                            onChange={(e)=>handleChangeNumber(e)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                inputMode: 'numeric',
                                            }}
                                            variant="standard"
                                            autoComplete="off"
                                            required
                                            disabled={user.role==='auxiliar' && true}
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <TextField
                                            id="primas" 
                                            label="Primas"
                                            value={infoEmpresa.primas}
                                            className="w-100 me-3"
                                            onChange={(e)=>handleChangeNumber(e)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                inputMode: 'numeric',
                                            }}
                                            disabled={user.role==='auxiliar' && true}
                                            variant="standard"
                                            autoComplete="off"
                                            required
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <TextField
                                            id="vacaciones" 
                                            label="Vacaciones"
                                            value={infoEmpresa.vacaciones}
                                            className="w-100 me-3"
                                            onChange={(e)=>handleChangeNumber(e)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                inputMode: 'numeric',
                                            }}
                                            variant="standard"
                                            autoComplete="off"
                                            required
                                            disabled={user.role==='auxiliar' && true}
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <TextField
                                            id="libranza" 
                                            label="Libranza"
                                            value={infoEmpresa.libranza}
                                            className="w-100 me-3"
                                            onChange={(e)=>handleChangeNumber(e)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                inputMode: 'numeric',
                                            }}
                                            variant="standard"
                                            autoComplete="off"
                                            required
                                            disabled={user.role==='auxiliar' && true}
                                        />
                                    </div>
                                </div>
                                    <div className="row row-cols-sm-4 mt-1 mb-3">
                                        <div className="d-flex flex-column align-items-start">
                                            <TextField
                                                id="otros" 
                                                label="Otros"
                                                value={infoEmpresa.otros}
                                                className="w-100 me-3"
                                                onChange={(e)=>handleChangeNumber(e)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                    inputMode: 'numeric',
                                                }}
                                                variant="standard"
                                                autoComplete="off"
                                                required
                                            />
                                        </div>
                                        <div className="d-flex flex-column align-items-start">
                                            <label>Banco:</label>
                                            <input
                                                id="banco"
                                                type="text"
                                                value={infoEmpresa.banco}
                                                onChange={(e)=>handlerChangeInfoEmpresa(e)}
                                                style={{textTransform:'uppercase'}}
                                                className="form-control form-control-sm"
                                                required
                                            />
                                        </div>
                                        <div className="d-flex flex-column align-items-start">
                                            <label>Número de cuenta:</label>
                                            <input
                                                id="numeroCuenta"
                                                type="text"
                                                value={infoEmpresa.numeroCuenta}
                                                onChange={(e)=>handleCuenta(e)}
                                                className="form-control form-control-sm"
                                                required
                                            />
                                        </div>
                                        
                                        <div className="d-flex flex-column align-items-start">
                                            <TextField
                                                id="totalDescuentoEmpresa" 
                                                label="Total descuento incluido Seg. Social"
                                                value={total.toLocaleString("es-ES")}
                                                className="w-100 me-3"
                                                /* onChange={(e)=>handlerChangeInfoEmpresa(e)} */
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                    inputMode: 'numeric',
                                                }}
                                                variant="standard"
                                                autoComplete="off"
                                                disabled
                                            />
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
                            onClick={(e)=>(handleClear(),navigate('/bitacora/creditos'))}
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