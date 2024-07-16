import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContextProvider } from './context/authContext';
import { ClientContextProvider } from "./context/clientContext";
import SolicitudCredito from './pages/solicitudCredito';
import Afiliacion from './pages/Afiliacion';
import PrivateRoute from "./components/PrivateRoute";
import Odontologia from './pages/odontologia';
import Navbar from './components/Navbar';
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
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthContextProvider>
      <ClientContextProvider>
        <Router>
          {/* <Navbar /> */}
          {/* <div id='wrapper' className="d-flex vh-100 overflow-auto p-0"> */}
            <Routes>
              <Route path='/' element={<Navigate to="/Solicitud/credito" />} />
              <Route path='/odontologia' element={<Odontologia />} />
              <Route path='/Solicitud/credito' element={<SolicitudCredito />} />
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
              <Route path='/recuperacion/contrasena//:token' element={<RecoveryPassword/>} />
              {/* <Route path='/inicio' element={<PrivateRoute component={Orders} />} /> */}
            </Routes>
          {/* </div> */}
        </Router>
      </ClientContextProvider>
    </AuthContextProvider>
  );
}

export default App;
