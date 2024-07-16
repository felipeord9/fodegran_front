import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as HiIcons from "react-icons/hi";
import * as FaIcons from "react-icons/fa";
import * as VscIcons from "react-icons/vsc";
import AuthContext from "../../context/authContext";
import { MdPriceChange } from "react-icons/md";
import ModalNewFuncionario from "../../components/ModalNewFuncionario";
import { findFuncionarios } from "../../services/funcionarioService";
import NavBitacora from "../../components/NavBitacora";
import TableFuncionarios from "../../components/TableFuncionarios";
import './styles.css'

export default function Funcionarios() {
  const { user } = useContext(AuthContext);
  const [funcionarios, setFuncionarios] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const refTable = useRef();

  useEffect(() => {
    getAllFuncionarios();
  }, []);

  const getAllFuncionarios = () => {
    setLoading(true)
    findFuncionarios()
      .then(({ data }) => {
        setFuncionarios(data);
        setSuggestions(data);
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      });
  };

  const searchFuncionario = (e) => {
    const { value } = e.target
    if(value !== "") {
      const filteredFuncionario = funcionarios.filter((elem) => {
        if(
          elem.idCotizante.includes(value) ||
          elem.nameCotizante.toUpperCase().includes(value.toUpperCase()) 
        ) {
          return elem
        }
      })
      if(filteredFuncionario.length > 0) {
        setSuggestions(filteredFuncionario)
      } else {
        setSuggestions(funcionarios)
     }
    } else {
      setSuggestions(funcionarios)
    }
    setSearch(value)
  }

  return (
    <div>
        <NavBitacora />
    <div className="d-flex flex-column container">
      <div className="d-flex flex-column h-100 gap-2 mt-3">
        <ModalNewFuncionario
          empleado={selectedFuncionario}
          setEmpleado={setSelectedFuncionario}
          showModal={showModal}
          setShowModal={setShowModal}
          reloadInfo={getAllFuncionarios}
        />
        <div className="d-flex justify-content-center mt-2 gap-2 mt-5">
          <form
            className="position-relative d-flex justify-content-center w-100"
            onSubmit={searchFuncionario}
          >
            <input
              type="search"
              value={search}
              className="form-control form-control-sm"
              style={{paddingRight: 35, textTransform:'uppercase'}}
              placeholder="Buscar empleado (ID ó nombre)"
              onChange={searchFuncionario/* (e) => setSearch(e.target.value) */}
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
              title="Nuevo funcionario"
              className="new align-items-center text-nowrap text-light gap-1 h-100"
              onClick={(e) => setShowModal(true)}
              style={{backgroundColor:'#0101b5' , color:'white' , borderRadius:10}}
            >
              Nuevo Empleado
              <HiIcons.HiDocumentAdd style={{ width: 15, height: 15 }} />
            </button>
          }
        </div>
        <TableFuncionarios 
          ref={refTable} 
          funcionarios={suggestions} 
          setSelected={setSelectedFuncionario}
          setShowModal={setShowModal}
          getAll={getAllFuncionarios} 
          loading={loading} 
        />
      </div>
    </div>
    </div>
  );
}