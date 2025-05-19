import { useState } from "react";
import Swal from "sweetalert2";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { createCredito , deleteCredito , mailSolicitante } from '../../services/creditosServices';
import './styles.css';

export default function AllPackSolicitud ({
    search
}){

    //constante de envio
    const [enviando, setEnviando] = useState(false);

    //Accion de submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setEnviando(true)
            const body = {
                
            }
            createCredito(body)
            .then(({data})=>{
                mailSolicitante(body)
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
                    title:'¡ERROR!',
                    text:'Ha ocurrido un error al momento de generar la solicitud. intenta de nuevo. Si el problema persiste informanos vía whatsapp.',
                    showConfirmButton:true,
                    confirmButtonColor: '#0101b5',
                    showCancelButton:false
                })
            })
    }

    const handleClear = () => {
        setEnviando(false)
    }

    return(
        <div>
            <div className="d-flex justify-content-center align-items-center h-100 w-100 m-auto">
                <div
                    className="container d-flex flex-column w-100 py-2"
                    style={{ fontSize: 10.5 }}
                >
                    <h1 className="text-center fs-5 fw-bold " style={{color:'blue'}}>Solicitud de crédito</h1>
                    <form className="" onSubmit={handleSubmit}>
                        <div className="rounded shadow-sm p-2 mb-3" style={{backgroundColor:'whitesmoke', borderRadius:5}}>
                        <div className="d-flex flex-column gap-1">
                            <div>
                                <label className="fw-bold">DATOS DEL CRÉDITO</label>

                                {/* Valor del prestamo, plazo y modalidad de pago */}
                                <div className="row row-cols-sm-3">
                                    <div>
                                    <TextField
                                        id="standard-basic" 
                                        label="Valor solicitado"
                                        value={search && Number(search.valorSolicitado).toLocaleString("es-ES")}
                                        className="w-100 mt-1 me-3"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            inputMode: 'numeric',
                                        }}
                                        disabled
                                        variant="standard"
                                        autoComplete="off"
                                        required
                                        />
                                    </div>
                                    <div>
                                        <TextField 
                                            id="standard-basic" 
                                            className="w-100 mt-1"
                                            label="Plazo" 
                                            variant="standard" 
                                            value={search && search.plazo}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                                endAdornment: <InputAdornment position="end">meses</InputAdornment>,
                                                inputProps: { maxLength: 2 }, // Restringir la longitud máxima a 1 dígito
                                                inputMode: 'numeric'
                                            }}
                                            autoComplete="off"
                                            required
                                            disabled
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
                                                        value={search && search.modalidad}
                                                        checked={search && search.modalidad === 'quincena'}
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
                                                        value={search && search.modalidad}
                                                        checked={search && search.modalidad === 'mensual'}
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
                                                label="Educación"
                                                disabled
                                                control={
                                                    <Checkbox 
                                                        placeholder="educacion" 
                                                        color="success" 
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                        value={search && search.destinoCredito}
                                                        checked={search && search.destinoCredito === 'educacion'}
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
                                                        value={search && search.destinoCredito}
                                                        checked={search && search.destinoCredito === 'turismo'}
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
                                                        value={search && search.destinoCredito}
                                                        checked={search && search.destinoCredito === 'otros'}
                                                    />
                                                }
                                            />
                                        </div>
                                    </div>
                                    {search && search.destinoCredito === "otros" && (
                                    <div>
                                            <TextField 
                                                id="cualDestino"
                                                label="Cual" 
                                                variant="standard" 
                                                type="text"
                                                className="w-100"
                                                style={{textTransform:'uppercase'}}
                                                value={search && search.descipDestino}
                                                autoComplete="off"
                                                disabled
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
                                            disabled
                                            className="form-control form-control-sm"
                                            placeholder="Buscar por NIT/Cédula"
                                            min={0}
                                            value={search && search.rowId}
                                            autoComplete="off"
                                            required
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Expedida en:</label>
                                        <input
                                            id="expedidaEn"
                                            value={search && search.lugarExpedicion}
                                            type="text"
                                            style={{textTransform:'uppercase'}}
                                            className="form-control form-control-sm"
                                            required
                                            disabled
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
                                            value={search && search.nombre}
                                            className="form-control form-control-sm"
                                            required
                                            style={{textTransform:'uppercase'}}
                                            autoComplete="off"
                                            disabled
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Email:</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={search && search.correo}
                                            className="form-control form-control-sm"
                                            required
                                            style={{textTransform:'lowercase'}}
                                            autoComplete="off"
                                            disabled
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Estado civil:</label>
                                        <select
                                            id="estadoCivil"
                                            value={search && search.estadoCivil}
                                            className="form-select form-select-sm"
                                            required
                                            disabled
                                        >
                                            <option selected value="" disabled>
                                            -- Seleccione el estado civil --
                                            </option>
                                            <option id="SOLTERO" value='SOLTERO'>SOLTERO(A)</option>
                                            <option id="CASADO" value='CASADO'>CASADO(A)</option>
                                            <option id="CONVIVIENTE" value='CONVIVIENTE CIVIL'>CONVIVIENTE CIVIL</option>
                                            <option id="SEPARADO" value='SEPARADO'>SEPARADO(A) JUDICIALMENTE</option>
                                            <option id="DIVORCIADO" value='DIVORCIADO'>DIVORCIADO(A)</option>
                                            <option id="VIUDO" value='VIUDO'>VIUDO(A)</option>
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
                                                        checked={search && search.sexo === 'masculino'}
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
                                                disabled
                                                control={
                                                    <Checkbox 
                                                        placeholder="Femenino" 
                                                        color="success" 
                                                        sx={{
                                                            '& .MuiSvgIcon-root': { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                                                        }}
                                                        checked={search && search.sexo === 'femenino'}
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
                                            value={search && new Date(search.fechaNacimiento).toISOString().split("T")[0]}
                                            className="form-control form-control-sm"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Lugar nacimiento:</label>
                                        <input
                                            id="lugarNacimiento"
                                            type="text"
                                            disabled
                                            style={{textTransform:'uppercase'}}
                                            value={search && search.lugarNacimiento}
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
                                            disabled
                                            value={search && search.personasAcargo}
                                            className="form-control form-control-sm"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                {/* Direccion de residencia, ciudad y celular  */}
                                <div className="row row-cols-sm-3 mt-1">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Dirección residencia:</label>
                                        <input
                                            id="direccion"
                                            type="text"
                                            disabled
                                            style={{textTransform:'uppercase'}}
                                            value={search && search.direccionResidencia}
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
                                            disabled
                                            value={search && search.ciudadResidencia}
                                            style={{textTransform:'uppercase'}}
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
                                            disabled
                                            value={search && search.celularResidencia}
                                            className="form-control form-control-sm"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                                {/* informacion de la empresa */}
                                {/* <div className="row row-cols-sm-4 mt-1">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Empresa:</label>
                                        <input
                                            id="empresa"
                                            type="text"
                                            disabled
                                            style={{textTransform:'uppercase'}}
                                            value={search && search.nombreAgencia}
                                            className="form-control form-control-sm"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Dirección empresa:</label>
                                        <input
                                            id="dirEmpresa"
                                            type="text"
                                            disabled
                                            value={search && search.direccionEmpresa}
                                            className="form-control form-control-sm"
                                            required
                                            style={{textTransform:'uppercase'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Ciudad empresa:</label>
                                        <input
                                            id="cityEmpresa"
                                            type="text"
                                            value={search && search.ciudadAgencia}
                                            className="form-control form-control-sm"
                                            required
                                            disabled
                                            style={{textTransform:'uppercase'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Teléfono empresa:</label>
                                        <input
                                            id="telEmpresa"
                                            type="number"
                                            disabled
                                            value={search && search.telefonoEmpresa}
                                            className="form-control form-control-sm"
                                            required
                                            autoComplete="off"
                                        />
                                    </div>
                                </div> */}

                                {/* Informacion de la agencia */}
                                <div className="row row-cols-sm-2 mt-1">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Nombre agencia:</label>
                                        <input
                                            id="NombreAgencia"
                                            type="text"
                                            disabled
                                            value={search && search.nombreAgencia}
                                            className="form-control form-control-sm"
                                            required
                                            style={{textTransform:'uppercase'}}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Ciudad Agencia:</label>
                                        <input
                                            id="cityAgencia"
                                            type="text"
                                            disabled
                                            value={search && search.ciudadAgencia}
                                            className="form-control form-control-sm"
                                            required
                                            style={{textTransform:'uppercase'}}
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
                                            value={search && search.cuentaBancaria}
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
                                                disabled
                                                control={
                                                    <Checkbox 
                                                        placeholder="Cta. Ahorros" 
                                                        color="success" 
                                                        value={search && search.tipoCuenta}
                                                        checked={search && search.tipoCuenta === 'ahorros'}
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
                                                        value={search && search.tipoCuenta}
                                                        checked={search && search.tipoCuenta === 'corriente'}
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
                                            value={search && search.entidadBancaria}
                                            className="form-control form-control-sm"
                                            required
                                            disabled
                                            style={{textTransform:'uppercase'}}
                                            autoComplete="off"
                                        />
                                    </div>
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