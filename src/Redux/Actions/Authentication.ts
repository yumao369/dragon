import * as types from "Constants/ActionTypes"
import { login } from "Api/Endpoints"
import { web3Utils } from "Common/web3utils"
import { gameId } from "Constants/DragonConfig"
import { Dispatch } from "redux"

export function Login (dispatch: Dispatch<any>) {
  return async () => {
    try {
      await web3Utils.init()
      const timestamp = Date.now()
      const resp = await web3Utils.signToLogin(timestamp)
      const [address, signature] = resp
      const {data: result} = await login(
        address,
        gameId,
        signature,
        timestamp
      )
      dispatch({
        type: types.SET_USERINFO, data: {
          address,
          qrtoken: result.data.qrtoken,
          token: result.data.token,
          sign: result.data.sign,
        }
      })
      return true;
    } catch (e: any) {
      window.message.error(`Error: ${e?.message ?? "Unkown Error"}`)
      return false;
    }
  }
}