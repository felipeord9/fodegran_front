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

function getOneCredito(id) {
  return fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(res => res.data)
}

export const createCredito= async (body) => {
  const { data } = await axios.post(`${url}/`, body)
  return data
}

async function updateCreditos(id, body) {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.patch(`${url}/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

const deleteCredito = (id) => {
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
      const { data } = await axios.post(`${url}/mail/auxiliar`,body)
      return data
    } catch(error){
      throw error
    }
}

export {
  getOneCredito,
  updateCreditos,
  deleteCredito
}