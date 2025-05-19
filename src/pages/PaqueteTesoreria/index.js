import { useState , useContext , useEffect} from "react";
import TextField from '@mui/material/TextField';
import { useParams , useNavigate } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import Navbar from "../../components/NavBitacora";
import { GiSandsOfTime } from "react-icons/gi";
import AuthContext from "../../context/authContext";
import { verifyTokenWhithId , findOneCredito, updateCredito , mailFinalizado } from '../../services/creditosServices'
import { findEstudioWithCredito } from "../../services/estudioCreditoService";
import { sendComprobante } from "../../services/updateFilesService";
import DocEstudioPDF from "../../components/DocEstudioPDF";
import PDFFormSolicitud from "../../components/DocSolicitudPDF"; 
import { pdf } from "@react-pdf/renderer";
import Rechazado from '../../assets/rechazado.png'
import Aprobado from '../../assets/aprobado.png'
import { format } from "date-fns";
import Swal from "sweetalert2";
import './styles.css';

export default function PaqueteTesoreria (){
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    //constante para guardar el valor del parametro
    const { token } = useParams();

    useEffect(()=>{
        if(user && (user.role === 'tesoreria' || user.role === 'admin')){
        verifyTokenWhithId(token)
            .then(({data})=>{
                setSearch(data);
            })
            .catch(()=>{
                findOneCredito(token)
                .then(({data})=>{
                    setSearch(data);
                    findEstudioWithCredito(token)
                    .then(({data})=>{
                        setPackEstudio(data)
                    })
                    .catch(()=>{
                        console.log('error')
                    })
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
    const [ packEstudio, setPackEstudio ] = useState({})

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
    const handleSubmit = async (e) => {
        e.preventDefault();

        /* const solicitud = <PDFFormSolicitud credito={search} />
        const estudio = <DocEstudioPDF credito={search} /> */

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
        if(user.role === 'tesoreria' && search.estado === 'Tesoreria' && (files.comprobantePago !== null || files.comprobantePago !== '')){
            const body = {
              estado: 'Finalizado',
              fechaDesembolso: new Date(),
            }

            const blobSolicitud = await pdf(<PDFFormSolicitud credito={search} />).toBlob();
            const blobEstudio = await pdf(<DocEstudioPDF credito={packEstudio} />).toBlob();

            const formData = new FormData();
                for (const fieldName in files) {
                    if (files[fieldName]) {
                      formData.append(fieldName, files[fieldName]);
                    }
                }   
            formData.append('solicitud', blobSolicitud)  
            formData.append('estudio', blobEstudio)              
            formData.append("clientName", search.nombre)
            formData.append("clientCreatedAt", format(new Date(search.createdAt), 'yyyy-MM-dd'))

            sendComprobante(formData)
            .then(()=>{
                  updateCredito(search.id,body)
                  .then(()=>{
                    mailFinalizado(search)
                    .then(()=>{
                      Swal.fire({
                        icon:'success',
                        title:'¡Felicidades!',
                        text:'Se ha registrado el desembolso de manera satisfactoria',
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
                        title:'¡ERROR #3!',
                        text:'Ha ocurrido un error al momento de registrar el desembolso. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
                        showConfirmButton:true,
                        confirmButtonColor: 'red',
                        showCancelButton:false
                      })
                    })
                })
                .catch(()=>{
                    setEnviando(false)
                    Swal.fire({
                      icon:'warning',
                      title:'¡ERROR #2!',
                      text:'Ha ocurrido un error al momento de registrar el desembolso. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
                      showConfirmButton:true,
                      confirmButtonColor: 'red',
                      showCancelButton:false
                    })
                  })
              })
              .catch(()=>{
                Swal.fire({
                  icon:'error',
                  title:'¡ERROR #1!',
                  text:'Ha ocurrido un error al momento de registrar el desembolso. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
                  confirmButtonColor:'red',
                  confirmButtonText:'OK',
                  showCancelButton:false,
                  showConfirmButton:true
                })
              })
          }
    };

    const handleClear = () => {
        setSearch({});
        setEnviando(false);
    };

    const [files, setFiles] = useState({
        comprobantePago: null,
    });

    const handleFileChange = (fieldName, e) => {
        const selectedFile = e.target.files[0];
        setFiles(prevFiles => ({ ...prevFiles, [fieldName]: selectedFile }));
    };

    return(
        <div>
            <Navbar/>
            <div className="d-flex justify-content-center align-items-center h-100 w-100 m-auto">
                <div
                    className="container d-flex flex-column w-100 py-3"
                    style={{ fontSize: 10.5 }}
                >
                    <h1 className="text-center fs-5 fw-bold pt-5 mt-1" style={{color:'blue'}}>Formulario tesorería</h1>
                    <form className="" onSubmit={handleSubmit}>
                        <div className=" rounded shadow-sm p-2 mb-3">
                        <div className="d-flex flex-column gap-1" style={{backgroundColor:'whitesmoke', borderRadius:5}}>
                            <div>
                                <h6 className="fw-bold" style={{fontSize:14}}>DATOS DEL CRÉDITO</h6>
                                <div className="row row-cols-sm-2">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>NIT/Cédula:</label>
                                        <input
                                            id="cedula"
                                            type="number"
                                            className="form-control form-control-sm"
                                            min={0}
                                            disabled
                                            value={search?.rowId}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Nombres y apellidos:</label>
                                        <input
                                            id="nombre"
                                            type="text"
                                            value={search?.nombre}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="row row-cols-sm-2">
                                    <div className="d-flex flex-column align-items-start">
                                        <label>No. cuenta bancaria:</label>
                                        <input
                                            id="cuentaBancaria"
                                            type="text"
                                            value={search?.cuentaBancaria}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            disabled
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Tipo de cuenta:</label>
                                        <input
                                            id="tipoCuenta"
                                            type="text"
                                            value={search?.tipoCuenta}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            disabled
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Entidad bancaria:</label>
                                        <input
                                            id="entidadBancaria"
                                            type="text"
                                            value={search?.entidadBancaria}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            disabled
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label>Monto:</label>
                                        <input
                                            id="valorSolicitado"
                                            type="text"
                                            value={`$ ${Number(search?.valorSolicitado).toLocaleString('es')}`}
                                            onChange={(e)=>handlerChangeSearch(e)}
                                            className="form-control form-control-sm"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <hr className="my-1 mt-3 mb-3" />
                        <div className="d-flex flex-row gap-4">
                            <div className="d-flex flex-column justify-content-end align-items-end">
                                <label className="me-5">Comité de crédito</label>
                                <img 
                                    src={Aprobado}
                                    style={{width:'35%'}}
                                />
                            </div>
                            <div className="d-flex flex-column">
                                <label className="ms-5">Gerencia</label>
                                <img 
                                    src={Aprobado}
                                    style={{width:'35%'}}
                                />
                            </div>
                        </div> */}
                        <hr className="my-1 mt-3 mb-3" />
                        <h6 className="fw-bold" style={{fontSize:14}}>Archivos a adjuntar</h6>
                        <div className="d-flex flex-column align-items-start">
                            <label>Comprobante de pago</label>
                            <input
                                id="comprobantePago"
                                type="file"
                                required
                                accept=".png,.jpg,.jpeg,.txt,.pdf"
                                onChange={(e)=>handleFileChange('comprobantePago',e)}
                                style={{backgroundColor:'#f3f3f3'}}
                                className="form-control form-control-sm border border-5 rounded-3"
                            />
                        </div>
                            
                        </div>
                        <div className="d-flex flex-row justify-content-center gap-3 mb-2">
                        <button
                            type="submit"
                            className="bt-envio fw-bold w-50"
                            style={{fontSize:13}}
                        >
                            {enviando ? <strong>REGISTRANDO... <GiSandsOfTime /></strong>:'DESEMBOLSAR'}
                        </button>
                        {/* <button
                            type="button"
                            className="bt-cancelar fw-bold w-100"
                            style={{fontSize:13}}
                        >
                            CANCELAR
                        </button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}