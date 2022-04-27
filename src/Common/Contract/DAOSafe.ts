import { DAOSafe as ds } from "./Contract";
import { trySendAfterCall } from "Common/utils"
import { web3Utils } from "../web3utils"
import Web3 from "web3"
import { Contract } from 'web3-eth-contract'

export default class DAOSafe {
  contract: Contract
  constructor(web3: Web3, public address: Address) {
    this.contract = new web3.eth.Contract(ds.abi, ds.address)
  }


}


/*async stake(nftId: string | number): Promise<["Ok", any] | ["Err", any]> {
  try {
    const nftContract = await web3Utils.getContract("nftContract") 
    await nftContract.setApprovalForAll(sr.address)
    const method = this.contract.methods.stake(nftId)
    return await trySendAfterCall(method, this.address)
  } catch (e) {
    return ["Err", e]
  }
}*/

/*async withdraw(nftId: string | number) {
  const method = this.contract.methods.withdraw(nftId)
  return trySendAfterCall(method, this.address)
}*/

/*async releasedInfo(): Promise<["Ok", any] | ["Err", any]> {
  const from = { from: this.address }
  try {
    const currentEra = await this.contract.methods.currentEra().call(from)
    const totalEra = await this.contract.methods.totalEras().call(from)
    const released = await this.contract.methods.rewardThroughEras(0, currentEra).call(from)
    const total = await this.contract.methods.rewardThroughEras(0, totalEra).call(from)
    return ["Ok", { total, released }]
  } catch (e) {
    return ["Err", e]
  }
}

async currentEraInfo(): Promise<["Ok", any] | ["Err", any]> {
  try {
    const from = { from: this.address }
    const cap = await this.contract.methods.capabilitiesOf(this.address).call(from)
    const currentEraStr = await this.contract.methods.currentEra().call(from)
    const total = await this.contract.methods.totalCapability().call(from)
    const safeTotal = parseInt(String(total)) === 0 ? 1 : total
    const currentEra = parseInt(currentEraStr)
    const released = await this.contract.methods.rewardThroughEras(currentEra, currentEra + 1).call(from)

    return ["Ok", { userEarned: cap / safeTotal * released, released }]
  } catch (e) {
    return ["Err", e]
  }
}

async profitAssessment(): Promise<["Ok", any] | ["Err", any]> {
  try {
    const from = { from: this.address }
    const myCap = await this.contract.methods.capabilitiesOf(this.address).call(from)
    const currentEra = await this.contract.methods.currentEra().call(from)
    const totalCap = await this.contract.methods.totalCapability().call(from)
    const safeTotal = parseInt(String(totalCap)) === 0 ? 1 : totalCap
    const released = await this.contract.methods.rewardThroughEras(currentEra, currentEra + 1).call(from)
    return ["Ok", { profitAssessment: myCap / safeTotal * released, myCap, totalCap }]
  } catch (e) {
    return ["Err", e]
  }
}*/


