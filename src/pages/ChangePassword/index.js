import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import InputPassword from "../../components/InputPassword";
import { changePassword } from "../../services/authService";
import NavBitacora from "../../components/NavBitacora";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorInput("La contraseña nueva no coincide");
      return setTimeout(() => setErrorInput(""), 3000);
    }
    if (currentPassword === newPassword) {
      setErrorInput("La contraseña anterior es igual a la actual");
      return setTimeout(() => setErrorInput(""), 3000);
    }

    changePassword({ currentPassword, newPassword })
      .then((data) => {
        Swal.fire({
          title: "¡Correcto!",
          text: "Contraseña actualizada exitosamente",
          icon: "success",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          navigate("/registros/odontologia");
        });
      })
      .catch((error) => {
        setErrorInput("¡Contraseña actual incorrecta!");
        return setTimeout(() => setErrorInput(""), 3000);
      });
  };

  return (
    <div>
      <div>
        <NavBitacora />
      </div>
      <div className="center-container soli border border-4 shadow rounded-4 m-auto">
          <h2 className="text-center fs-4 fw-bold" style={{ color: "#0101b5" }}>
            Cambiar Contraseña
          </h2>
          <form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
            <div>
              <InputPassword
                label="Contraseña Actual"
                password={currentPassword}
                setPassword={setCurrentPassword}
              />
            </div>
            <div>
              <InputPassword
                label="Nueva Contraseña"
                password={newPassword}
                setPassword={setNewPassword}
              />
            </div>
            <div>
              <InputPassword
                label="Confirma la Nueva Contraseña"
                password={confirmNewPassword}
                setPassword={setConfirmNewPassword}
              />
            </div>
            <button
              type="submit"
              className="bt-envio text-light fw-bold mt-1 mb-1"
              style={{ borderRadius:35 }}
            >
              Cambiar contraseña
            </button>
          </form>
          <Link
            to="/registros/odontologia"
            className="text-center mt-2 w-100 d-flex justify-content-center align-items-cemter"
          >
            <RiArrowGoBackFill className="me-1 mt-1" /> Volver
          </Link>
          <span
            className="text-center text-danger m-0"
            style={{ fontSize: 13, height: 0 }}
          >
            {errorInput}
          </span>
        </div>
    </div>
  );
}
