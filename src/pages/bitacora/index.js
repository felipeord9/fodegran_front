import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as HiIcons from "react-icons/hi";
import { findCreditos } from "../../services/creditosServices";
import NavBitacora from "../../components/NavBitacora";
import TableCreditos from "../../components/TableCreditos";
import './styles.css'

export default function Bitacora() {
  const [creditos, setCreditos] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const refTable = useRef();

  useEffect(() => {
    getAllCreditos();
  }, []);

  const getAllCreditos = () => {
    setLoading(true)
    findCreditos()
      .then(({ data }) => {
        setCreditos(data);
        setSuggestions(data);
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      });
  };

  const searchCredito = (e) => {
    const { value } = e.target
    if(value !== "") {
      const filteredCreditos = creditos.filter((elem) => {
        if(
          elem.rowId.includes(value) ||
          elem.name.toLowerCase().includes(value.toLowerCase()) 
        ) {
          return elem
        }
      })
      if(filteredCreditos.length > 0) {
        setSuggestions(filteredCreditos)
      } else {
        setSuggestions(creditos)
     }
    } else {
      setSuggestions(creditos)
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
            onSubmit={searchCredito}
          >
            <input
              type="search"
              value={search}
              className="form-control form-control-sm"
              style={{paddingRight: 35}}
              placeholder="Buscar solicitud (ID ó nombre)"
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <button
              type="submit"
              className="position-absolute btn btn-sm"
              style={{ right: 0 }}
            >
                {search.length ? <FaIcons.FaSearch /> : <VscIcons.VscDebugRestart />}
            </button> */}
          </form>
          <button
            title="Nuevo pedido"
            className="new align-items-center text-nowrap text-light gap-1 h-100"
            onClick={(e) => navigate("/pedido")}
            style={{backgroundColor:'#0101b5' , color:'white' , borderRadius:10}}
          >
            Nueva solicitud
            <HiIcons.HiDocumentAdd style={{ width: 15, height: 15 }} />
          </button>
        </div>
        <TableCreditos ref={refTable} creditos={suggestions} getAll={getAllCreditos} loading={loading} />
      </div>
    </div>
    </div>
  );
}