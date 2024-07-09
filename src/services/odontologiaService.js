import axios from 'axios';
import { config } from '../config'
const url = `${config.apiUrl2}/odontologia`

export const findOdontologia = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  /* const token = Cookies.get('token') */

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

function getOneOdontologia(id) {
  return fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(res => res.data)
}

export const findByCedula = async (cedula) => {
  const { data } = await axios.get(`${url}/cedula/${cedula}`)
  return data
}

export const createOdontologia= async (body) => {
  const { data } = await axios.post(`${url}/`, body)
  return data
}

async function updateOdontologia(id, body) {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.patch(`${url}/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

const deleteOdontologia = (id) => {
  return fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res);
};

export {
  getOneOdontologia,
  updateOdontologia,
  deleteOdontologia
}