import axios from 'axios';
import { config } from '../config'
const url = `${config.apiUrl2}/estudio`

export const findEstudios = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  /* const token = Cookies.get('token') */

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const findOneEstudio = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.get(`${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const findEstudioWithCredito = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.get(`${url}/with/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const findOneByCredito = async (credito) => {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.get(`${url}/find/credito/${credito}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const getOneCredito = async (id) => {
  return fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(res => res.data)
}

export const createEstudioCredito= async (body) => {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.post(url, body,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const updateEstudioCredito = async (id, body) => {
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
  const { data } = await axios.get(`${url}/credito/${token}`, {
    headers: {
      Authorization: `Bearer ${localToken}`
    }
  })
  return data

}

export const mailAuxiliar = async (body) => {
  try{
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.post(`${url}/mail/auxiliar`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch(error){
    throw error
  }
}

export const mailComite = async (body) => {
  try{
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.post(`${url}/mail/comite`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch(error){
    throw error
  }
}

export const mailComite2 = async (body) => {
  try{
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.post(`${url}/second/mail/comite`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch(error){
    throw error
  }
}

async function DuoVerify(token) {
  const localToken = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.get(`${url}/paquete/credito/${token}`, {
    headers: {
      Authorization: `Bearer ${localToken}`
    }
  })
  return data
}

export {
  DuoVerify,
}