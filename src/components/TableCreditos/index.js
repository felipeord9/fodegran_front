import { useState, useEffect, useContext } from "react";
import DataTable from "react-data-table-component";
import { mailSolicitante } from '../../services/creditosServices';
import DocPaquetaCreditoPDF from "../DocPaquetaCreditoPDF";
import DocEstudioPDF from "../DocEstudioPDF";
import PDFFormSolicitud from "../DocSolicitudPDF";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import AuthContext from "../../context/authContext";
import { findOneByCredito } from "../../services/estudioCreditoService";
import { findOneCredito } from "../../services/creditosServices";
import { FaShareSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import "./styles.css";
import Swal from "sweetalert2";

const styleStatus = {
  Nuevo: "primary",
  "Estudio 1": "secondary",
  "Estudio 2": "dark",
  "Presidente": "muted",
  "Comité 1": "secondary",
  "Comité 2": "info",
  "Gerencia": "muted",
  "Tesoreria": "warning",
  "Rechazado": "danger",
  "Finalizado": "success",
};

function TableCreditos({ creditos, getAll, loading }) {
  const { user } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(null);
  const [selectedCredito, setSelectedCredito] = useState(null);
  const [credito, setCredito] = useState(null);
  const navigate = useNavigate();
  const columns = [
    {
      id: "options",
      name: "",
      center: true,
      cell: (row, index, column, id) =>
        isMobile ? (
          <div className="d-flex gap-2 p-1">
            <PDFDownloadLink
              document={<DocPaquetaCreditoPDF order={row} />}
              fileName={`${row?.coId}-PDV-${row?.rowId}.pdf`}
              onClick={(e) => {
                e.download();
              }}
            >
              <FaIcons.FaDownload />
            </PDFDownloadLink>
          </div>
        ) : (
          <div className="d-flex gap-2 p-1">
            <button
              title="Ver PDF de pedido"
              className="btn btn-sm btn-success"
              onClick={(e) => {
                lookStudy({row})
              }}
              /* setSelectedCredito(row); */
            >
              <FaIcons.FaEye />
            </button>
          </div>
        ),
      width: "50px",
    },
    {
      id: "editar",
      name: "",
      center: true,
      cell: (row, index, column, id) => (
        <div className='d-flex gap-2 p-1'>
          {((user.role === 'presidente' || user.role === 'comite1' || user.role === 'comite2' || user.role === 'gerencia' || user.role === 'admin') && (row.estado === 'Comité 1' || row.estado === 'Comité 2' || row.estado === 'Presidente' || row.estado === 'Gerencia')) ? (
            <button 
              title="Editar registro" className='btn btn-sm'
              style={{background:'#0101b5', color:'white'}}
              onClick={(e) => {
                /* setSelectedCredito(row) */
                navigate(`/ver/paquete/credito/${row.id}`)
              }}
            >
              <FaEdit />
            </button>
          ):((user.role === 'estudio' || user.role === 'admin' ) && row.estado === 'Estudio 1') ? (
            <button 
              title="Editar registro" className='btn btn-sm'
              style={{background:'#0101b5', color:'white'}}
              onClick={(e) => {
                /* setSelectedCredito(row) */
                navigate(`/estudio/credito/${row.id}`)
              }}
            >
              <FaEdit />
            </button>
          ):((user.role === 'auxiliar' || user.role === 'admin') && row.estado === 'Estudio 2') ? (
            <button 
              title="Editar registro" className='btn btn-sm'
              style={{background:'#0101b5', color:'white'}}
              onClick={(e) => {
                /* setSelectedCredito(row) */
                navigate(`/estudio/credito/auxiliar/${row.id}`)
              }}
            >
              <FaEdit />
            </button>
          ):((user.role === 'tesoreria' || user.role === 'admin') && row.estado === 'Tesoreria') && (
            <button 
              title="Editar registro" className='btn btn-sm'
              style={{background:'#0101b5', color:'white'}}
              onClick={(e) => {
                /* setSelectedCredito(row) */
                navigate(`/paquete/tesoreria/${row.id}`)
              }}
            >
              <FaEdit />
            </button>
          )/* :((user.role === 'auxiliar' || user.role === 'admin') && row.estado === 'Nuevo') && (
            <button 
              title="Editar registro" className='btn btn-sm'
              style={{background:'#0101b5', color:'white'}}
              onClick={(e) => {
                mailSolicitante(row)
              }}
            >
              <FaShareSquare />
            </button>
          ) */}
        </div>
      ),
      width: '60px'
    },
    {
      id: "state",
      name: "Estado",
      center: true,
      cell: (row, index, column, id) => (
        <select
          id={row.id}
          
          className={`
              form-control form-control-sm border border-2 border-${
                styleStatus[row.estado]
              } text-center text-${styleStatus[row.estado]}
            `}
          value={row.estado}
          disabled
        >
          <option className="text-primary">Nuevo</option>
          <option className="text-secondary">Estudio 1</option>
          <option className="text-dark">Estudio 2</option>
          <option className="text-muted">Presidente</option>
          <option className="text-secondary">Comité 1</option>
          <option className="text-info">Comité 2</option>
          <option className="text-muted">Gerencia</option>
          <option className="text-warning">Tesoreria</option>
          <option id="reasonForRejection" className="text-danger">Rechazado</option>
          <option id="reasonForDelivery" className="text-success">entregado</option>
          <option className="text-success">Finalizado</option>
        </select>
      ),
      width: "180px",
    },
    {
      id: "rowId",
      name: "No. identificación",
      selector: (row) => row?.rowId,
      sortable: true,
      width: "160px",
    },
    {
      id: "nombre",
      name: "Nombre",
      selector: (row) => row?.nombre,
      sortable: true,
      width: "250px",
    },
    {
      id: "agencia",
      name: "Agencia",
      selector: (row) => row?.nombreAgencia,
      sortable: true,
      width: "270px",
    },
    {
      id: "valorSolicitado",
      name: "Valor solicitado",
      selector: (row) => `$ ${Number(row?.valorSolicitado).toLocaleString("ES-es")}`,
      sortable: true,
      width: "170px",
    },
    {
      id: "createdAt",
      name: "Fecha solitud",
      selector: (row) => row && new Date(row?.createdAt)?.toISOString()?.split("T")[0],
      sortable: true,
      width: "140px",
    },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", () =>
      setIsMobile(mediaQuery.matches)
    );
    return () =>
      mediaQuery.removeEventListener("change", () =>
        setIsMobile(mediaQuery.matches)
      );
  }, []);

  const lookStudy = async ({row}) =>{
    await findOneByCredito(row.id)
    .then(({data})=>{
      setSelectedCredito(data)
    })
    .catch(()=>{
      findOneCredito(row.id)
      .then(({data})=>{
        setCredito(data)
      })
      .catch(()=>{
        Swal.fire({
          title:'¡ERROR!',
          text:'Ha ocurrido un error al momento de extraer la información. Intentalo mas tarde.'
        })
      })
    })
  }

  return (
    <div
      className="d-flex flex-column rounded m-0 p-0"
      style={{ height: "calc(100vh - 120px)", width: "100%"}}
    >
      {/* {JSON.stringify(creditos)} */}
      <DataTable
        className="bg-light text-center border border-2 h-100 p-0 m-0"
        columns={columns}
        data={creditos}
        fixedHeaderScrollHeight={200}
        progressPending={loading}
        progressComponent={
          <div class="d-flex align-items-center text-danger gap-2 mt-2">
            <strong>Cargando...</strong>
            <div
              class="spinner-border spinner-border-sm ms-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        }
        dense
        striped
        fixedHeader
        pagination
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página:",
          rangeSeparatorText: "de",
          selectAllRowsItem: false,
        }}
        paginationPerPage={50}
        paginationRowsPerPageOptions={[15, 25, 50, 100]}
        noDataComponent={
          <div style={{ padding: 24 }}>Ningún resultado encontrado.</div>
        }
      />

      {/* Modal cuando hay estudio pdf */}
      <Modal
        size="lg"
        show={Boolean(selectedCredito && !isMobile)}
        onHide={() => setSelectedCredito(null)}
      >
        <PDFViewer
          className="rounded"
          style={{
            width: "100%",
            height: "90vh",
          }}
          showToolbar={true}
        >
          <DocPaquetaCreditoPDF credito={selectedCredito} />
        </PDFViewer>
      </Modal>

      {/* modal cuando solo hay solicitud */}
      <Modal
        size="lg"
        show={Boolean(credito && !isMobile)}
        onHide={() => setCredito(null)}
      >
        <PDFViewer
          className="rounded"
          style={{
            width: "100%",
            height: "90vh",
          }}
          showToolbar={true}
        >
          <PDFFormSolicitud credito={credito} />
        </PDFViewer>
      </Modal>
    </div>
  );
}

export default TableCreditos;
