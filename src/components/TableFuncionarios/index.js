import { useState, useEffect, useContext } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import ModalSolicitud from "../ModalSolicitud";
import AuthContext from "../../context/authContext";
import * as FaIcons from "react-icons/fa";
import EditarRegistro from "../../pages/editarRegistro";
import Checkbox from '@mui/material/Checkbox';
import { updateOdontologia } from "../../services/odontologiaService";
import "./styles.css";

function TableFUncionarios({ funcionarios, getAll, loading, setSelected, setShowModal }) {
  const { user } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(null);
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
                setSelected(row)
                setShowModal(true)
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
      width: "150px",
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

  return (
    <div
      className="d-flex flex-column rounded m-0 p-0"
      style={{ height: "calc(100% - 60px)", width: "100%" }}
    >
      <DataTable
        className="bg-light text-center border border-2 h-100 p-0 m-0"
        columns={columns}
        data={funcionarios}
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
        defaultSortAsc={true}
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
    </div>
  );
}

export default TableFUncionarios;
