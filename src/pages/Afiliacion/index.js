import { useState , useRef } from "react";
import Logo2 from '../../assets/fodegran2.jpeg';
import EstadoCivil from "../../components/estadoCivil";
import NivelEscolar from "../../components/nivelEscolar";
import Navbar from "../../components/Navbar";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { FaFileDownload } from "react-icons/fa";
import TableHijos from "../../components/TableHijos";
import './styles.css';

export default function Afiliacion (){
    /* descargar contenido */
    const contentRef = useRef();

    const handleDownloadWord = () => {
        const content = contentRef.current.innerHTML;
        
        // Crear una estructura de documento HTML básica
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Documento Word</title>
          </head>
          <body>
            ${content}
          </body>
          </html>
        `;
    
        // Crear un blob a partir del contenido HTML
        const blob = new Blob(['\ufeff', html], {
          type: 'application/msword'
        });
    
        // Crear un enlace temporal para descargar el archivo
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'content.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleDownloadPDF = async () => {
        const content = contentRef.current;
        const canvas = await html2canvas(content);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('content.pdf');
    };
    

    /* variables */
    const [tipoAfiliacion, setTipoAfiliacion] = useState('')
    const [fechaSolicitud, setFechaSolicitud] = useState('')
    const [estadoCivil, setEstadoCivil] = useState('');
    const [tipoVivienda, setTipoVivienda] = useState('');
    const [nivelEscolar, setNivelEscolar] = useState('');
    const [tieneHijos, setTieneHijos] = useState('');

    /* Logica del tipo de afiliacion */
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const handleCheckboxChange = (checkboxNumber) => {
      if (checkboxNumber === 1) {
        setIsChecked1(true);
        setIsChecked2(false);
        setIsChecked3(false);
      } else if (checkboxNumber === 2) {
        setIsChecked1(false);
        setIsChecked2(true);
        setIsChecked3(false);
      } else {
        setIsChecked1(false);
        setIsChecked2(false);
        setIsChecked3(true);
      }
    };

    /* logica del tipo de vivienda */
    const [isChecked4, setIsChecked4] = useState(false);
    const [isChecked5, setIsChecked5] = useState(false);
    const [isChecked6, setIsChecked6] = useState(false);
    const handleTipoVivienda = (checkboxNumber) => {
        if (checkboxNumber === 4) {
          setIsChecked4(true);
          setIsChecked5(false);
          setIsChecked6(false);
        } else if (checkboxNumber === 5) {
          setIsChecked4(false);
          setIsChecked5(true);
          setIsChecked6(false);
        } else {
          setIsChecked4(false);
          setIsChecked5(false);
          setIsChecked6(true);
        }
      };

    /* logica de tener hijos */
    const [isChecked7, setIsChecked7] = useState(false);
    const [isChecked8, setIsChecked8] = useState(false);
    const handleTieneHijos = (checkboxNumber) => {
        if (checkboxNumber === 7) {
          setIsChecked7(true);
          setIsChecked8(false);
        } else if (checkboxNumber === 8) {
          setIsChecked7(false);
          setIsChecked8(true);
        } 
      };

    /* constantes para las filas */
    const [Hijos, setHijos] = useState([
        { id: 1, nombre: '', fechaNacimiento: '', edad: '', nivelEducativo: '' },
        { id: 2, nombre: '', fechaNacimiento: '', edad: '', nivelEducativo: '' },
        { id: 3, nombre: '', fechaNacimiento: '', edad: '', nivelEducativo: '' },
        { id: 4, nombre: '', fechaNacimiento: '', edad: '', nivelEducativo: '' },
        { id: 5, nombre: '', fechaNacimiento: '', edad: '', nivelEducativo: '' }
    ]);

    return(
        <div className="">
            <div className="d-flex w-100">
                <Navbar />
            </div>
        <div ref={contentRef} className="" id="content">
            <div style={{height:62}}></div>
            <div className="container ">
                <div className="row">
                    <div className="col col-12 col-lg-3 col-md-12" style={{border: '2px solid black'}}>
                        <img src={Logo2} className="w-100" style={{height:70}}></img>
                    </div>
                    <div className="col col-12 col-lg-6 col-md-12 d-flex justify-content-center text-align-center align-items-center" style={{border: '2px solid black'}}>
                        <h3 className="fw-bold">FORMULARIO UNICO DE AFILIACION</h3>
                    </div>
                    <div className="col col-12 col-lg-3 col-md-12 d-flex flex-row " style={{border: '2px solid black'}}>
                        <div className="d-flex flex-column w-100 p-0 m-0">
                            <h6 className="m-0 mb-1 p-0 w-100" >VERSION 001</h6>
                            <h6 className="m-0 mb-1 p-0 w-100" >FECHA: {new Date().toLocaleDateString()}</h6>
                            <h6 className="m-0 mb-1 p-0 w-100" >CODIGO: FUA - 001</h6>
                        </div>
                        <button 
                            className="boton-cancel m-2 d-flex flex-row justify-content-center align-items-center" 
                            onClick={handleDownloadPDF}
                        ><FaFileDownload className="me-1" /> PDF</button>
                        {/* <button className="btn btn-success" onClick={handleDownloadWord}>WORD</button> */}
                    </div>
                </div>
            </div>
            <div className="container d-flex flex-column justify-content-center text-align-center align-items-center" style={{border:'2px solid black'}}>
                <h4 className="mb-0 fw-bold mb-2">FONDE DE EMPLEADOS DEL GRAN LANGOSTINO - FODEGRAN</h4>
                <div>
                    <h5 className="mb-1">Oficina: Calle 13 # 32 - 417, Bodega 4, Acopi Yumbo     Tels. 324 255 9322</h5>
                </div>
                <div className="d-flex fecha">
                    <h5 className="d-flex flex-row fecha-soli ">Fecha de solicitud</h5>
                    <input className="form-control form-control-sm w-50 ms-4" onChange={(e)=>setFechaSolicitud(e)} type="date"/>
                </div>
                <div className="d-flex flex-row w-100" >
                    <div className='d-flex w-100 flex-column justify-content-center text-align-center align-items-center'>
                        <h6 className='ps-3 pe-3 m-1' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(1),setTipoAfiliacion('Nueva afiliación'))}>
                          <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked1} onChange={()=>(handleCheckboxChange(1),setTipoAfiliacion('Nueva afiliación'))}/>
                          Nueva afiliación
                        </h6>
                    </div>
                    <div className='d-flex w-100 flex-column justify-content-center text-align-center align-items-center'>
                        <h6 className='ps-3 pe-3 m-1 ' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(2),setTipoAfiliacion('Reingreso'))}>
                          <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked2} onChange={()=>(handleCheckboxChange(2),setTipoAfiliacion('Reingreso'))}/>
                          Reingreso
                        </h6>
                    </div>
                    <div className='d-flex w-100 flex-column justify-content-center text-align-center align-items-center'>
                        <h6 className='ps-3 pe-3 m-1 ' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(3),setTipoAfiliacion('Actualización de datos'))}>
                          <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked3} onChange={()=>(handleCheckboxChange(3),setTipoAfiliacion('Actualización de datos'))}/>
                          Actualización de datos
                        </h6>
                    </div>
                </div>
            </div>
            <div className="container d-flex flex-column justify-content-center text-align-center align-items-center pt-0 pb-0 mb-0" style={{border:'2px solid black',backgroundColor:'#b5b5b5'}}>
                <div className="row">
                    <div className="col col-12 col-lg-12 col-md-12 mb-0 pb-0">
                        <h5 className="pb-0 mb-0">INFORMACION GENERAL PERSONAL</h5>
                    </div>
                </div>
            </div>
            {/* Nombre y apellidos */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="row w-100">
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row border-cambio pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1">Nombre:</h6>
                        <input className="form-control form-control-sm " style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1">Apellidos:</h6>
                        <input className="form-control form-control-sm " style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                </div>
            </div>
            {/* Tipo de documento y numero */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="row w-100">
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row border-cambio pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1 w-50">Tipo de Documento:</h6>
                        <input className="form-control form-control-sm tipo-ide" style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row pt-1 pb-1">
                        <h6 className="mt-1 me-1 w-50 ms-1">No. Identificación:</h6>
                        <input className="form-control form-control-sm nu-ide" style={{backgroundColor:'whitesmoke'}} type="number"/>
                    </div>
                </div>
            </div>
            {/* fecha expedicion y ciudad */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="row w-100">
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row border-cambio pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1 w-50">Fecha expedición:</h6>
                        <input className="form-control form-control-sm tipo-ide" style={{backgroundColor:'whitesmoke'}} type="date"/>
                    </div>
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1">Ciudad:</h6>
                        <input className="form-control form-control-sm " style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                </div>
            </div>
            {/* Nacionalidad */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="row w-100">
                    <div className="col col-12 col-lg-12 col-md-12 d-flex flex-row pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1">Nacionalidad:</h6>
                        <input className="form-control form-control-sm " style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                </div>
            </div>
            {/* Fecha de nacimiento y ciudad de nacimiento */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="row w-100">
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row border-cambio pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1 w-50">Fecha de nacimiento:</h6>
                        <input className="form-control form-control-sm tipo-ide" style={{backgroundColor:'whitesmoke'}} type="date"/>
                    </div>
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row pt-1 pb-1">
                        <h6 className="mt-1 me-1 w-50 ms-1">Ciudad de nacimiento:</h6>
                        <input className="form-control form-control-sm nu-ide" style={{backgroundColor:'whitesmoke'}} type="number"/>
                    </div>
                </div>
            </div>
            {/* Estado civil */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="col col-12 col-lg-12 col-md-12 d-flex flex-row border-cambio pt-1 pb-1">
                    <EstadoCivil setEstadoCivil={setEstadoCivil} />
                </div>
            </div>
            {/* Direccion y barrio */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="row w-100">
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row border-cambio pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1 w-50">Dirección Residencia:</h6>
                        <input className="form-control form-control-sm tipo-ide" style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1">Barrio:</h6>
                        <input className="form-control form-control-sm " style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                </div>
            </div>
            {/* Ciudad telefono y estrato */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="row w-100">
                    <div className="col col-12 col-lg-4 col-md-12 d-flex flex-row border-cambio pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1">Ciudad:</h6>
                        <input className="form-control form-control-sm " style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                    <div className="col col-12 col-lg-4 col-md-12 d-flex flex-row border-cambio pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1">Teléfono:</h6>
                        <input className="form-control form-control-sm " style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                    <div className="col col-12 col-lg-4 col-md-12 d-flex flex-row pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1">Estrato:</h6>
                        <input className="form-control form-control-sm " style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                </div>
            </div>
            {/* Celular y correo */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="row w-100">
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row pt-1 pb-1 border-cambio">
                        <h6 className="mt-1 me-1 ms-1">Celular:</h6>
                        <input className="form-control form-control-sm " style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1">Correo:</h6>
                        <input className="form-control form-control-sm " style={{backgroundColor:'whitesmoke'}} type="email"/>
                    </div>
                </div>
            </div>
            {/* Tipo de vivienda */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="d-flex flex-row w-100" >
                    <div className='d-flex w-100 flex-column justify-content-center text-align-center align-items-center'>
                        <h5 className="mt-1">Tipo de vivienda: </h5>
                    </div>                    
                    <div className='d-flex w-100 flex-column justify-content-center text-align-center align-items-center'>
                        <h6 className='ps-3 pe-3 m-1' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleTipoVivienda(4),setTipoVivienda('Propia'))}>
                        <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked4} onChange={()=>(handleTipoVivienda(4),setTipoVivienda('Propia'))}/>
                        Propia
                        </h6>
                    </div>
                    <div className='d-flex w-100 flex-column justify-content-center text-align-center align-items-center'>
                        <h6 className='ps-3 pe-3 m-1 ' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleTipoVivienda(5),setTipoVivienda('Alquilada'))}>
                        <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked5} onChange={()=>(handleTipoVivienda(5),setTipoVivienda('Alquilada'))}/>
                        Alquilada
                        </h6>
                    </div>
                    <div className='d-flex w-100 flex-column justify-content-center text-align-center align-items-center'>
                        <h6 className='ps-3 pe-3 m-1 ' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleTipoVivienda(6),setTipoVivienda('Familiar'))}>
                        <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked6} onChange={()=>(handleTipoVivienda(6),setTipoVivienda('Familiar'))}/>
                        Familiar
                        </h6>
                    </div>
                </div>
            </div>
            {/* Pago por arriendo */}
            {tipoVivienda === 'Alquilada' && 
                <div className="container p-0" style={{border:'2px solid black'}}>
                    <div className="row w-100">
                        <div className="col col-12 col-lg-12 col-md-12 d-flex flex-row pt-1 pb-1">
                            <h6 className="mt-1 me-1 ms-1 w-25">¿Cuánto paga de arriendo?</h6>
                            $<input className="form-control form-control-sm tipo-ide" style={{backgroundColor:'whitesmoke'}} type="number"/>
                        </div>
                    </div>
                </div>

            }
            {/* nivel escolar */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="col col-12 col-lg-12 col-md-12 d-flex flex-row border-cambio pt-1 pb-1">
                    <NivelEscolar setNivelEscolar={setNivelEscolar} />
                </div>
            </div>
            {/* Nombre de la carrera y otros estudios */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="row w-100">
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row border-cambio pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1 w-50">Nombre de la carrera:</h6>
                        <input className="form-control form-control-sm tipo-ide" style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1 w-50">Otros estudios:</h6>
                        <input className="form-control form-control-sm tipo-ide" style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container d-flex flex-column justify-content-center text-align-center align-items-center pt-0 pb-0 mb-0" style={{border:'2px solid black',backgroundColor:'#b5b5b5'}}>
                <div className="row">
                    <div className="col col-12 col-lg-12 col-md-12 mb-0 pb-0">
                        <h5 className="pb-0 mb-0">INFORMACION FAMILIAR</h5>
                    </div>
                </div>
            </div>
            {/* Nombre del conyuge */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="row w-100">
                    <div className="col col-12 col-lg-12 col-md-12 d-flex flex-row pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1 w-25">Nombre de esposa o cónyuge:</h6>
                        <input className="form-control form-control-sm tipo-ide" style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                </div>
            </div>
            {/* Tipo de documento y numero */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="row w-100">
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row border-cambio pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1 w-50">Tipo de Documento:</h6>
                        <input className="form-control form-control-sm tipo-ide" style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row pt-1 pb-1">
                        <h6 className="mt-1 me-1 w-50 ms-1">No. Identificación:</h6>
                        <input className="form-control form-control-sm nu-ide" style={{backgroundColor:'whitesmoke'}} type="number"/>
                    </div>
                </div>
            </div>
            {/* Ocupacion y empresa donde labura */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="row w-100">
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row border-cambio pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1">Ocuapación:</h6>
                        <input className="form-control form-control-sm " style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row pt-1 pb-1">
                        <h6 className="mt-1 me-1 w-50 ms-1">Empresa donde labora:</h6>
                        <input className="form-control form-control-sm nu-ide" style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                </div>
            </div>
            {/* Numero y correo */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="row w-100">
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row pt-1 pb-1 border-cambio">
                        <h6 className="mt-1 me-1 ms-1">Celular:</h6>
                        <input className="form-control form-control-sm " style={{backgroundColor:'whitesmoke'}} type="text"/>
                    </div>
                    <div className="col col-12 col-lg-6 col-md-12 d-flex flex-row pt-1 pb-1">
                        <h6 className="mt-1 me-1 ms-1">Correo:</h6>
                        <input className="form-control form-control-sm " style={{backgroundColor:'whitesmoke'}} type="email"/>
                    </div>
                </div>
            </div>
            {/* Tiene hijos y numero de hijos */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="row w-100">
                    <div className="col col-12 col-lg-8 col-md-12 d-flex flex-row pt-1 pb-1 border-cambio">
                        <div className='d-flex w-100 flex-column justify-content-center text-align-center align-items-center'>
                            <h5 className="mt-1">¿Tiene hijos? </h5>
                        </div>
                        <div className="d-flex flex-row w-100" >
                            <div className='d-flex w-100 flex-column justify-content-center'>
                                <h6 className='ps-3 pe-3 m-1' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleTieneHijos(7),setTipoAfiliacion('SI'))}>
                                <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked7} onChange={()=>(handleTieneHijos(7),setTipoAfiliacion('SI'))}/>
                                SI
                                </h6>
                            </div>
                            <div className='d-flex w-100 flex-column justify-content-center '>
                                <h6 className='ps-3 pe-3 m-1 ' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleTieneHijos(8),setTipoAfiliacion('NO'))}>
                                <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked8} onChange={()=>(handleTieneHijos(8),setTipoAfiliacion('NO'))}/>
                                NO
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="col col-12 col-lg-4 col-md-12 d-flex flex-row pt-1 pb-1">
                        <div className='d-flex w-100 flex-column justify-content-center text-align-center align-items-center'>
                            <h5 className="mt-1">No. de Hijos </h5>
                        </div>
                        <input className="form-control form-control-sm nu-ide" style={{backgroundColor:'whitesmoke'}} type="number"/>
                    </div>
                </div>
            </div>
            {/* Nombre, fecha nacimiento, edad y nivel educativo de hijos */}
            <div className="container p-0" style={{border:'2px solid black'}}>
                <div className="row w-100">
                    <div className="col col-12 col-lg-12 col-md-12 d-flex flex-row pt-1 pb-1 border-cambio">
                        <TableHijos rows={Hijos} setRows={setHijos}/>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}