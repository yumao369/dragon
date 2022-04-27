import Web3 from "web3"
import md5 from "crypto-js/md5"
import axios from "axios"
import BigNumber from "bignumber.js"
import { networkId } from "./Contract/Contract"
import { ContractCaller, DEARToken, DesExchangeAgent, ExchangeAgent, Marketplace, MysteryBoxIssuer, NFTCore, NFTManager, RewardsController, NFTLocker, setContractCaller, setDEARToken, setDesExchangeAgent, setDESToken, setExchangeAgent, setMarketplace, setMysteryBoxIssuer, setNFTCore, setNFTManager, setRewardsController, setStakingRewards, setNFTLocker, StakingRewards } from "Common/Contract/Contract"


/**
 * 签名  方式如下：signkey + dataStr + signkey 
 * 测试秘钥signkey为：d3e99162f2306a40，
 * dataStr为首字母大小写排序后MD5加密，MD5(sort(参数))
 */
export function sign(data: string) {
  const key = 'd3e99162f2306a40'
  const sorted = data.split('').sort().join('')
  return md5(`${key}${sorted}${key}`)
}


export async function trySendAfterCall(
  method: any,
  from: Address,
  gasOptions: any = {},
  extraOptions: any = {}
): Promise<["Ok", any] | ["Err", any]> {
  try {
    await method.call({ from, ...extraOptions })
  } catch (e) {
    return ["Err", e]
  }
  Object.keys(gasOptions).forEach(key => {
    gasOptions[key] = Web3.utils.toHex(gasOptions[key])
  })
  return ["Ok", await method.send({
    from,
    ...gasOptions,
    ...extraOptions
  })]
}

export async function tryCall(method: any, from: Address): Promise<["Ok", any] | ["Err", any]> {
  try {
    const result = await method.call({ from })
    return ["Ok", result]
  } catch (e) {
    return ["Err", e]
  }
}

async function fetchContract(contractName: string) {
  const resp = await axios.get(`/file/${contractName}.json`)
  if (resp.status === 200) {
    const config = resp.data
    return {
      address: config.networks[networkId].address,
      abi: config.abi
    }
  } else {
    return {}
  }
}

export async function loading<T>(
  msg: string,
  f: () => Promise<T>
): Promise<T> {
  const hide = window.message.loading(msg)
  try {
    return await f()
  } catch (e) {
    throw e
  } finally {
    hide()
  }
}

export function handleCallResp(resp: ["Ok", any] | ["Err", any]) {
  if (resp[0] === "Ok") {
    return resp[1]
  } else {
    throw resp[1]
  }
}

export async function updateContractFromServer() {
  if (process.env.REACT_APP_MODE === "DEV") {
    setNFTCore(await fetchContract("DragonaireNFTCore"))
    setNFTManager(await fetchContract("DragonaireNFTManager"))
    setMarketplace(await fetchContract("DragonaireNFTMarketplace"))
    setExchangeAgent(await fetchContract("ExchangeAgent"))
    setDesExchangeAgent(await fetchContract("DAEExchangeAgent"))
    setDEARToken(await fetchContract("DAREToken"))
    setDESToken(await fetchContract("DAEToken"))
    setContractCaller(await fetchContract("ContractCaller"))
    setMysteryBoxIssuer(await fetchContract("MysteryBoxIssuer"))
    setStakingRewards(await fetchContract("StakingRewards"))
    setNFTLocker(await fetchContract("NFTLocker"))
    setRewardsController(await fetchContract("RewardsController"))
  }
}

export function lightenDarkenColor(col: string, amt: number) {
  let usePound = false;

  if (col[0] === "#") {
      col = col.slice(1);
      usePound = true;
  }

  let num = parseInt(col,16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if  (r < 0) r = 0;

  let b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if  (b < 0) b = 0;

  let g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}