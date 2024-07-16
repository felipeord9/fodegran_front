import { useState, useContext , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import AuthContext from "../../context/authContext";
import useUser from "../../hooks/useUser";
import { NavBarData } from "./NavbarData";
import Logo from "../../assets/fodegran.jpeg";
import "./styles.css";

export default function Navbar() {
  const { isLogged, logout } = useUser();
  const [showSideBar, setShowSidebar] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  // Función para manejar el clic en el botón del menú
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const [ruta, setRuta] = useState('');

  useEffect(() => {
    // Obtiene la ruta actual
    setRuta(window.location.pathname);
  }, []);

  return (
    <div
          className="position-fixed shadow w-100"
          style={{ fontSize: 20, left: 0, height: "60px", zIndex: 2, userSelect:'none' , backgroundColor:'white'}}
        >
          <div className="d-flex flex-row justify-content-between w-100 h-100 pe-2 shadow">
            <div
              id="logo-header"
              className="d-flex flex-row align-items-center gap-2"
            >
              <img
                src={Logo}       
                unselectable="false"
                aria-invalid            
                alt=""
                className="ms-2"
                style={{ height:50, width:180 , userSelect:'none'}}
              />              
            </div>
            <nav className="navbar p-0 m-0">
              <span className="menu-bars m-0 menu-toggle ps-2" style={{ cursor: "pointer"}}>
                <FaIcons.FaBars
                  className="pt-0 mt-0"
                  onClick={(e) => (handleMenuToggle(e))}
                  style={{height:60,width:30, userSelect:'none',color:'#0101b5'}}
                  />
                </span>
                {/* Botones en línea */}
                <div className={`buttons ${menuOpen ? 'hidden' : ''}`}>
                  <div className="buttons justify-content-center h-100 text-align-center">         
                    {/* <button 
                      className="pt-2 mt-1 buttons" 
                      style={{backgroundColor:ruta==='/afiliacion' ? '#0101b5' : 'transparent',
                              color:ruta ==='/afiliacion' ? 'white' : 'black',
                              borderRadius:35
                            }}
                      onClick={(e)=>(navigate('/afiliacion'), setRuta('/afiliacion'))}
                      disabled={ruta==='/' ? true:false}
                    >
                      Afiliación
                    </button>
                    <button 
                      className="pt-2 mt-1 ms-1 buttons" 
                      style={{backgroundColor:ruta==='/Solicitud/credito' ? '#0101b5' : 'transparent',
                              color:ruta ==='/Solicitud/credito' ? 'white' : 'black',
                              borderRadius:35
                            }}
                      onClick={(e)=>(navigate('/Solicitud/credito'), setRuta('/Solicitud/credito'))}
                    >
                      Solicitar Crédito
                    </button> */}
                    <button 
                      className="pt-2 mt-1 ms-1 buttons" 
                      style={{backgroundColor:ruta==='/odontologia' ? '#0101b5' : 'transparent',
                              color:ruta ==='/odontologia' ? 'white' : 'black',
                              borderRadius:35
                            }}
                      onClick={(e)=>(navigate('/odontologia'), setRuta('/odontologia'))}
                    >
                      Odontología
                    </button>
                    <button 
                      className="pt-2 mt-1 ms-1 buttons bot-inicio" 
                      style={{backgroundColor:'green',
                              color:'white',
                              borderRadius:35
                            }}
                      onClick={(e)=>(navigate('/login'), setRuta('/login'))}
                    >
                      Iniciar sesión
                    </button>
                  </div>
                </div>
                {/* Menú desplegable en dispositivos móviles */}
                {/* <div className={`menu ${menuOpen ? 'visible' : ''}`}> */}
                <div className={`nav-menu ${menuOpen ? "active" : ""}`}
                  style={{width:'auto',backgroundColor:'white',color:'white'}}
                >
                  <ul
                    className="ms-0 ps-0 d-flex flex-column w-100"
                    onClick={(e) => setShowSidebar(!showSideBar)}
                    style={{width:240, fontSize:18}}
                  >
                    {NavBarData.map((item, index) => {
                        return (
                          <li key={index} className={item.cName} style={{ fontSize:20}}>
                            <Link className="" to={item.path} style={{backgroundColor: ruta === item.path ? '#0101b5':'transparent', color: ruta === item.path ? 'white' : 'black' }}>
                              {item.icon}
                              <span style={{fontSize:18}}>{item.title}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <ul
                      className="nav-menu-items d-flex flex-column ms-0 ps-0"
                      onClick={(e) => setShowSidebar(!showSideBar)}
                    >
                      <li className="w-100 d-flex justify-content-center text-align-center align-items-center">
                        <Link style={{backgroundColor:'green',color:'white',textDecoration:'none'}} to={'/login'}/* onClick={(e)=>navigate('/login')} */ className="fw-bold nav-inicio" variant="contained">Iniciar sesión</Link>
                      </li>
                      <li className="text-center ">
                        <span className="m-0" style={{color:'GrayText'}}>FodeGran</span>
                      </li>
                    </ul>
                  </div>
                {/* </div> */}
              </nav>
            
          </div>
        </div>
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
