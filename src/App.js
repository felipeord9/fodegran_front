import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContextProvider } from './context/authContext';
import { ClientContextProvider } from "./context/clientContext";
import SolicitudCredito from './pages/solicitudCredito';
import Afiliacion from './pages/Afiliacion';
import PrivateRoute from "./components/PrivateRoute";
import Odontologia from './pages/odontologia';
import Bitacora from './pages/bitacora';
import Login from './pages/login';
import LoginOdontologia from './pages/loginOdontologa';
import RegistrosOdontologia from './pages/registrosOdontologia';
import EditarRegistro from './pages/editarRegistro';
import RevisarRegistro from './pages/revisarRegistro';
import ChangePassword from './pages/ChangePassword';
import SendRecoveryPassword from './pages/SendRecoveryPassword';
import RecoveryPassword from './pages/RecoveryPassword';
import ValidarFuncionario from './pages/validarFuncionario';
import Funcionarios from './pages/Funcionarios';
import FirmaEmpleado from './pages/FirmaEmpleado';
import EstudioCredito from './pages/EstudioCredito';
import EstudioCredito2 from './pages/EstudioCredito2';
import PaqueteCredito from './pages/PaqueteCredito';
import PaqueteTesoreria from './pages/PaqueteTesoreria';
import EditarPaqueteCredito from './pages/EditarPaqueteCompleto';
import BitacoraCreditos from './pages/BitacoraCreditos';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <AuthContextProvider>
      <ClientContextProvider>
        <Router>
          {/* <Navbar /> */}
          {/* <div id='wrapper' className="d-flex vh-100 overflow-auto p-0"> */}
            <Routes>
              <Route path='/' element={<Navigate to="/login" />} />
              <Route path='/odontologia' element={<Odontologia />} />

              <Route path='/solicitud/credito' element={<PrivateRoute component={SolicitudCredito} />} />
              <Route path='/solicitud/credito/:token' element={<FirmaEmpleado />} />
              <Route path='/estudio/credito/:token' element={<PrivateRoute component={EstudioCredito} />} />
              <Route path='/estudio/credito/auxiliar/:token' element={<PrivateRoute component={EstudioCredito2} />} />
              <Route path='/paquete/credito/:token' element={<PrivateRoute component={PaqueteCredito}/>} />
              <Route path='/ver/paquete/credito/:id' element={<PrivateRoute component={EditarPaqueteCredito}/>} />
              <Route path='/paquete/tesoreria/:token' element={<PrivateRoute component={PaqueteTesoreria}/>} />
              <Route path='/bitacora/creditos' element={<PrivateRoute component={BitacoraCreditos} />} />

              <Route path='/afiliacion' element={<Afiliacion />} />
              <Route path='/login' element={<Login />} />
              <Route path='/send/recovery' element={<SendRecoveryPassword />} />

              <Route path='/login/odontologia' element={<LoginOdontologia />} />
              <Route path='/registros/odontologia' element={<PrivateRoute component={RegistrosOdontologia} />} />
              <Route path='/editar/registro' element={<PrivateRoute component={EditarRegistro} />} />
              <Route path='/revisar/registro' element={<PrivateRoute component={RevisarRegistro} />} />
              <Route path='/validar/funcionario' element={<PrivateRoute component={ValidarFuncionario} />} />
              <Route path='/funcionarios' element={<PrivateRoute component={Funcionarios} />} />
              <Route path='/bitacora' element={<PrivateRoute component={Bitacora} />} />
              <Route path='/cambiar/contrasena' element={<PrivateRoute component={ChangePassword} />} />
              <Route path='/recuperacion/contrasena/:token' element={<RecoveryPassword/>} />

            </Routes>
          {/* </div> */}
        </Router>
      </ClientContextProvider>
    </AuthContextProvider>
  );
}

export default App;
