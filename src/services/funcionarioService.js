import axios from 'axios'
import { config } from "../config";

const url = `${config.apiUrl2}/funcionarios`;

export const findFuncionarios = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  /* const token = Cookies.get('token') */

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const findOneFuncionario = async (cedula) => {
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.get(`${url}/cedula/${cedula}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
}

export const createFuncionario = async (body) => {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const updateFuncionario = async (id, body) => {
  const token = JSON.parse(localStorage.getItem("token"))
  const { data } = await axios.patch(`${url}/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}