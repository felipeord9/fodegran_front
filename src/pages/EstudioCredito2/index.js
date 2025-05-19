import { updateEstudioCredito , mailComite , verifyToken , findEstudioWithCredito } from '../../services/estudioCreditoService';
import { mailPresidente } from '../../services/creditosServices';
import { mailGerencia } from '../../services/creditosServices';
import { useState , useContext , useEffect} from "react";
import { useParams , useNavigate } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { GiSandsOfTime } from "react-icons/gi";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Navbar from "../../components/NavBitacora";
import AuthContext from "../../context/authContext";
import Swal from "sweetalert2";
import './styles.css';

export default function EstudioCredito2 (){
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    //constante para guardar el valor del parametro
    const { token } = useParams();

    useEffect(()=>{
        if(user && (user.role === 'auxiliar' || user.role === 'admin')){
        verifyToken(token)
            .then(({data})=>{
                setSearch(data);
            })
            .catch(()=>{
                findEstudioWithCredito(token)
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

    const [ infoFondo, setInfoFondo ] = useState({
        aporteTotalObligatorio:'',
        saldoAhorro:'',
        valorInicial:'',
        fechaDesembolso:'',
        saldoFecha:'',
        cuotaMensual:'',
        totalAportesMensuales:'',
        aporteVoluntario:'',
        tasa:'',
        otros:'',
        totalDescuentoFondo:'',
    });

    const total= (infoFondo.cuotaMensual !== '') ? ( Number(infoFondo.cuotaMensual.replace(/\./g, '')) + Number(infoFondo.totalAportesMensuales.replace(/\./g, '')) + Number(infoFondo.aporteVoluntario.replace(/\./g, '')) + Number(infoFondo.otros.replace(/\./g, ''))) : 0 ;

    const [ prestamoFondo, setPrestamoFondo ] = useState(null);

    //constante de envio
    const [enviando, setEnviando] = useState(false);

    //variables del genero
    const [posibilities, setPosibilities] = useState({
        si: false,
        no: false,
    });
    //logica del llenado de los checkbox
    const handleFondo = (type) => {
        setPosibilities({
            si: type === 'si' ? true : false,
            no: type === 'no' ? true : false,
        });
        setInfoFondo({
            ...infoFondo,
            valorInicial:'',
            fechaDesembolso:'',
            saldoFecha:'',
            cuotaMensual:'',
            totalAportesMensuales:'',
            aporteVoluntario:'',
            otros:'',
            totalDescuentoFondo:'',
        });
        setPrestamoFondo(type)
    };

    //Accion de submit
    const handleSubmit = (e) => {
        e.preventDefault();

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
        const body = {
            aporteTotalObligatorio: infoFondo.aporteTotalObligatorio.replace(/\./g, ''),
            saldoAhorro: infoFondo.saldoAhorro.replace(/\./g, ''),
            tasa: infoFondo.tasa,
            poseeCredito: prestamoFondo,
            valorInicial: (infoFondo.valorInicial !== '') ? infoFondo.valorInicial.replace(/\./g, '') : null,
            fechaDesembolso: (infoFondo.fechaDesembolso !== '') ? infoFondo.fechaDesembolso : null,
            saldoFecha: (infoFondo.saldoFecha !== '') ? infoFondo.saldoFecha.replace(/\./g, '') : null,
            cuotaMensual: (infoFondo.cuotaMensual !== '') ? infoFondo.cuotaMensual.replace(/\./g, '') : null,
            totalAportesMensuales: (infoFondo.totalAportesMensuales !== '') ? infoFondo.totalAportesMensuales.replace(/\./g, '') : null,
            aporteVoluntario: (infoFondo.aporteVoluntario !== '') ? infoFondo.aporteVoluntario.replace(/\./g, '') : null,
            otrosFondo: (infoFondo.otros !== '') ? infoFondo.otros.replace(/\./g, '') : null,
            totalDescuentoFondo: total,
            idCredito: search.credito.id,
            estado: 'Presidente',
        }
        updateEstudioCredito(search.id, body)
            .then(({data})=>{
                const item = {
                    id: search.id
                }
                mailPresidente(item)
                .then(()=>{
                    Swal.fire({
                        icon:'success',
                        title:'¡Felicidades!',
                        text:'Se ha registrado tu parte del estudio de crédito de manera satisfactoria',
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
                        text:'Ha ocurrido un error al momento de registrar el estudio de crédito. intenta de nuevo. Si el problema persiste informanos vía whatsapp.',
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
                    text:'Ha ocurrido un error al momento de registrar el estudio de crédito. intenta de nuevo. Si el problema persiste informanos vía whatsapp.',
                    showConfirmButton:true,
                    confirmButtonColor: '#0101b5',
                    showCancelButton:false
                })
            })
    }

    const handleClear = () => {
        setSearch({})
        setPrestamoFondo('')
        setEnviando(false)
        setInfoFondo({
            aporteTotalObligatorio:'',
            saldoAhorro:'',
            valorInicial:'',
            fechaDesembolso:'',
            saldoFecha:'',
            cuotaMensual:'',
            totalAportesMensuales:'',
            aporteVoluntario:'',
            otros:'',
            totalDescuentoFondo:'',
        })
    }

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
          setInfoFondo({
            ...infoFondo,
            [id]: formatNumber(numericValue)
            })
        }else{
            setInfoFondo({
                ...infoFondo,
                [id]: ''
            })
        }
    };

    const handleTasa = (e) => {
        const inputValue = e.target.value;
        const regex = /^[0-9]*\.?[0-9]{0,2}$/;
        if (/* /^\d{0,2}$/ */regex.test(inputValue)) {
            setInfoFondo({
                ...infoFondo,
                tasa: inputValue
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
                        <div className="rounded shadow-sm p-2 mb-3">
                        <div className="d-flex flex-column gap-1" style={{backgroundColor:'whitesmoke', borderRadius:5}} >
                            <div>
                                <label className="fw-bold">DATOS DEL CRÉDITO</label>
                                {/* {JSON.stringify(search)} */}
                                <div className="row row-cols-sm-3">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>NIT/Cédula:</label>
                                        <input
                                            id="cedula"
                                            type="number"
                                            className="form-control form-control-sm"
                                            min={0}
                                            disabled
                                            value={search.credito && search.credito.rowId}
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Expedida en:</label>
                                        <input
                                            id="expedidaEn"
                                            value={search.credito && search.credito.lugarExpedicion}
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
                                            value={search.credito && search.credito.nombre}
                                            className="form-control form-control-sm"
                                            disabled
                                        />
                                    </div>
                                    
                                </div>

                                <div className="row row-cols-sm-3">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Empresa:</label>
                                        <input
                                            id="cedula"
                                            type="text"
                                            className="form-control form-control-sm"
                                            min={0}
                                            disabled
                                            /* value={search.credito && search.credito.nombreAgencia} */
                                            value='EL GRAN LANGOSTINO S.A.S'
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Ciudad:</label>
                                        <input
                                            id="expedidaEn"
                                            value={search.credito && search.credito.ciudadAgencia}
                                            type="text"
                                            disabled
                                            className="form-control form-control-sm"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Fecha afiliación:</label>
                                        <input
                                            id="nombre"
                                            type="Date"
                                            value={search.credito && new Date(search.credito.fechaAfiliacion).toISOString().split("T")[0]}
                                            className="form-control form-control-sm"
                                            disabled
                                        />
                                    </div>
                                </div>

                            </div>
                            <hr className="my-1" />
                            <div >
                                <label className="fw-bold">INFORMACIÓN EMPRESA</label>

                                {/* informacion de la empresa */}
                                <div className="row row-cols-sm-2 mt-1 mb-2" >
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Fecha de ingreso:</label>
                                        <input
                                            id="FechaIngreso"
                                            type="date"
                                            value={search.FechaIngreso && new Date(search.FechaIngreso).toISOString().split("T")[0]}
                                            className="form-control form-control-sm"
                                            disabled
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <TextField
                                            id="salarioBasico" 
                                            label="Salario básico"
                                            value={search && Number(search.salarioBasico).toLocaleString("es-ES")}
                                            className="w-100 me-3"
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

                                <hr className="mt-1 mb-1" />

                                <label className="fw-bold mt-1">INFORMACIÓN DEL PERIODO ACTUAL</label>

                                {/* Informacion del periodo actual con el gran langostino */}
                                <div className="row row-cols-sm-4 mt-1">
                                    
                                    <div className="d-flex flex-column align-items-start">
                                        <TextField
                                            id="cesantias" 
                                            label="Cesantias"
                                            value={search && Number(search.cesantias).toLocaleString("es-ES")}
                                            className="w-100 me-3"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                inputMode: 'numeric',
                                            }}
                                            variant="standard"
                                            autoComplete="off"
                                            disabled
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <TextField
                                            id="primas" 
                                            label="Primas"
                                            value={search && Number(search.primas).toLocaleString("es-ES")}
                                            className="w-100 me-3"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                inputMode: 'numeric',
                                            }}
                                            disabled
                                            variant="standard"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <TextField
                                            id="vacaciones" 
                                            label="Vacaciones"
                                            value={search && Number(search.vacaciones).toLocaleString("es-ES")}
                                            className="w-100 me-3"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                inputMode: 'numeric',
                                            }}
                                            variant="standard"
                                            autoComplete="off"
                                            disabled
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <div className="d-flex flex-column align-items-start">
                                            <TextField
                                                id="libranza" 
                                                label="Libranza"
                                                value={search && Number(search.libranza).toLocaleString("es-ES")}
                                                className="w-100 me-3"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                    inputMode: 'numeric',
                                                }}
                                                disabled
                                                variant="standard"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                </div>
                                    <div className="row row-cols-sm-4 mt-1 mb-3">
                                        <div className="d-flex flex-column align-items-start">
                                            <TextField
                                                id="otros" 
                                                label="Otros"
                                                value={search && Number(search.otrosDescuentos).toLocaleString("es-ES")}
                                                className="w-100 me-3"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                    inputMode: 'numeric',
                                                }}
                                                disabled
                                                variant="standard"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="d-flex flex-column align-items-start">
                                            <label>Banco:</label>
                                            <input
                                                id="banco"
                                                type="text"
                                                value={search && search.banco}
                                                className="form-control form-control-sm"
                                                disabled
                                            />
                                        </div>
                                        <div className="d-flex flex-column align-items-start">
                                            <label>Número de cuenta:</label>
                                            <input
                                                id="numeroCuenta"
                                                type="number"
                                                value={search && search.numeroCuenta}
                                                className="form-control form-control-sm"
                                                disabled
                                            />
                                        </div>
                                        
                                        <div className="d-flex flex-column align-items-start">
                                            <TextField
                                                id="totalDescuentoEmpresa" 
                                                label="Total descuento incluido Seg. Social"
                                                value={search && Number(search.totalDescuentoEmpresa).toLocaleString("es-ES")}
                                                className="w-100 me-3"
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
                                {(user.role === 'admin' || user.role === 'auxiliar') && (
                                    <div>
                                        <hr className="mt-1 mb-1" />

                                        <label className="fw-bold mt-1">INFORMACIÓN FODEGRAN</label>
                                        <div className="row row-cols-sm-4 mt-1">
                                            <div className="d-flex flex-column align-items-start">
                                                <TextField
                                                    id="aporteTotalObligatorio" 
                                                    label="Aporte total obligatorio"
                                                    value={infoFondo.aporteTotalObligatorio}
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
                                                <TextField
                                                    id="saldoAhorro" 
                                                    label="Saldo ahorro a la vista"
                                                    value={infoFondo.saldoAhorro}
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
                                                <TextField
                                                    id="tasa" 
                                                    label="Tasa"
                                                    value={infoFondo.tasa}
                                                    className="w-100 me-3"
                                                    onChange={(e)=>handleTasa(e)}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                                        /* inputMode: 'numeric', */
                                                        inputMode: "decimal", // Habilitar teclado numérico en móviles
                                                        pattern: "[0-9]*\\.?[0-9]{0,2}", // Validación adicional en navegadores
                                                    }}
                                                    variant="standard"
                                                    autoComplete="off"
                                                    required
                                                />
                                            </div>
                                            <div className="d-flex flex-column align-items-start">
                                                <label>Posee crédito actualmente:</label>
                                                <div className="modalidad-pago w-100 justify-content-center">
                                                    <FormControlLabel
                                                        sx={{
                                                            '& .MuiFormControlLabel-label': {
                                                                fontSize: '1rem', // Cambia el tamaño del texto del label
                                                            },
                                                        }}
                                                        label="Si"
                                                        control={
                                                            <Checkbox 
                                                                placeholder="si" 
                                                                color="success" 
                                                                sx={{
                                                                    '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                                }}
                                                                checked={posibilities.si}
                                                                onChange={() => handleFondo('si')}
                                                            />
                                                        }
                                                    />
                                                    <FormControlLabel
                                                        sx={{
                                                            '& .MuiFormControlLabel-label': {
                                                                fontSize: '1rem', // Cambia el tamaño del texto del label
                                                            },
                                                        }}
                                                        label="No"
                                                        control={
                                                            <Checkbox 
                                                                placeholder="no" 
                                                                color="success" 
                                                                sx={{
                                                                    '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                                }}
                                                                checked={posibilities.no}
                                                                onChange={() => handleFondo('no')}
                                                            />
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {posibilities.si === true && (
                                            <div> 
                                                <div className="row row-cols-sm-3 mt-1 mb-3">
                                                    
                                                    <div className="d-flex flex-column align-items-start">
                                                        <TextField
                                                            id="saldoFecha" 
                                                            label="Saldo a la fecha"
                                                            value={infoFondo.saldoFecha}
                                                            className="w-100 me-3"
                                                            onChange={(e)=>handleChangeNumber(e)}
                                                            InputProps={{
                                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                                inputMode: 'numeric',
                                                            }}
                                                            variant="standard"
                                                            autoComplete="off"
                                                            required={posibilities.si && true}
                                                        />
                                                    </div>
                                                    <div className="d-flex flex-column align-items-start">
                                                        <TextField
                                                            id="cuotaMensual" 
                                                            label="Cuota mensual crédito"
                                                            value={infoFondo.cuotaMensual}
                                                            className="w-100 me-3"
                                                            onChange={(e)=>handleChangeNumber(e)}
                                                            InputProps={{
                                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                                inputMode: 'numeric',
                                                            }}
                                                            variant="standard"
                                                            autoComplete="off"
                                                            required={posibilities.si && true}
                                                        />
                                                    </div>
                                                    <div className="d-flex flex-column align-items-start">
                                                        <TextField
                                                            id="totalAportesMensuales" 
                                                            label="Aporte obligatorio mensual"
                                                            value={infoFondo.totalAportesMensuales}
                                                            className="w-100 me-3"
                                                            onChange={(e)=>handleChangeNumber(e)}
                                                            InputProps={{
                                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                                inputMode: 'numeric',
                                                            }}
                                                            variant="standard"
                                                            autoComplete="off"
                                                            required={posibilities.si && true}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row row-cols-sm-3 mt-1 mb-3">
                                                    
                                                    <div className="d-flex flex-column align-items-start">
                                                        <TextField
                                                            id="aporteVoluntario" 
                                                            label="Aporte total voluntario"
                                                            value={infoFondo.aporteVoluntario}
                                                            className="w-100 me-3"
                                                            onChange={(e)=>handleChangeNumber(e)}
                                                            InputProps={{
                                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                                inputMode: 'numeric',
                                                            }}
                                                            variant="standard"
                                                            autoComplete="off"
                                                            required={posibilities.si && true}
                                                        />
                                                    </div>
                                                    <div className="d-flex flex-column align-items-start">
                                                        <TextField
                                                            id="otros" 
                                                            label="Otros (servicios funerarios y otros)"
                                                            value={infoFondo.otros}
                                                            className="w-100 me-3"
                                                            onChange={(e)=>handleChangeNumber(e)}
                                                            InputProps={{
                                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                                inputMode: 'numeric',
                                                            }}
                                                            variant="standard"
                                                            autoComplete="off"
                                                            required={posibilities.si && true}
                                                        />
                                                    </div>
                                                    
                                                    <div className="d-flex flex-column align-items-start">
                                                        <TextField
                                                            id="totalDescuentoFondo" 
                                                            label="Total descuento con el fondo"
                                                            value={total.toLocaleString("es-ES")}
                                                            className="w-100 me-3"
                                                            InputProps={{
                                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                                inputMode: 'numeric',
                                                            }}
                                                            variant="standard"
                                                            autoComplete="off"
                                                            disabled
                                                            required={posibilities.si && true}
                                                        />
                                                    </div>
                                                </div>
                                        </div> 
                                        )}  
                                    </div>
                                )}               
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