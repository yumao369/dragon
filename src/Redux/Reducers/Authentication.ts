import { setData, removeData } from "Common/localData"
import { CLEAR_USERINFO, SET_QRTOKEN, SET_USERINFO } from "Constants/ActionTypes"
import {QrTokenObj} from "Common/QrToken"

const defaultState = {
  token: "",
  qrcode: "",
  address: "",
  sign: "",
  avatar: "",
  email: "",
  name: "",
}

const LOCALSTORAGE_KEY = "authentication"

const reducer = (state = defaultState, action: Action) => {
  const { type, data } = action
  switch (type) {
    case SET_USERINFO: {
      const newState = {
        ...state,
        token: data.token,
        qrtoken: data.qrtoken,
        address: data.address,
        sign: data.sign,
      }
      //设置二维码cookie
      QrTokenObj.setQrToken(data.qrtoken, false);
      setData(LOCALSTORAGE_KEY, { ...newState, timestamp: Date.now()})
      return newState
    }
    case CLEAR_USERINFO: {
      removeData(LOCALSTORAGE_KEY)
      return defaultState 
    }
    case SET_QRTOKEN: {
      return {
        ...state,
        qrtoken: data,
      }
    }
    default: return state
  }
}

export default reducer