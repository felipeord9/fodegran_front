import { useState, useEffect, useContext } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import ModalSolicitud from "../ModalSolicitud";
import AuthContext from "../../context/authContext";
import * as FaIcons from "react-icons/fa";
import "./styles.css";

const styleStatus = {
  "pedido nuevo": "primary",
  alistamiento: "secondary",
  "verificando pago": "info",
  "en ruta": "warning",
  rechazado: "danger",
  entregado: "success",
};

function TableCreditos({ creditos, getAll, loading }) {
  const { user } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(null);
  const [selectedCredito, setSelectedCredito] = useState(null);
  const [ showModal , setShowModal ] = useState(false)
  const columns = [
    {
      id: "options",
      name: "",
      center: true,
      cell: (row, index, column, id) =>
        <div>
          <ModalSolicitud 
            selectedCredito={selectedCredito} 
            setSelectedCredito={setSelectedCredito} 
            showModal={showModal}
            setShowModal={setShowModal} 
          />
          <button
              title="Ver PDF de pedido"
              className="m-1 boton-ojo"
              onClick={(e) => {
                setSelectedCredito(row);
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
      id: "state",
      name: "Estado",
      center: true,
      cell: (row, index, column, id) => (
        <select
          id={row.id}
          className={`
              form-control form-control-sm border border-2 border-${
                styleStatus[row.state]
              } text-center text-${styleStatus[row.state]}
            `}
          value={row.state}
          disabled={user.role === "vendedor"}
          /* onChange={(e) => updateState(e, row)} */
        >
          <option className="text-primary">pedido nuevo</option>
          <option className="text-secondary">alistamiento</option>
          <option className="text-info">verificando pago</option>
          <option className="text-warning">en ruta</option>
          <option id="reasonForRejection" className="text-danger">rechazado</option>
          <option id="reasonForDelivery" className="text-success">entregado</option>
        </select>
      ),
      width: "175px",
    },
    {
      id: "rowId",
      name: "No. identificación",
      selector: (row) => row.rowId,
      sortable: true,
      width: "200px",
    },
    {
      id: "nombre",
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
      width: "125px",
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

  /* const updateState = (e, credito) => {
    const { value } = e.target;
    console.log(value)
    const optionId = e.target.selectedOptions[0].id
    if (value === "rechazado" || value === "entregado") {
      return Swal.fire({
        input: "textarea",
        inputLabel: "Nota",
        inputPlaceholder:
          "Ingrese aquí la razón del cambio de estado del pedido...",
        inputAttributes: {
          "aria-label": "Ingrese la nota acá.",
        },
        inputValidator: (value) => {
          if (!value) {
            return "¡En necesario escribir algo!";
          }
        },
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        confirmButtonColor: "#dc3545",
        cancelButtonText: "Cancelar",
      }).then(({ isConfirmed, value: input }) => {
        if (isConfirmed && value) {
          let consecutive = 1;
          let text;
          const absConsecutive = credito?.[optionId]?.split("\n");
          if (absConsecutive) {
            consecutive = absConsecutive;
            const nextConsecutive =
              parseInt(consecutive[consecutive?.length - 1].slice(0, 1)) + 1;
            text = `${credito?.[optionId]}\n${nextConsecutive}. ${input} - ${new Date().toLocaleString("es-CO")}`;
          } else {
            text = `${consecutive}. ${input} - ${new Date().toLocaleString("es-CO")}`;
          }
          return updateOrder(credito.id, {
            state: value,
            [optionId]: text,
          }).then((data) => {
            console.log(data);
            getAll();
          });
        }
      });
    } else {
      return updateOrder(order.id, {
        state: value,
      }).then((data) => {
        getAll();
      });
    }
  }; */

  return (
    <div
      className="d-flex flex-column rounded m-0 p-0"
      style={{ height: "calc(100% - 60px)", width: "100%" }}
    >
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

export default TableCreditos;
