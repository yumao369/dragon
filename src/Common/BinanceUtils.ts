import axios from "axios"

const isDebug = true
const debugConfig = {
  apikey: "b2aabJuUmxMYLH4MPOIv5r1aTaKR71LzaUI10qv9Vv7TEFRpa0DitTzV8i3yAjWy",
  baseUrl: "https://testnet.binance.vision",
  websocket: "wss://testnet.binance.vision/ws",
  stream: "wss://testnet.binance.vision/stream"
}

const releaseConfig = {
  apikey: "b2aabJuUmxMYLH4MPOIv5r1aTaKR71LzaUI10qv9Vv7TEFRpa0DitTzV8i3yAjWy",
  baseUrl: "https://api.binance.com/api",
  websocket: "wss://stream.binance.com:9443/ws",
  stream: "wss://stream.binance.com:9443/stream"
}

export const BNB_SYMBOL = "BNBUSDT"

const config = isDebug ? debugConfig : releaseConfig

export function getPrice(symbol: string) {
  return axios.get(`${config.baseUrl}/api/v3/ticker/price`, {
    params: {
      symbol
    }
  })
}
