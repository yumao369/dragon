import axios from "axios"
import { store } from "Redux/Store"
import crypto from "crypto"

//export const baseUrl = process.env.REACT_APP_MODE === "DEV" ? "http://43.154.154.22:8888" : "http://43.154.239.90:8888"
export const baseUrl = "";
function sign(params: any, signKey: string) {
  const sortedParams = Object.keys(params).sort().map(key => `${key}=${params[key]}`).join('&')
  return crypto.createHash('md5').update(`${signKey}${sortedParams}${signKey}`).digest('hex')
}

export async function get<T>(url: string, params: any): Promise<[number, BaseResponse<T>]> {
  const token = store.getState().Authentication?.token
  const signKey = store.getState().Authentication?.sign  
  const signature = sign(params, signKey)
  const resp = await axios.get(baseUrl + url, { 
    params,
    headers: {
      token,
      signature
    }
  })
  return [resp.status, resp.data]
}

 export async function post<T>(url: string, params: any): Promise<[number, BaseResponse<T>]> {
  const token = store.getState().Authentication?.token
  const signKey = store.getState().Authentication?.sign  
  const signature = sign(params, signKey)
  const resp = await axios.post(baseUrl + url, params, {
    headers: {
      token,
      signature
    },
  })
  return [resp.status, resp.data]
}