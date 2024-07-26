import { useState } from "react";
import './styles.css'

export default function EstadoCivil ({estadoCivil, setEstadoCivil}) {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);
    const [isChecked5, setIsChecked5] = useState(false);

    const handleCheckboxChange = (checkboxNumber) => {
      if (checkboxNumber === 1) {
        setIsChecked1(true);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked4(false);
        setIsChecked5(false);
      } else if (checkboxNumber === 2) {
        setIsChecked1(false);
        setIsChecked2(true);
        setIsChecked3(false);
        setIsChecked4(false);
        setIsChecked5(false);
      } else if (checkboxNumber === 3) {
        setIsChecked1(false);
        setIsChecked2(false);
        setIsChecked3(true);
        setIsChecked4(false);
        setIsChecked5(false);
      } else if (checkboxNumber === 4) {
        setIsChecked1(false);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked4(true);
        setIsChecked5(false);
      }else{
        setIsChecked1(false);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked4(false);
        setIsChecked5(true);
      }
    };
    return(
        <div className="div-tipo w-100" >
            <div className='d-flex w-100 flex-column justify-content-center text-align-center align-items-center'>
                <h5 className="fw-bold font-titulos mt-1">Estado civil: </h5>
            </div>

            <div className='d-flex w-100 flex-column justify-content-center'>
                <h6 className='font-titulos ps-3 pe-3 m-1' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(1),setEstadoCivil('Soltero'))}>                      
                    <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked1} onChange={()=>(handleCheckboxChange(1),setEstadoCivil('Soltero'))}/>
                    Soltero
                </h6>
                <h6 className='font-titulos ps-3 pe-3 m-1 ' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(2),setEstadoCivil('Viudo'))}>
                  <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked2} onChange={()=>(handleCheckboxChange(2),setEstadoCivil('Viudo'))}/>
                  Viudo
                </h6>
            </div>
            <div className='d-flex w-100 flex-column justify-content-center'>
                <h6 className='font-titulos ps-3 pe-3 m-1 ' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(3),setEstadoCivil('Casado'))}>
                  <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked3} onChange={()=>(handleCheckboxChange(3),setEstadoCivil('Casado'))}/>
                  Casado
                </h6>
                <h6 className='font-titulos ps-3 pe-3 m-1 ' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(4),setEstadoCivil('Union libre'))}>
                  <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked4} onChange={()=>(handleCheckboxChange(4),setEstadoCivil('Union libre'))}/>
                  Union libre
                </h6>
            </div>
            <div className='d-flex w-100 flex-column justify-content-center '>
                <h6 className='font-titulos ps-3 pe-3 m-1 ' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(5),setEstadoCivil('Separado'))}>
                  <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked5} onChange={()=>(handleCheckboxChange(5),setEstadoCivil('Separado'))}/>
                  Separado
                </h6>
            </div>
        </div>
    )
}