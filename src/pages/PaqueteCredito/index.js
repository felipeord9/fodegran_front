import React from 'react';
import { useState, useEffect, useContext } from "react";
import { useParams , useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import Navbar from "../../components/NavBitacora";
import { MdOutlinePendingActions } from "react-icons/md";
import * as MdIcons from "react-icons/md"
import { config } from '../../config';
import useUser from "../../hooks/useUser";
import AllPackSolicitud from '../../components/AllPackSolicitud'
import AllPackEstudio from '../../components/AllPackEstudio'
import { GiSandsOfTime } from "react-icons/gi";
import { Modal, Button, Form } from "react-bootstrap";
import { BsCalculator } from "react-icons/bs";
import { GiRead } from "react-icons/gi";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { PDFDocument, rgb } from "pdf-lib";
import { format } from 'date-fns';
import { FaFileDownload } from "react-icons/fa";
import { CgMenuGridO } from "react-icons/cg";
import { DuoVerify, mailComite , mailComite2 } from '../../services/estudioCreditoService';
import { updateCredito , mailGerencia , mailTesoreria , mailFinalizado , mailRejectComite , mailRejectGerencia , mailRejectPresidente } from '../../services/creditosServices'
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Swal from 'sweetalert2';
import './styles.css'

const CarpetaArchivoLink = ({ carpeta, archivo }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900); // Establecer a true si la ventana es menor o igual a 768px
    };

    // Llama a handleResize al cargar y al cambiar el tamaño de la ventana
    window.addEventListener('resize', handleResize);
    handleResize(); // Llama a handleResize inicialmente para establecer el estado correcto

    // Elimina el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const url = `${config.apiUrl2}/upload/obtener-archivo/${carpeta}/${archivo}`;
  const scale = isMobile ? 0.5 : 1.3; // Estado para controlar el tamaño del PDF

  // Crear el plugin de zoom
  const zoomPluginInstance = zoomPlugin();

  return (
    <div style={{ marginTop: "20px" }}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <FaFileDownload className='me-2'/>Descargar archivo
            </a>
            {url && (
            <div
              style={{
                border: "1px solid #ccc",
                width: "100%",
                height: "calc(100vh - 200px)",
                margin: "0 auto",
              }}
            >
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer 
                  fileUrl={url} 
                  defaultScale={scale} // Ajusta el tamaño según el estado
                  plugins={[zoomPluginInstance]} // Agregar el plugin de zoom
                />
              </Worker>
            </div>
            )}
          </div>
  );
};

export default function PaqueteCredito() {
  const { user } = useContext(AuthContext);
  const { isLogged, logout } = useUser();
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [aprobar, setAprobar] = useState(false);
  const [rechazar, setRechazar] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [modalMenu, setModalMenu] = useState(false);

  //logica de cambio de tabla
  const [showEstudio, setShowEstudio] = useState(true);
  const [showSolicitud, setShowSolicitud] = useState(false);
  const [showSimulador, setShowSimulador] = useState(false);
  const [showRelacion, setShowRelacion] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900); // Establecer a true si la ventana es menor o igual a 768px
    };

    // Llama a handleResize al cargar y al cambiar el tamaño de la ventana
    window.addEventListener('resize', handleResize);
    handleResize(); // Llama a handleResize inicialmente para establecer el estado correcto

    // Elimina el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() =>  {
    if(user && (user.role === 'tesoreria' || user.role === 'presidente' || user.role === 'comite' || user.role === 'gerencia' || user.role === 'admin')){
    DuoVerify(token)
      .then(({data})=>{
         setSuggestions(data)
      })
      .catch(()=>{
        console.log('error')
        setSuggestions({})
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
    }else{
      logout();
      navigate('/login')
    }
  }, [token]);

  const handleVerify = (e) =>{
    const { id } = e.target;
    e.preventDefault();
    if(id === 'solicitud'){
      setShowSolicitud(true);
      setShowEstudio(false);
      setShowSimulador(false);
      setShowRelacion(false);
    }else if(id === 'estudio'){
      setShowSolicitud(false);
      setShowEstudio(true);
      setShowSimulador(false);
      setShowRelacion(false);
    }else if(id === 'simulador'){
      setShowSolicitud(false);
      setShowEstudio(false);
      setShowSimulador(true);
      setShowRelacion(false);
    }else if(id === 'relacion'){
      setShowSolicitud(false);
      setShowEstudio(false);
      setShowSimulador(false);
      setShowRelacion(true);
    }
    setModalMenu(false);
  }

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModalMenu = () => {
    setModalMenu(false);
  };

  const handleAprobarCredito = (e) => {
    e.preventDefault();

    // Muestra la barra de carga
    let timerInterval;
    Swal.fire({
        title: 'Registrando...',
        text: 'Por favor, espera mientras se registra la respuesta a la solicitud de crédito...',
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

    setAprobar(true)
    if(user.role === 'presidente' && suggestions.credito.estado === 'Presidente'){
      const body = {
        estado: 'Comité 1',
        /* fechaAprobacion: new Date(), */
      }
      updateCredito(suggestions.credito.id,body)
        .then(()=>{
          const item = {
            id: suggestions.id
          }
          mailComite(item)
          .then(()=>{
            Swal.fire({
                icon:'success',
                title:'¡Felicidades!',
                text:'Se ha aprobado la solicitud por presidencia de manera satisfactoria',
                timer:5000,
                showConfirmButton:false,
                showCancelButton:false,
            })
            setAprobar(false)
            handleClear()
            navigate('/bitacora/creditos')
          })
          .catch(()=>{
            setAprobar(false)
            Swal.fire({
              icon:'warning',
              title:'¡ERROR!',
              text:'Ha ocurrido un error al momento de aprobar el crédito por presidencia. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
              showConfirmButton:true,
              confirmButtonColor: '#0101b5',
              showCancelButton:false
            })
          })
        })
        .catch(()=>{
          Swal.fire({
            icon:'error',
            title:'¡ERROR!',
            text:'Ha ocurrido un error al momento de aprobar el crédito por el comité de crédito. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
            confirmButtonColor:'red',
            confirmButtonText:'OK',
            showCancelButton:false,
            showConfirmButton:true
          })
        })
    } else if(user.role === 'comite1' && suggestions.credito.estado === 'Comité 1'){
      const body = {
        estado: 'Comité 2'
      }
      updateCredito(suggestions.credito.id,body)
        .then(()=>{
          const item = {
            id: suggestions.id
          }
          mailComite2(item)
          .then(()=>{
            Swal.fire({
                icon:'success',
                title:'¡Felicidades!',
                text:'Se ha aprobado la solicitud por el comité de crédito 1 de manera satisfactoria',
                timer:5000,
                showConfirmButton:false,
                showCancelButton:false,
            })
            setAprobar(false)
            handleClear()
            navigate('/bitacora/creditos')
          })
          .catch(()=>{
            setAprobar(false)
            Swal.fire({
              icon:'warning',
              title:'¡ERROR!',
              text:'Ha ocurrido un error al momento de aprobar el crédito por el comité de crédito. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
              showConfirmButton:true,
              confirmButtonColor: '#0101b5',
              showCancelButton:false
            })
          })
        })
        .catch(()=>{
          Swal.fire({
            icon:'error',
            title:'¡ERROR!',
            text:'Ha ocurrido un error al momento de aprobar el crédito por el comité de crédito. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
            confirmButtonColor:'red',
            confirmButtonText:'OK',
            showCancelButton:false,
            showConfirmButton:true
          })
        })
    } else if(user.role === 'comite2' && suggestions.credito.estado === 'Comité 2'){
      const body = {
        estado: 'Gerencia'
      }
      updateCredito(suggestions.credito.id,body)
        .then(()=>{
          const item = {
            id: suggestions.id
          }
          mailGerencia(item)
          .then(()=>{
            Swal.fire({
                icon:'success',
                title:'¡Felicidades!',
                text:'Se ha aprobado la solicitud por gerencia de manera satisfactoria',
                timer:5000,
                showConfirmButton:false,
                showCancelButton:false,
            })
            setAprobar(false)
            handleClear()
            navigate('/bitacora/creditos')
          })
          .catch(()=>{
            setAprobar(false)
            Swal.fire({
              icon:'warning',
              title:'¡ERROR!',
              text:'Ha ocurrido un error al momento de aprobar el crédito por el comité de crédito. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
              showConfirmButton:true,
              confirmButtonColor: '#0101b5',
              showCancelButton:false
            })
          })
        })
        .catch(()=>{
          Swal.fire({
            icon:'error',
            title:'¡ERROR!',
            text:'Ha ocurrido un error al momento de aprobar el crédito por el comité de crédito. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
            confirmButtonColor:'red',
            confirmButtonText:'OK',
            showCancelButton:false,
            showConfirmButton:true
          })
        })
    } else if(user.role === 'gerencia' && suggestions.credito.estado === 'Gerencia'){
      const body = {
        estado: 'Tesoreria',
        fechaAprobacion: new Date(),
      }
      updateCredito(suggestions.credito.id,body)
        .then(()=>{
          const item = {
            id: suggestions.id
          }
          mailTesoreria(item)
          .then(()=>{
            Swal.fire({
                icon:'success',
                title:'¡Felicidades!',
                text:'Se ha aprobado la solicitud por gerencia de manera satisfactoria',
                timer:5000,
                showConfirmButton:false,
                showCancelButton:false,
            })
            setAprobar(false)
            handleClear()
            navigate('/bitacora/creditos')
          })
          .catch(()=>{
            setAprobar(false)
            Swal.fire({
              icon:'warning',
              title:'¡ERROR!',
              text:'Ha ocurrido un error al momento de aprobar el crédito por el comité de crédito. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
              showConfirmButton:true,
              confirmButtonColor: '#0101b5',
              showCancelButton:false
            })
          })
        })
        .catch(()=>{
          Swal.fire({
            icon:'error',
            title:'¡ERROR!',
            text:'Ha ocurrido un error al momento de aprobar el crédito por el comité de crédito. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
            confirmButtonColor:'red',
            confirmButtonText:'OK',
            showCancelButton:false,
            showConfirmButton:true
          })
        })
    } else{
      Swal.fire({
        icon:'error',
        title:'¡ERROR!',
        text:'NO TIENES PERMISO PARA LLEVAR A CABO ESTA ACCION.',
        confirmButtonColor:'red',
        confirmButtonText:'OK',
        showCancelButton:false,
        showConfirmButton:true
      })
      .then(()=>{
        window.location.href = "about:blank"
      })
    }
  }

  const handleRechazarCredito = (e) => {
    e.preventDefault();
    
    // Muestra la barra de carga
    let timerInterval;
    Swal.fire({
      title: 'Registrando...',
      text: 'Por favor, espera mientras se registra la respuesta a la solicitud de crédito...',
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

    setRechazar(true)
    const body = {
      estado: 'Rechazado',
      motivo: motivo ? motivo.toUpperCase() : '',
    }
    if(user.role === 'Presidente' && suggestions.credito.estado === 'Presidente'){
      updateCredito(suggestions.credito.id,body)
        .then(()=>{
          const info = {
            suggestions,
            user: 'Presidente',
            motivo: motivo ? motivo.toUpperCase() : '',
          }
          mailRejectPresidente(info)
          .then(()=>{
            Swal.fire({
              icon:'error',
              title:'¡RECHAZADO!',
              text:'Se ha rechazado la solicitud por presidencia.',
              timer:5000,
              showConfirmButton:false,
              showCancelButton:false,
            })
            setAprobar(false)
            handleClear()
            closeModal()
            navigate('/bitacora/creditos')
          })
          .catch(()=>{
            setAprobar(false)
            Swal.fire({
              icon:'warning',
              title:'¡ERROR!',
              text:'Ha ocurrido un error al momento de rechazar el crédito por presidencia. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
              showConfirmButton:true,
              confirmButtonColor: '#0101b5',
              showCancelButton:false
            })
          })
        })
        .catch(()=>{
          Swal.fire({
            icon:'error',
            title:'¡ERROR!',
            text:'Ha ocurrido un error al momento de rechazar el crédito por el comité de crédito. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
            confirmButtonColor:'red',
            confirmButtonText:'OK',
            showCancelButton:false,
            showConfirmButton:true
          })
        })
    }else if(user.role === 'comite' && suggestions.credito.estado === 'Comité 1'){
      updateCredito(suggestions.credito.id,body)
        .then(()=>{
          const info = {
            suggestions,
            user: 'Comité de crédito',
            motivo: motivo ? motivo.toUpperCase() : '',
          }
          mailRejectComite(info)
          .then(()=>{
            Swal.fire({
                icon:'error',
                title:'¡RECHAZADO!',
                text:'Se ha rechazado la solicitud por el comité de crédito.',
                timer:5000,
                showConfirmButton:false,
                showCancelButton:false,
            })
            setRechazar(false)
            handleClear()
            closeModal()
            navigate('/bitacora/creditos')
          })
          .catch(()=>{
            setAprobar(false)
            Swal.fire({
              icon:'warning',
              title:'¡ERROR!',
              text:'Ha ocurrido un error al momento de rechazar el crédito por el comité de crédito. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
              showConfirmButton:true,
              confirmButtonColor: '#0101b5',
              showCancelButton:false
            })
          })
        })
        .catch(()=>{
          Swal.fire({
            icon:'error',
            title:'¡ERROR!',
            text:'Ha ocurrido un error al momento de rechazar el crédito por el comité de crédito. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
            confirmButtonColor:'red',
            confirmButtonText:'OK',
            showCancelButton:false,
            showConfirmButton:true
          })
        })
    }else if(user.role === 'comite' && suggestions.credito.estado === 'Comité 2'){
      updateCredito(suggestions.credito.id,body)
        .then(()=>{
          const info = {
            suggestions,
            user: 'Comité de crédito',
            motivo: motivo ? motivo.toUpperCase() : '',
          }
          mailRejectComite(info)
          .then(()=>{
            Swal.fire({
                icon:'error',
                title:'¡RECHAZADO!',
                text:'Se ha rechazado la solicitud por el comité de crédito.',
                timer:5000,
                showConfirmButton:false,
                showCancelButton:false,
            })
            setRechazar(false)
            handleClear()
            closeModal()
            navigate('/bitacora/creditos')
          })
          .catch(()=>{
            setAprobar(false)
            Swal.fire({
              icon:'warning',
              title:'¡ERROR!',
              text:'Ha ocurrido un error al momento de rechazar el crédito por el comité de crédito. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
              showConfirmButton:true,
              confirmButtonColor: '#0101b5',
              showCancelButton:false
            })
          })
        })
        .catch(()=>{
          Swal.fire({
            icon:'error',
            title:'¡ERROR!',
            text:'Ha ocurrido un error al momento de rechazar el crédito por el comité de crédito. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
            confirmButtonColor:'red',
            confirmButtonText:'OK',
            showCancelButton:false,
            showConfirmButton:true
          })
        })
    }else if(user.role === 'gerencia' && suggestions.credito.estado === 'Gerencia'){
      updateCredito(suggestions.credito.id,body)
        .then(()=>{
          const info = {
            suggestions,
            user: 'Gerencia',
            motivo: motivo ? motivo.toUpperCase() : '',
          }
          mailRejectGerencia(info)
          .then(()=>{
            Swal.fire({
                icon:'error',
                title:'¡RECHAZADO!',
                text:'Se ha rechazado la solicitud por Gerencia.',
                timer:5000,
                showConfirmButton:false,
                showCancelButton:false,
            })
            setRechazar(false)
            handleClear()
            closeModal()
            navigate('/bitacora/creditos')
          })
          .catch(()=>{
            setAprobar(false)
            Swal.fire({
              icon:'warning',
              title:'¡ERROR!',
              text:'Ha ocurrido un error al momento de rechazar el crédito por el comité de crédito. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
              showConfirmButton:true,
              confirmButtonColor: '#0101b5',
              showCancelButton:false
            })
          })
        })
        .catch(()=>{
          Swal.fire({
            icon:'error',
            title:'¡ERROR!',
            text:'Ha ocurrido un error al momento de rechazar el crédito por el comité de crédito. Vuelve a intentar, si el problema persiste comunícate con el área de sistemas.',
            confirmButtonColor:'red',
            confirmButtonText:'OK',
            showCancelButton:false,
            showConfirmButton:true
          })
        })
    }else{
      Swal.fire({
        icon:'error',
        title:'¡ERROR!',
        text:'NO TIENES PERMISO PARA LLEVAR A CABO ESTA ACCION.',
        confirmButtonColor:'red',
        confirmButtonText:'OK',
        showCancelButton:false,
        showConfirmButton:true
      })
      .then(()=>{
        closeModal()
        window.location.href = "about:blank"
      })
    }
  }

  const handleClear = () => {
    setSuggestions({})
    setMotivo('')
  }

  return (
    <div className="d-flex flex-column container">
      <Navbar /> 
      <div className="d-flex flex-column gap-2 h-100 mt-5">
        <Modal show={showModal} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title className='d-flex justify-content-center w-100 fw-bold' style={{color:'#0101b5'}}>Razón de rechazo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formWeight">
            <div className="d-flex flex-column mb-1 mt-2">
              <textarea
                id="observations"
                className="form-control"
                placeholder='Escribe aquí la razón por la cual lo vas rechazar'
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                style={{ minHeight: 70, maxHeight: 100, fontSize: 12 , backgroundColor:'whitesmoke' , textTransform:'uppercase' }}
              ></textarea>
            </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={(e)=>(handleRechazarCredito(e))}>
              ENVIAR
            </Button>
            <Button variant="danger" onClick={(e)=>(closeModal(e))}>
              CANCELAR
            </Button>
          </Modal.Footer>
        </Modal>
        {!isMobile ? (
          <div className="d-flex div-botons justify-content-center align-items-center">
            
            <button
              id='estudio'
              title="ESTUDIO DE CRÉDITO"
              style={{
                /* transform: showEstudio ? 'scale(1.1)' : 'scale(0.9)',
                transition: 'all 0.3s ease', */
                border: '3px solid #0101b5',
                borderColor: '#0101b5',
                color: showEstudio ? 'white' : '#0101b5',
                backgroundColor: showEstudio ? '#0101b5' : 'white',
                width: '75%'/* isMobile ? (showSolicitud ? '75%':'87%') : (showSolicitud ? '50%':'75%'), */
              }}
              onClick={(e)=>handleVerify(e)}
              className="d-flex align-items-center text-nowrap btn btn-sm gap-1 mt-1 justify-content-center " 
            >
                ESTUDIO DE CRÉDITO
                <MdIcons.MdOutlineInventory />
            </button>
            <button
              title="SOLICITUD DE CRÉDITO"
              id='solicitud'
              style={{
                /* transform: showSolicitud ? 'scale(1.1)' : 'scale(0.9)',
                transition: 'all 0.3s ease', */
                border: '3px solid #0101b5',
                borderColor: '#0101b5',
                color: showSolicitud ? 'white' : '#0101b5',
                backgroundColor: showSolicitud ? '#0101b5' : 'white',
                width: '75%'/* isMobile ? (showEstudio ? '75%':'87%'):(showEstudio ? '50%':'75%') */,
              }}
              onClick={(e)=>handleVerify(e)}
              className="d-flex align-items-center text-nowrap btn btn-sm btn-warning gap-1 mt-1 justify-content-center " 
            >
                SOLICITUD DE CRÉDITO
                <MdOutlinePendingActions />
            </button>
            <button
              id='simulador'
              title="SIMULADOR DE CRÉDITO"
              style={{
                /* transform: showEstudio ? 'scale(1.1)' : 'scale(0.9)',
                transition: 'all 0.3s ease', */
                border: '3px solid #0101b5',
                borderColor: '#0101b5',
                color: showSimulador ? 'white' : '#0101b5',
                backgroundColor: showSimulador ? '#0101b5' : 'white',
                width:'75%' /* isMobile ? (showSolicitud ? '75%':'87%') : (showSolicitud ? '50%':'75%'), */
              }}
              onClick={(e)=>handleVerify(e)}
              className="d-flex align-items-center text-nowrap btn btn-sm gap-1 justify-content-center " 
            >
                SIMULADOR DE CRÉDITO
                <BsCalculator />
            </button>
            <button
              id='relacion'
              title="RELACION DE CUENTAS Y TERCEROS"
              style={{
                /* transform: showEstudio ? 'scale(1.1)' : 'scale(0.9)',
                transition: 'all 0.3s ease', */
                border: '3px solid #0101b5',
                borderColor: '#0101b5',
                color: showRelacion ?  'white' : '#0101b5',
                backgroundColor: showRelacion ? '#0101b5' : 'white',
                width: '75%'/* isMobile ? (showSolicitud ? '75%':'87%') : (showSolicitud ? '50%':'75%'), */
              }}
              onClick={(e)=>handleVerify(e)}
              className="d-flex align-items-center text-nowrap btn btn-sm gap-1 justify-content-center " 
            >
                RELACION DE CUENTAS Y TERCEROS
                <GiRead  />
            </button>
          </div>
        ):(
          <div className='d-flex justify-content-center w-100 mt-3'>
            <button
              onClick={(e)=>setModalMenu(true)}
            >
              <CgMenuGridO />
            </button>
            <Modal show={modalMenu} onHide={closeModalMenu} centered>
              <Modal.Header closeButton className="d-flex w-100 justify-content-center text-aling-center">
                <Modal.Title className="d-flex w-100 justify-content-center text-aling-center fw-bold text-success" style={{fontSize:40}}>
                  MENÚ
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="p-2">
              <div className="d-flex div-botons justify-content-center align-items-center mb-2">
              <button
                  id='estudio'
                  title="ESTUDIO DE CRÉDITO"
                  style={{
                    /* transform: showEstudio ? 'scale(1.1)' : 'scale(0.9)',
                    transition: 'all 0.3s ease', */
                    border: '3px solid #0101b5',
                    borderColor: '#0101b5',
                    color: showEstudio ? 'white' : '#0101b5',
                    backgroundColor: showEstudio ? '#0101b5' : 'white',
                    width: '100%'/* isMobile ? (showSolicitud ? '75%':'87%') : (showSolicitud ? '50%':'75%'), */
                  }}
                  onClick={(e)=>handleVerify(e)}
                  className="d-flex align-items-center btn btn-sm gap-1 mt-1 justify-content-center " 
                >
                    ESTUDIO DE CRÉDITO
                    <MdIcons.MdOutlineInventory />
                </button>
                <button
                  title="SOLICITUD DE CRÉDITO"
                  id='solicitud'
                  style={{
                    /* transform: showSolicitud ? 'scale(1.1)' : 'scale(0.9)',
                    transition: 'all 0.3s ease', */
                    border: '3px solid #0101b5',
                    borderColor: '#0101b5',
                    color: showSolicitud ? 'white' : '#0101b5',
                    backgroundColor: showSolicitud ? '#0101b5' : 'white',
                    width: '100%'/* isMobile ? (showEstudio ? '75%':'87%'):(showEstudio ? '50%':'75%') */,
                  }}
                  onClick={(e)=>handleVerify(e)}
                  className="d-flex align-items-center btn btn-sm btn-warning gap-1 mt-1 justify-content-center " 
                >
                    SOLICITUD DE CRÉDITO
                    <MdOutlinePendingActions />
                </button>
                
                <button
                  id='simulador'
                  title="SIMULADOR DE CRÉDITO"
                  style={{
                    /* transform: showEstudio ? 'scale(1.1)' : 'scale(0.9)',
                    transition: 'all 0.3s ease', */
                    border: '3px solid #0101b5',
                    borderColor: '#0101b5',
                    color: showSimulador ? 'white' : '#0101b5',
                    backgroundColor: showSimulador ? '#0101b5' : 'white',
                    width:'100%' /* isMobile ? (showSolicitud ? '75%':'87%') : (showSolicitud ? '50%':'75%'), */
                  }}
                  onClick={(e)=>handleVerify(e)}
                  className="d-flex align-items-center btn btn-sm gap-1 justify-content-center " 
                >
                    SIMULADOR DE CRÉDITO
                    <BsCalculator />
                </button>
                <button
                  id='relacion'
                  title="RELACION DE CUENTAS Y TERCEROS"
                  style={{
                    /* transform: showEstudio ? 'scale(1.1)' : 'scale(0.9)',
                    transition: 'all 0.3s ease', */
                    border: '3px solid #0101b5',
                    borderColor: '#0101b5',
                    color: showRelacion ?  'white' : '#0101b5',
                    backgroundColor: showRelacion ? '#0101b5' : 'white',
                    height:'auto',
                    width: '100%'/* isMobile ? (showSolicitud ? '75%':'87%') : (showSolicitud ? '50%':'75%'), */
                  }}
                  onClick={(e)=>handleVerify(e)}
                  className="d-flex align-items-center btn btn-sm gap-1 justify-content-center h-auto " 
                >
                  RELACION DE CUENTAS Y TERCEROS
                  <GiRead  />
                </button>
              </div>
              </Modal.Body>
            </Modal> 
          </div>
        )}
        
          <div>
            {showEstudio && (
              <AllPackEstudio search={suggestions} />
            )}
            {showSolicitud && (
              <AllPackSolicitud search={suggestions.credito} />
            )}
            {showSimulador && (
              <div>
                <CarpetaArchivoLink carpeta={`${format(new Date(suggestions.credito.createdAt), 'yyyy-MM-dd')}_${suggestions.credito.nombre}`} archivo={`simulador_credito.pdf`}/>
              </div>
            )}
            {showRelacion && (
              <CarpetaArchivoLink carpeta={`${format(new Date(suggestions.credito.createdAt), 'yyyy-MM-dd')}_${suggestions.credito.nombre}`} archivo={`relacion_cuentas_y_terceros.pdf`}/>
            )}
          </div>

        <div className="d-flex flex-row gap-3 mb-2">
          <button
            type="submit"
            className="bt-envio fw-bold w-100"
            style={{fontSize:13}}
            onClick={(e)=>handleAprobarCredito(e)}
          >
            {aprobar ? <strong>APROBANDO... <GiSandsOfTime /></strong>:'APROBAR'}
          </button>
          <button
            type="button"
            className="bt-cancelar fw-bold w-100"
            style={{fontSize:13}}
            onClick={(e)=>openModal(e)}
          >
            {rechazar ? <strong>RECHAZANDO... <GiSandsOfTime /></strong>:'RECHAZAR'}
          </button>
        </div>
      </div>
    </div>
  );
}
