import { useState, useContext , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import AuthContext from "../../context/authContext";
import useUser from "../../hooks/useUser";
import { NavBarData } from "./NavbarData";
import Logo from "../../assets/fodegran.jpeg";
import "./styles.css";

export default function NavBeneficiario() {
  const { isLogged, logout } = useUser();
  const [showSideBar, setShowSidebar] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickImg = (e) => {
    if(user.role==='aprobador'){
      return navigate('/solicitudes')
    }else{
      return navigate('/inicio')
    }
  }
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
