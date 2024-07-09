import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SolicitudCredito from './pages/solicitudCredito';
import Afiliacion from './pages/Afiliacion';
import PrivateRoute from "./components/PrivateRoute";
import Odontologia from './pages/odontologia';
import Navbar from './components/Navbar';
import Bitacora from './pages/bitacora';
import Login from './pages/login';
import { AuthContextProvider } from './context/authContext';
import { ClientContextProvider } from "./context/clientContext";
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
              <Route path='/bitacora' element={<PrivateRoute component={Bitacora} />} />
              {/* <Route path='/inicio' element={<PrivateRoute component={Orders} />} /> */}
            </Routes>
          {/* </div> */}
        </Router>
      </ClientContextProvider>
    </AuthContextProvider>
  );
}

export default App;
