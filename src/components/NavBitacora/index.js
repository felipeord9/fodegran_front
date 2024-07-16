import { useState, useContext , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import AuthContext from "../../context/authContext";
import useUser from "../../hooks/useUser";
import { NavBarData } from "./NavbarData";
import Logo from "../../assets/fodegran.jpeg";
import "./styles.css";

export default function NavBitacora() {
  const { isLogged, logout } = useUser();
  const { token, setToken } = useContext(AuthContext)
  const [showSideBar, setShowSidebar] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [ruta, setRuta] = useState('');

  useEffect(() => {
    // Obtiene la ruta actual
    setRuta(window.location.pathname);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    if(user.role==='odontologa'){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        setToken(null)
        navigate('/login/odontologia')
      }
  }

  return (
    <>
      {isLogged && (
        <div
          className="position-fixed bg-light shadow w-100 d-flex flex-row"
          style={{ fontSize: 11, left: 0, height: "55px", zIndex: 2 }}
        >
          <div className="d-flex flex-row justify-content-between align-items-center w-100 h-100 px-4 shadow">
            <div
              id="logo-header"
              className="d-flex flex-row align-items-center gap-2"
            >
              <img
                src={Logo}
                width={150}
                height={50}
                className="navbar-img"
              />
            </div>
          </div>
          <div className="d-flex flex-row align-items-center" style={{backgroundColor:'white'}}>
              <div
                className="align-items-center rounded-pill p-2 pe-4 logo-user"
                style={{ right: "-20px", height: 25 , backgroundColor:'#0101b5' }}
              >
                <span className="text-light text-nowrap m-0 logo-user">{user.role.toUpperCase()}</span>
              </div>
              <div
                id="btn-session"
                className="dropdown"
                style={{ width: "40px", height: "40px" }}
              >
                <button
                  className="d-flex align-items-center rounded-circle w-100 h-100 m-0 p-0 border border-2 border-light overflow-hidden"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-offset="0,10"
                  style={{backgroundColor:'#0101b5', color:'white'}}
                >
                  <FaIcons.FaUser className="w-100" />
                </button>
                <ul
                  className="dropdown-menu text-center p-0 rounded-3"
                  style={{ width: "250px" }}
                >
                  {(user.role === 'admin' || user.role === 'auxiliar') &&
                  <div>
                    <li style={{ cursor: "pointer" }} className="border-bottom">
                      <Link
                        to="/registros/odontologia"
                        className="text-decoration-none"
                      >
                        <p 
                          className="dropdown-item fw-bold m-0"
                          style={{
                            backgroundColor:ruta==='/registros/odontologia' ? '#0101b5' : 'transparent',
                            color:ruta ==='/registros/odontologia' ? 'white' : 'black',
                          }}
                        >
                          REGISTROS ODONTOLOGIA
                        </p>
                      </Link>
                    </li>
                    <li style={{ cursor: "pointer" }} className="border-bottom">
                      <Link
                        to="/validar/funcionario"
                        className="text-decoration-none"
                        
                      >
                        <p 
                          className="dropdown-item fw-bold m-0"
                          style={{
                            backgroundColor:ruta==='/validar/funcionario' ? '#0101b5' : 'transparent',
                            color:ruta ==='/validar/funcionario' ? 'white' : 'black',
                          }}
                        >
                          VALIDAR EMPLEADO
                        </p>
                      </Link>
                    </li>
                    {user.role === 'admin' &&
                    <div>
                      <li style={{ cursor: "pointer" }} className="border-bottom">
                        <Link
                          to="/funcionarios"
                          className="text-decoration-none"
                        >
                          <p 
                            className="dropdown-item fw-bold m-0"
                            style={{backgroundColor:ruta==='/funcionarios' ? '#0101b5' : 'transparent',
                              color:ruta ==='/funcionarios' ? 'white' : 'black',
                              /* borderRadius:15 */
                            }}
                          >
                            EMPLEADOS
                          </p>
                        </Link>
                      </li>
                    </div>
                    }
                    {/* <li style={{ cursor: "pointer" }} className="border-bottom">
                    <Link
                      to="/bitacora"
                      className="text-decoration-none"
                    >
                      <p className="dropdown-item fw-bold m-0">
                        REGISTROS CREDITOS
                      </p>
                    </Link>
                    </li> */}
                  </div>
                  }
                  <li style={{ cursor: "pointer" }} className="border-bottom">
                    <Link
                      to="/cambiar/contrasena"
                      className="text-decoration-none"
                    >
                      <p 
                        className="dropdown-item fw-bold m-0"
                        style={{
                          backgroundColor:ruta==='/cambiar/contrasena' ? '#0101b5' : 'transparent',
                          color:ruta ==='/cambiar/contrasena' ? 'white' : 'black',
                        }}
                      >
                        CAMBIAR CONTRASEÑA
                      </p>
                    </Link>
                  </li>
                  <li style={{ cursor: "pointer" }} onClick={(e) => logout()}>
                    <p className="d-flex justify-content-center align-items-center gap-2 dropdown-item fw-bold text-danger m-0">
                      CERRAR SESIÓN
                      <FiIcons.FiLogOut />
                    </p>
                  </li>
                </ul>
              </div>
            </div>
        </div>
      )}
    </>
  );
}
{/* <>
  {isLogged && (
    <div
      className="position-fixed bg-light shadow w-100"
      style={{ fontSize: 11, left: 0, height: "50px", zIndex: 2 }}
    >
      <div className="d-flex flex-row justify-content-between align-items-center w-100 h-100 px-4 shadow">
        <div
          id="logo-header"
          className="d-flex flex-row align-items-center gap-2"
        >
          <img
            src={Logo}
            width={150}
            height={50}
            className="navbar-img"
            
            onClick={(e)=>handleClickImg(e)}
            alt=""
            style={{ cursor: "pointer" }}
          />
          <span className="menu-bars m-0" style={{ cursor: "pointer" }}>
            <FaIcons.FaBars
              className=""
              style={{color:'#0101b5'}}
              onClick={(e) => setShowSidebar(!showSideBar)}
            />
          </span>
        </div>
      </div>

      <nav
        className={showSideBar ? "bg-light nav-menu active" : "nav-menu"}
      >
        <ul
          className="nav-menu-items"
          onClick={(e) => setShowSidebar(!showSideBar)}
        >
          {NavBarData.map((item, index) => {
            if (item.access.includes(user.role)) {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
        <ul
          className="nav-menu-items"
          onClick={(e) => setShowSidebar(!showSideBar)}
        >
          <li className="text-center text-secondary">
            <span className="m-0">Gran Langostino S.A.S - v2.6.0</span>
          </li>
        </ul>
      </nav>
    </div>
  )}
</> */}
