import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as HiIcons from "react-icons/hi";
import AuthContext from "../../context/authContext";
import { findCreditos } from '../../services/creditosServices';
import NavBitacora from "../../components/NavBitacora";
import TableCreditos from "../../components/TableCreditos";
import './styles.css'

export default function BitacoraCreditos() {
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
    findCreditos()
      .then(({ data }) => {
        let datos = data;
        if(user.role === 'estudio'){
          const result = datos.filter((item)=>item.estado === 'Estudio 1')
          setRegistros(result);
          setSuggestions(result);
          setLoading(false)
        }else if(user.role === 'comite1'){
          const result = datos.filter((item)=>item.estado === 'Comité 1')
          setRegistros(result);
          setSuggestions(result);
          setLoading(false)
        }else if(user.role === 'comite2'){
          const result = datos.filter((item)=>item.estado === 'Comité 2')
          setRegistros(result);
          setSuggestions(result);
          setLoading(false)
        }else if(user.role === 'presidente'){
          const result = datos.filter((item)=>item.estado === 'Presidente')
          setRegistros(result);
          setSuggestions(result);
          setLoading(false)
        }else if(user.role === 'gerencia'){
          const result = datos.filter((item)=>item.estado === 'Gerencia')
          setRegistros(result);
          setSuggestions(result);
          setLoading(false)
        }else if(user.role === 'tesoreria'){
          const result = datos.filter((item)=>item.estado === 'Tesoreria')
          setRegistros(result);
          setSuggestions(result);
          setLoading(false)
        }else if(user.role === 'auxiliar' || user.role === 'admin'){
          setRegistros(data);
          setSuggestions(data);
          setLoading(false)
        }else{
          setRegistros(null);
          setSuggestions(null);
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
          (elem?.rowId.toString()).includes(value) ||
          elem?.nombre?.toUpperCase().includes(value.toUpperCase()) 
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
          </form>
          {(user.role ==='auxiliar' || user.role === 'admin') &&
            <button
              title="Nuevo registro"
              className="new align-items-center text-nowrap text-light gap-1 h-100"
              onClick={(e) => navigate("/solicitud/credito")}
              style={{backgroundColor:'#0101b5' , color:'white' , borderRadius:10}}
            >
              Nuevo crédito
              <HiIcons.HiDocumentAdd style={{ width: 15, height: 15 }} />
            </button>
          }
        </div>
        {/* {JSON.stringify(suggestions)} */}
        <TableCreditos ref={refTable} creditos={suggestions} getAll={getAllRegistros} loading={loading} />
      </div>
    </div>
    </div>
  );
}