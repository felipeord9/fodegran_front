import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as HiIcons from "react-icons/hi";
import * as FaIcons from "react-icons/fa";
import * as VscIcons from "react-icons/vsc";
import AuthContext from "../../context/authContext";
import { MdPriceChange } from "react-icons/md";
import { findOdontologia } from "../../services/odontologiaService";
import NavBitacora from "../../components/NavBitacora";
import TableRegistros from "../../components/TableRegistros";
import './styles.css'

export default function RegistrosOdontologia() {
  const { user } = useContext(AuthContext);
  const [registros, setRegistros] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const refTable = useRef();

  useEffect(() => {
    getAllRegistros();
  }, []);

  const getAllRegistros = () => {
    setLoading(true)
    findOdontologia()
      .then(({ data }) => {
        if(user.role==='odontologa'){
          const filtro = data.filter((elem)=>{
            if(elem.estado !== 'NUEVO'){
              return elem
            }
          })
          setRegistros(filtro);
          setSuggestions(filtro);
          setLoading(false)
        }else{
          setRegistros(data);
          setSuggestions(data);
          setLoading(false)
        }
      })
      .catch((error) => {
        setLoading(false)
      });
  };

  const searchRegistro = (e) => {
    const { value } = e.target
    if(value !== "") {
      const filteredRegistro = registros.filter((elem) => {
        if(
          elem.idCotizante.includes(value) ||
          elem.nameCotizante.toUpperCase().includes(value.toUpperCase()) 
        ) {
          return elem
        }
      })
      if(filteredRegistro.length > 0) {
        setSuggestions(filteredRegistro)
      } else {
        setSuggestions(registros)
     }
    } else {
      setSuggestions(registros)
    }
    setSearch(value)
  }

  return (
    <div>
        <NavBitacora />
    <div className="d-flex flex-column container">
      <div className="d-flex flex-column h-100 gap-2 mt-3">
        <div className="d-flex justify-content-center mt-2 gap-2 mt-5">
          <form
            className="position-relative d-flex justify-content-center w-100"
            onSubmit={searchRegistro}
          >
            <input
              type="search"
              value={search}
              className="form-control form-control-sm"
              style={{paddingRight: 35, textTransform:'uppercase'}}
              placeholder="Buscar registro (ID ó nombre)"
              onChange={searchRegistro/* (e) => setSearch(e.target.value) */}
            />
            {/* <button
              type="submit"
              className="position-absolute btn btn-sm"
              style={{ right: 0 }}
              onClick={(e)=>getAllRegistros()}
            >
                {search.length ? <FaIcons.FaSearch /> : <VscIcons.VscDebugRestart />}
            </button> */}
          </form>
          {user.role !=='odontologa' &&
            <button
              title="Nuevo registro"
              className="new align-items-center text-nowrap text-light gap-1 h-100"
              onClick={(e) => navigate("/odontologia")}
              style={{backgroundColor:'#0101b5' , color:'white' , borderRadius:10}}
            >
              Nuevo registro
              <HiIcons.HiDocumentAdd style={{ width: 15, height: 15 }} />
            </button>
          }
        </div>
        <TableRegistros ref={refTable} registros={suggestions} getAll={getAllRegistros} loading={loading} />
      </div>
    </div>
    </div>
  );
}