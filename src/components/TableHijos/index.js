import React, { useState } from 'react';
import './styles.css'

const TableHijos = ({rows , setRows}) => {
  // Función para manejar cambios en los inputs de la tabla
  const handleInputChange = (e, id, key) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [key]: e.target.value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  // Función para guardar los datos
  const handleSaveData = () => {
    // Guardar los datos en constantes o realizar alguna operación con ellos
    console.log('Datos guardados:', rows);
  };

  return (
    <div className='d-flex w-100' style={{border:'2px solid black '}}>
      <table className='w-100'>
        <thead>
          <tr>
            <th className='fila ancho' style={{borderTop:'none', borderInlineStart:'none'}}>Nombre</th>
            <th className='fila ancho' style={{borderTop:'none'}}>Fecha de Nacimiento</th>
            <th className='fila ancho' style={{borderTop:'none'}}>Edad</th>
            <th className='fila ancho' style={{borderTop:'none'}}>Nivel Educativo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              <td className='fila'>
                <div className="input-container mt-0" >
                    {row.id}.
                    <input
                    type="text"
                    className='input-with-icon ancho'
                    value={row.nombre}
                    style={{backgroundColor:'whitesmoke'}}
                    onChange={(e) => handleInputChange(e, row.id, 'nombre')}
                    />
                </div>
              </td>
              <td className='fila'>
                <input
                  type="date"
                  className='form-control form-control-sm ancho'
                  value={row.fechaNacimiento}
                  style={{backgroundColor:'whitesmoke'}}
                  onChange={(e) => handleInputChange(e, row.id, 'fechaNacimiento')}
                />
              </td>
              <td className='fila'>
                <input
                  type="number"
                  className='form-control form-control-sm ancho'
                  value={row.edad}
                  style={{backgroundColor:'whitesmoke'}}
                  onChange={(e) => handleInputChange(e, row.id, 'edad')}
                />
              </td>
              <td className='fila'>
                <input
                  type="text"
                  style={{backgroundColor:'whitesmoke'}}
                  className='form-control form-control-sm ancho'
                  value={row.nivelEducativo}
                  onChange={(e) => handleInputChange(e, row.id, 'nivelEducativo')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableHijos;
