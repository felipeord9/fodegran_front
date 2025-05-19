import axios from 'axios';
import { config } from '../config';

const url = config.apiUrl2

export const fileSend = async(formData) =>{
    try {
        const {data}= await axios.post(`${url}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        return data;
    } catch (error) {
        throw error;
    }
}

export const sendComprobante = async(formData) =>{
  try {
      const {data}= await axios.post(`${url}/upload/send/comprobante`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return data;
  } catch (error) {
      throw error;
  }
}

