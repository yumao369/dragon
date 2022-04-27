import axios from "axios"
import { baseUrl, get, post } from "Common/RequestUtils"

export function login(
  signaddress: string,
  gameid: string | number,
  signature: string,
  timestamp: string | number
) {
  return axios.get(`${baseUrl}/game/mp/login`, {
    params: {
      signaddress, gameid, signature, timestamp
    }
  })
}

export function checkGameUser<T>() {
  return get<T>(`/game/mp/checkgameuser`, {});
}

export function getNearlyDao<T>() {
  return get<T>(`/game/mp/getnearlydao`, {})
}

export function getTokenInGame<T>() {
  return get<T>(`/game/mp/getgamecurrency`, {})
}

export function getRecharge<T>(pageIndex: number, pageSize = 10) {
  return get<T>(`/game/mp/getrecharge`, { pageIndex, pageSize })
}

export function unLock<T>(tokenid: number) {
  return post<T>(`/game/mp/unlock`, { tokenid })
}

export function deleteToken<T>() {
  return post<T>(`game/mp/deletetoken`, {})
}

export function extractToken<T>(
  amount: number | string,
  moneyType: string
) {
  return post<T>(`/game/mp/extract`, {
    amount, moneyType
  })
}

export function claimToken<T>(
  txhash: string,
  amount: string | number,
  moneyType: string
) {
  return post<T>(`/game/mp/recharge`, {
    txhash, amount, moneyType
  })
}

export function getAllNfts<T>(params: any) {
  const searchParams = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
  return get<T>(
    `/game/mp/getnftshelves?${searchParams}`, {}
  )
}

export function getAllMyNfts<T>(
  address: string,
  pageIndex: number,
  nftStatus: 0 | 1 | 2,
  pageSize = 8
) {
  return get<T>(
    `/game/mp/getownernft`, {
    address: address.toLowerCase(),
    pageIndex,
    pageSize,
    nftStatus
  }
  )
}

export function getBoxes<T>(address: string, pageIndex: number) {
  return get<T>(
    `/game/mp/getboxes`,
    {
      address: address.toLowerCase(),
      pageIndex,
      pageSize: 8,
    }
  )
}

export function getOfficialMysteryBoxes() {
  return get(
    '/game/mp/getofficial', {}
  )
}

export function updateCapability<T>(tokenIds: string | number) {
  return post<T>(
    `/game/mp/updatecapability`, {
    tokenIds
  }
  )
}

export function extractRewards<T>(amount: string | number) {
  return post<T>('/game/mp/extractrewards', { amount })
}

export function updateQRToken<T>(qrToken: string) {
  return post<T>("/game/mp/updateqrtoken", {
    qrToken
  })
}

/**
 * 
 * @param {1 | 2 | 3} type // 1是充值额度 提现 2：是Rewards提现额度 3:更新玩家算力
 * @param {1 | 2} status  //
 */
export function getExtractOrder<T>(type: 1 | 2 | 3, status: -1 | 1 | 2) {
  return get<T>(`/game/mp/getextractorder`, {
    type,
    status
  })
}

export function updateExtract<T>(orderId: string | number, status: 1 | 4) {
  return post<T>(`/game/mp/updateextract`, {
    status,
    orderId
  })
}

// binance apis
const BinanceBaseUrl = ''

export function getPrice(symbol: string) {
  return axios.get(`${BinanceBaseUrl}/api/v3/ticker/price`, { params: { symbol } })
}

export const BNBAddress = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"

export function getTokenPrice(tokenAddress: string) {
  return axios.get(`https://api.pancakeswap.info/api/v2/tokens/${tokenAddress}`)
}


export async function handleError<T>(post: Promise<[number, BaseResponse<T>]>): Promise<T> {
  try {
    const [status, data] = await post
    if (status.toString().startsWith('20')) {
      if (data.code === 0) {
        return data.data as T
      } else {
        throw data.msg
      }
    } else {
      throw new Error(data as any)
    }
  } catch (e) {
    throw e
  }
}