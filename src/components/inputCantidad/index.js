import React from 'react';
import { TextField, InputAdornment } from '@mui/material';

const formatNumber = (value) => {
  if (!value) return '';
  const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return formattedValue;
};

const parseNumber = (value) => {
  return value.replace(/\./g, '');
};

const CurrencyInput = ({cantidad, setCantidad}) => {
  /* const [value, setValue] = useState(''); */

  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (/^\d*\.?\d*\.?\d*$/.test(inputValue)) {
      const numericValue = parseNumber(inputValue);
      setCantidad(formatNumber(numericValue))
    }else{
      setCantidad('')
    }
  };

  return (
    <div>
      <TextField
        id="standard-basic" 
        label="Valor solicitado"
        value={cantidad}
        className="w-100 mt-1 me-3"
        onChange={(e)=>handleChange(e)}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          inputMode: 'numeric',
        }}
        variant="standard"
        autoComplete="off"
        required
      />
      <label style={{display:'none'}}>{cantidad}</label>
    </div>
  );
};

export default CurrencyInput;
