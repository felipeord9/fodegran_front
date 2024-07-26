import { useState } from "react";

export default function NivelEscolar ({nivelEscolar, setNivelEscolar}) {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);
    const [isChecked5, setIsChecked5] = useState(false);
    const [isChecked6, setIsChecked6] = useState(false);
    const [isChecked7, setIsChecked7] = useState(false);
    const [isChecked8, setIsChecked8] = useState(false);

    const handleCheckboxChange = (checkboxNumber) => {
      if (checkboxNumber === 1) {
        setIsChecked1(true);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked4(false);
        setIsChecked5(false);
        setIsChecked6(false);
        setIsChecked7(false);
        setIsChecked8(false);
      } else if (checkboxNumber === 2) {
        setIsChecked1(false);
        setIsChecked2(true);
        setIsChecked3(false);
        setIsChecked4(false);
        setIsChecked5(false);
        setIsChecked6(false);
        setIsChecked7(false);
        setIsChecked8(false);
      } else if (checkboxNumber === 3) {
        setIsChecked1(false);
        setIsChecked2(false);
        setIsChecked3(true);
        setIsChecked4(false);
        setIsChecked5(false);
        setIsChecked6(false);
        setIsChecked7(false);
        setIsChecked8(false);
      } else if (checkboxNumber === 4) {
        setIsChecked1(false);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked4(true);
        setIsChecked5(false);
        setIsChecked6(false);
        setIsChecked7(false);
        setIsChecked8(false);
      }else if (checkboxNumber === 5) {
        setIsChecked1(false);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked4(false);
        setIsChecked5(true);
        setIsChecked6(false);
        setIsChecked7(false);
        setIsChecked8(false);
      }
      else if (checkboxNumber === 6) {
        setIsChecked1(false);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked4(false);
        setIsChecked5(false);
        setIsChecked6(true);
        setIsChecked7(false);
        setIsChecked8(false);
      }else if (checkboxNumber === 7) {
        setIsChecked1(false);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked4(false);
        setIsChecked5(false);
        setIsChecked6(false);
        setIsChecked7(true);
        setIsChecked8(false);
      }else if (checkboxNumber === 8) {
        setIsChecked1(false);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked4(false);
        setIsChecked5(false);
        setIsChecked6(false);
        setIsChecked7(false);
        setIsChecked8(true);
      }
    };
    return(
        <div className="div-tipo w-100" >
            <div className='d-flex w-100 flex-column justify-content-center text-align-center align-items-center'>
                <h5 className="font-titulos mt-1 fw-bold">Nivel de escolaridad: </h5>
            </div>

            <div className='d-flex w-100 flex-column '>
                <h6 className='font-titulos ps-1 pe-1 m-1' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(1),setNivelEscolar('PRIMARIA'))}>                      
                    <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked1} onChange={()=>(handleCheckboxChange(1),setNivelEscolar('PRIMARIA'))}/>
                    PRIMARIA
                </h6>
                <h6 className='font-titulos ps-1 pe-1 m-1 ' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(2),setNivelEscolar('TECNICO'))}>
                  <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked2} onChange={()=>(handleCheckboxChange(2),setNivelEscolar('TECNICO'))}/>
                  TECNICO
                </h6>
                <h6 className='font-titulos ps-1 pe-1 m-1 ' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(3),setNivelEscolar('PROFESIONAL'))}>
                  <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked3} onChange={()=>(handleCheckboxChange(3),setNivelEscolar('PROFESIONAL'))}/>
                  PROFESIONAL
                </h6>
                <h6 className='font-titulos ps-1 pe-1 m-1 ' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(4),setNivelEscolar('MAESTRIA'))}>
                  <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked4} onChange={()=>(handleCheckboxChange(4),setNivelEscolar('MAESTRIA'))}/>
                  MAESTRIA
                </h6>
            </div>
            <div className='d-flex w-100 flex-column '>
                <h6 className='font-titulos ps-1 pe-1 m-1 ' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(5),setNivelEscolar('BACHILLER'))}>
                  <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked5} onChange={()=>(handleCheckboxChange(5),setNivelEscolar('BACHILLER'))}/>
                  BACHILLER
                </h6>
                <h6 className='font-titulos ps-1 pe-1 m-1 ' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(6),setNivelEscolar('TECNOLOGO'))}>
                  <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked6} onChange={()=>(handleCheckboxChange(6),setNivelEscolar('TECNOLOGO'))}/>
                  TECNOLOGO
                </h6>
                <h6 className='font-titulos ps-1 pe-1 m-1 ' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(7),setNivelEscolar('ESPECIALISTA'))}>
                  <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked7} onChange={()=>(handleCheckboxChange(7),setNivelEscolar('ESPECIALISTA'))}/>
                  ESPECIALISTA
                </h6>
                <h6 className='font-titulos ps-1 pe-1 m-1 ' style={{borderRadius:12, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(8),setNivelEscolar('DOCTORADO'))}>
                  <input className="me-1" type='radio' style={{cursor:'pointer'}} checked={isChecked8} onChange={()=>(handleCheckboxChange(8),setNivelEscolar('DOCTORADO'))}/>
                  DOCTORADO
                </h6>
            </div>
        </div>
    )
}