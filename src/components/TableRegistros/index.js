import { useState, useEffect, useContext } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import ModalSolicitud from "../ModalSolicitud";
import AuthContext from "../../context/authContext";
import * as FaIcons from "react-icons/fa";
import EditarRegistro from "../../pages/editarRegistro";
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/system';
import { updateOdontologia } from "../../services/odontologiaService";
import "./styles.css";

const styleStatus = {
  "pedido nuevo": "primary",
  alistamiento: "secondary",
  "verificando pago": "info",
  "en ruta": "warning",
  rechazado: "danger",
  entregado: "success",
};

const conditionalRowStyles = [
  {
    when: row => row?.estado === 'NUEVO',
    style: {
      backgroundColor: '#e4f4fd',
    },
  },
];

const customStyles = {
  headCells: {
    style: {
      fontSize: '12.5px',
      opacity:0.9,
      color:'black',
      class:'fw-bold',
      fontWeight: 'bold',
    },
  },
};

function TableRegistros({ registros, getAll, loading }) {
  const { user } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(null);
  const [selectedRegistro, setSelectedRegistro] = useState(null);
  const [ showModal , setShowModal ] = useState(false)
  const navigate = useNavigate();

  const columns = [
    {
      id: "options",
      name: "",
      center: true,
      cell: (row, index, column, id) =>
        <div>
          <button
              title="Ver PDF de pedido"
              className="m-1 boton-ojo"
              onClick={(e) => {
                localStorage.setItem('registro',JSON.stringify(row));
                navigate('/editar/registro')
              }}
            >
              <FaIcons.FaEye />
          </button>
        </div>
        ,
      width: "50px",
    },
    {
      id: "idCotizante",
      name: "No.identificación",
      selector: (row) => row.idCotizante,
      sortable: true,
      width: "170px",
    },
    {
      id: "nameCotizante",
      name: "Nombre",
      selector: (row) => row.nameCotizante,
      sortable: true,
      class:'cell'
      /* width: "125px", */
    },
    {
      id: "correoCotizante",
      name: "Correo Elctrónico",
      selector: (row) => row.correoCotizante,
      sortable: true,
      class:'cell'
      /* width: "200px", */
    },
    {
      id: "numeroCotizante",
      name: "No.Celular",
      selector: (row) => row.numeroCotizante,
      sortable: true,
      /* class:'cell' */
      width: "200px",
    },
    {
      id: "cortesia",
      name: "Cortesía",
      center: true,
      cell: (row, index, column, id) =>
        <div>
          <HandleCortesia row={row}/>
        </div>
      ,
      sortable: true,
      width: "105px",
    }
  ];

  const adminColumns = [
    {
      id: "options",
      name: "",
      center: true,
      cell: (row, index, column, id) =>
        <div>
          <button
              title="Ver PDF de pedido"
              className="m-1 boton-ojo"
              onClick={(e) => {
                localStorage.setItem('registro',JSON.stringify(row));
                navigate('/editar/registro')
              }}
            >
              <FaIcons.FaEye />
          </button>
        </div>
        ,
      width: "50px",
    },
    {
      id: "idCotizante",
      name: "No.identificación",
      selector: (row) => row.idCotizante,
      sortable: true,
      width: "160px",
    },
    {
      id: "nameCotizante",
      name: "Nombre",
      selector: (row) => row.nameCotizante,
      sortable: true,
      class:'cell'
      /* width: "125px", */
    },
    {
      id: "correoCotizante",
      name: "Correo Elctrónico",
      selector: (row) => row.correoCotizante,
      sortable: true,
      class:'cell'
      /* width: "200px", */
    },
    {
      id: "numeroCotizante",
      name: "No.Celular",
      selector: (row) => row.numeroCotizante,
      sortable: true,
      /* class:'cell' */
      width: "200px",
    },
    {
      id: "estado",
      name: "Estado",
      selector: (row) => row.estado,
      sortable: true,
      /* class:'cell' */
      width: "130px",
    },
    {
      id: "revisado",
      name: "",
      center: true,
      cell: (row, index, column, id) =>
        <div>
          <HandleRevisado row={row}/>
        </div>
      ,
      sortable: true,
      width: "50px",
    },
    {
      id: "cortesia",
      name: "Cortesía",
      center: true,
      cell: (row, index, column, id) =>
        <div>
          <HandleCortesia row={row}/>
        </div>
      ,
      sortable: true,
      width: "105px",
    },
  ];

  const HandleRevisado = ({row}) => {
    const revisado = {
      estado:'REVISADO'
    }
    const handleClick = (e) => {
      e.preventDefault();
      if(row.estado==='NUEVO'){
        Swal.fire({
          icon:'warning',
          title:'¡ATENCIÓN!',
          text:'Debes primero revisar la información antes de cambiar el estado del registro. Da click en "REVISAR", para continuar con la revisión.',
          showConfirmButton:true,
          confirmButtonText:'REVISAR',
          confirmButtonColor:'green',
          showCancelButton:true,
          cancelButtonColor:'red'
        })
        .then(({isConfirmed})=>{
          if(isConfirmed){
            localStorage.setItem('registro',JSON.stringify(row));
            navigate('/revisar/registro')
          }
        })
      }
    }
    return(
      <div>
        <Checkbox
          defaultChecked
          sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
          className="ms-0 ps-0"
          /* disabled={(row.estado === 'NUEVO' && user.role !=='odontologa') ? false : true } */
          checked={row.estado !== 'NUEVO'  && true}
          onClick={(e)=>handleClick(e)}
        />
      </div>
    )
  }

  const HandleCortesia = ({row}) => {
    const revisado = {
      cortesia: true
    }
    const handleClick = (e) => {
      e.preventDefault();
      if(row.cortesia === false){
        Swal.fire({
          icon:'warning',
          title:'¿Estás segur@?',
          text:`Se registrará la limpieza de cortesía para: ${row.nameCotizante}, con número de identificación: ${row.idCotizante}`,
          showConfirmButton:true,
          confirmButtonText:'Confirmar',
          confirmButtonColor:'green',
          showCancelButton:true,
          cancelButtonColor:'red',
          cancelButtonText:'Cancelar'
        })
        .then(({isConfirmed})=>{
          if(isConfirmed){
            updateOdontologia(row.id,revisado)
            .then(()=>{
              Swal.fire({
                icon:'success',
                title:'¡Felicidades!',
                text:`Se ha hecho el registro de cortesía con éxito.`,
                showConfirmButton:true,
                confirmButtonText:'OK',
                confirmButtonColor:'green',
                showCancelButton:false
              })
              getAll()
            })
            .catch(()=>{
              Swal.fire({
                icon:'error',
                title:'¡ERROR!',
                text:`Ha ocurrido un error al momento de hacer el registro de la cortesía. Por favor intentelo de nuevo. Si el problema persiste comunícate con los programadores para darte una rápido y oportuna solución.`,
                showConfirmButton:true,
                confirmButtonText:'OK',
                confirmButtonColor:'red',
                showCancelButton: false,
              })
            })
          }
        })
      }
    }
    return(
      <div>
        <Checkbox
          defaultChecked
          sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
          color="success"
          className="ms-0 ps-0"
          /* disabled={(row.cortesia === true) ? true : false } */
          checked={row.cortesia === true  && true}
          onClick={(e)=>handleClick(e)}
          
        />
      </div>
    )
  }

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


// Ordenar los datos para que los items con estado "nuevo" estén primero
const sortedData = registros.sort((a, b) => {
  if (a.estado === 'NUEVO' && b.estado !== 'NUEVO') {
    return -1;
  }
  if (a.estado !== 'NUEVO' && b.estado === 'NUEVO') {
    return 1;
  }
  return 0;
});

  return (
    <div
      className="d-flex flex-column rounded m-0 p-0 table"
      /* style={{ height: "calc(100% - 60px)", width: "100%" }} */
    >
      <DataTable
        className="bg-light text-center border border-2 h-100 p-0 m-0"
        columns={(user.role==='admin' || user.role==='auxiliar') ? adminColumns : columns }
        data={sortedData}
        fixedHeaderScrollHeight={200}
        progressPending={loading}
        customStyles={customStyles}
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
        defaultSortAsc={true}
        /* defaultSortFieldId="estado" */
        conditionalRowStyles={conditionalRowStyles}
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

      {/* Modal pdf normal */}
      {/* <Modal
        size="lg"
        show={Boolean(selectedOrder && !isMobile)}
        onHide={() => setSelectedOrder(null)}
      >
        <PDFViewer
          className="rounded"
          style={{
            width: "100%",
            height: "90vh",
          }}
          showToolbar={true}
        >
          <DocOrderPDF order={selectedOrder} />
        </PDFViewer>
      </Modal> */}

    </div>
  );
}

export default TableRegistros;
