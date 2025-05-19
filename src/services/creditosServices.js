import axios from 'axios';
import { config } from '../config'
const url = `${config.apiUrl2}/creditos`

export const findCreditos = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  /* const token = Cookies.get('token') */

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const findOneCredito = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.get(`${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}


export const findOneByCedula = async (cedula) => {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.get(`${url}/asociado/${cedula}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const getOneCredito = async (id) => {
  return fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then(res => res.data)
}

export const createCredito= async (body) => {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.post(`${url}/`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const updateCredito = async(id, body) => {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.patch(`${url}/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const verifyToken = async (token) => {
  const localToken = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.get(`${url}/solicitud/token/${token}`, {
    headers: {
      Authorization: `Bearer ${localToken}`
    }
  })
  return data
}

export const verifyTokenWhithId = async (token) => {
  const localToken = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.get(`${url}/solicitud/${token}`, {
    headers: {
      Authorization: `Bearer ${localToken}`
    }
  })
  return data
}

export const addSignature = async (token, body) => {
  const localToken = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.patch(`${url}/add/signature/${token}`, body, {
    headers: {
      Authorization: `Bearer ${localToken}`
    }
  })
  return data
}

export const deleteCredito = async (id) => {
  return fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res);
};

export const mailAuxiliar = async (body) => {
    try{
      const token = JSON.parse(localStorage.getItem("token"))
      const { data } = await axios.post(`${url}/mail/auxiliar`,body,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data
    } catch(error){
      throw error
    }
}

export const mailSolicitante = async (body) => {
  try{
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.post(`${url}/mail/solicitante`,body,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch(error){
    throw error
  }
}

export const mailPresidente = async (body) => {
  try{
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.post(`${url}/mail/presidente`,body,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch(error){
    throw error
  }
}

export const mailGerencia = async (body) => {
  try{
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.post(`${url}/mail/gerencia`,body,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch(error){
    throw error
  }
}

export const mailTesoreria = async (body) => {
  try{
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.post(`${url}/mail/tesoreria`,body,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch(error){
    throw error
  }
}

export const mailFinalizado = async (body) => {
  try{
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.post(`${url}/mail/finalizado`,body,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch(error){
    throw error
  }
}

export const envioEstudioCredito = async (body) => {
  try{
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.post(`${url}/mail/estudio/credito`, body,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch(error){
    throw error
  }
}

export const mailRejectPresidente = async (body) => {
  try{
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.post(`${url}/mail/reject/presidente`,body,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch(error){
    throw error
  }
}

export const mailRejectComite = async (body) => {
  try{
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.post(`${url}/mail/reject/comite`,body,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch(error){
    throw error
  }
}

export const mailRejectGerencia = async (body) => {
  try{
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.post(`${url}/mail/reject/gerencia`,body,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch(error){
    throw error
  }
}