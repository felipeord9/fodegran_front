import { useContext } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import "./styles.css";

export default function AllPackEstudio({ search }) {

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center h-100 w-100 m-auto">
        <div
          className="container d-flex flex-column w-100 py-2"
          style={{ fontSize: 10.5 }}
        >
          <h1 className="text-center fs-5 fw-bold " style={{ color: "blue" }}>
            Estudio de crédito
          </h1>

          <form className="">
            <div
              className="rounded shadow-sm p-0 mb-3 "
              style={{ backgroundColor: "whitesmoke", borderRadius: 5 }}
            >
              <div className="d-flex flex-column gap-1">
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
                      <label>Fecha afiliación:</label>
                      <input
                        id="nombre"
                        type="Date"
                        value={search.credito && new Date(search.credito.fechaAfiliacion).toISOString().split("T")[0]}
                        className="form-control form-control-sm"
                        disabled
                      />
                    </div>
                    
                    <div className="d-flex flex-column align-items-start">
                      <label>Empresa:</label>
                      <input
                        id="nombre"
                        type="text"
                        value={search.credito && search.credito.nombreAgencia}
                        className="form-control form-control-sm"
                        disabled
                      />
                    </div>
                    <div className="d-flex flex-column align-items-start">
                      <label>Ciudad:</label>
                      <input
                        id="nombre"
                        type="text"
                        value={search.credito && search.credito.ciudadAgencia}
                        className="form-control form-control-sm"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <hr className="my-1" />
                <div>
                  <label className="fw-bold">INFORMACIÓN EMPRESA</label>

                  {/* informacion de la empresa */}
                  <div className="row row-cols-sm-2 mt-1 mb-2">
                    <div className="d-flex flex-column align-items-start">
                      <label>Fecha de ingreso:</label>
                      <input
                        id="FechaIngreso"
                        type="date"
                        value={
                          search.FechaIngreso &&
                          new Date(search.FechaIngreso)
                            .toISOString()
                            .split("T")[0]
                        }
                        className="form-control form-control-sm"
                        disabled
                        autoComplete="off"
                      />
                    </div>
                    <div className="d-flex flex-column align-items-start">
                      <TextField
                        id="salarioBasico"
                        label="Salario básico"
                        value={
                          search &&
                          Number(search.salarioBasico).toLocaleString("es-ES")
                        }
                        className="w-100 me-3"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                          inputMode: "numeric",
                        }}
                        variant="standard"
                        autoComplete="off"
                        disabled
                      />
                    </div>
                  </div>

                  <hr className="mt-1 mb-1" />

                  <label className="fw-bold mt-1">
                    INFORMACIÓN DEL PERIODO ACTUAL
                  </label>

                  {/* Informacion del periodo actual con el gran langostino */}
                  <div className="row row-cols-sm-4 mt-1">
                    <div className="d-flex flex-column align-items-start">
                      <TextField
                        id="cesantias"
                        label="Cesantias"
                        value={
                          search &&
                          Number(search.cesantias).toLocaleString("es-ES")
                        }
                        className="w-100 me-3"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                          inputMode: "numeric",
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
                        value={
                          search &&
                          Number(search.primas).toLocaleString("es-ES")
                        }
                        className="w-100 me-3"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                          inputMode: "numeric",
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
                        value={
                          search &&
                          Number(search.vacaciones).toLocaleString("es-ES")
                        }
                        className="w-100 me-3"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                          inputMode: "numeric",
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
                          value={
                            search &&
                            Number(search.libranza).toLocaleString("es-ES")
                          }
                          className="w-100 me-3"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                            inputMode: "numeric",
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
                        id="otrosDescuentos"
                        label="Otros descuentos"
                        value={
                          search &&
                          Number(search.otrosDescuentos).toLocaleString("es-ES")
                        }
                        className="w-100 me-3"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                          inputMode: "numeric",
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
                        value={
                          search &&
                          Number(search.totalDescuentoEmpresa).toLocaleString(
                            "es-ES"
                          )
                        }
                        className="w-100 me-3"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                          inputMode: "numeric",
                        }}
                        variant="standard"
                        autoComplete="off"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <hr className="mt-1 mb-1" />

                <label className="fw-bold mt-1">INFORMACIÓN FODEGRAN</label>
                <div className="row row-cols-sm-4 mt-1">
                  <div className="d-flex flex-column align-items-start">
                    <TextField
                      id="aporteTotalObligatorio"
                      label="Aporte total obligatorio"
                      value={
                        search &&
                        Number(search.aporteTotalObligatorio).toLocaleString(
                          "es-ES"
                        )
                      }
                      className="w-100 me-3"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                        inputMode: "numeric",
                      }}
                      variant="standard"
                      autoComplete="off"
                      required
                      disabled
                    />
                  </div>
                  <div className="d-flex flex-column align-items-start">
                    <TextField
                      id="saldoAhorro"
                      label="Saldo ahorro a la vista"
                      value={
                        search &&
                        Number(search.saldoAhorro).toLocaleString("es-ES")
                      }
                      className="w-100 me-3"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                        inputMode: "numeric",
                      }}
                      variant="standard"
                      autoComplete="off"
                      required
                      disabled
                    />
                  </div>
                  <div className="d-flex flex-column align-items-start">
                    <TextField
                      id="tasa"
                      label="Tasa"
                      value={search && search.tasa}
                      className="w-100 me-3"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                        inputMode: "numeric",
                      }}
                      disabled
                      variant="standard"
                      autoComplete="off"
                      required
                    />
                  </div>
                  {/* {JSON.stringify(search)} */}
                  <div className="d-flex flex-column align-items-start">
                    <label>Posee crédito actualmente:</label>
                    <div className="modalidad-pago w-100 justify-content-center">
                      <FormControlLabel
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "1rem", // Cambia el tamaño del texto del label
                          },
                        }}
                        label="Si"
                        disabled
                        control={
                          <Checkbox
                            placeholder="si"
                            color="success"
                            sx={{
                              "& .MuiSvgIcon-root": { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                            }}
                            checked={search && search.poseeCredito === "si"}
                          />
                        }
                      />
                      <FormControlLabel
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "1rem", // Cambia el tamaño del texto del label
                          },
                        }}
                        disabled
                        label="No"
                        control={
                          <Checkbox
                            placeholder="no"
                            color="success"
                            sx={{
                              "& .MuiSvgIcon-root": { fontSize: 21 }, // Cambia el tamaño del ícono del checkbox
                            }}
                            checked={search && search.poseeCredito === "no"}
                          />
                        }
                      />
                    </div>
                  </div>
                </div>
                {/* {JSON.stringify(search)} */}
                {search.poseeCredito === "si" && (
                  <div>
                    <div className="row row-cols-sm-3 mt-1 mb-3">
                      <div className="d-flex flex-column align-items-start">
                        <TextField
                          id="saldoFecha"
                          label="Saldo a la fecha"
                          value={
                            search &&
                            Number(search.saldoFecha).toLocaleString("es-ES")
                          }
                          className="w-100 me-3"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                            inputMode: "numeric",
                          }}
                          disabled
                          variant="standard"
                          autoComplete="off"
                        />
                      </div>
                      <div className="d-flex flex-column align-items-start">
                        <TextField
                          id="cuotaMensual"
                          label="Cuota mensual crédito"
                          value={
                            search &&
                            Number(search.cuotaMensual).toLocaleString("es-ES")
                          }
                          className="w-100 me-3"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                            inputMode: "numeric",
                          }}
                          variant="standard"
                          autoComplete="off"
                          disabled
                        />
                      </div>
                      <div className="d-flex flex-column align-items-start">
                        <TextField
                          id="totalAportesMensuales"
                          label="Total aportes mensual"
                          value={
                            search &&
                            Number(search.totalAportesMensuales).toLocaleString(
                              "es-ES"
                            )
                          }
                          className="w-100 me-3"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                            inputMode: "numeric",
                          }}
                          variant="standard"
                          autoComplete="off"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="row row-cols-sm-3 mt-1 mb-3">
                      <div className="d-flex flex-column align-items-start">
                        <TextField
                          id="aporteVoluntario"
                          label="Aporte total voluntario"
                          value={
                            search &&
                            Number(search.aporteVoluntario).toLocaleString(
                              "es-ES"
                            )
                          }
                          className="w-100 me-3"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                            inputMode: "numeric",
                          }}
                          variant="standard"
                          autoComplete="off"
                          disabled
                        />
                      </div>
                      <div className="d-flex flex-column align-items-start">
                        <TextField
                          id="otros"
                          label="Otros (Solidario y recordar)"
                          value={
                            search &&
                            Number(search.otrosFondo).toLocaleString("es-ES")
                          }
                          className="w-100 me-3"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                            inputMode: "numeric",
                          }}
                          variant="standard"
                          autoComplete="off"
                          disabled
                        />
                      </div>
                      <div className="d-flex flex-column align-items-start">
                        <TextField
                          id="totalDescuentoFondo"
                          label="Total descuento con el fondo"
                          value={
                            search &&
                            Number(search.totalDescuentoFondo).toLocaleString(
                              "es-ES"
                            )
                          }
                          className="w-100 me-3"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                            inputMode: "numeric",
                          }}
                          variant="standard"
                          autoComplete="off"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
