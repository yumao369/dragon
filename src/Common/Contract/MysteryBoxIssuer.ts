import { MysteryBoxIssuer as mbi } from "./Contract"; 
import { tryCall, trySendAfterCall } from "Common/utils"
import Web3 from "web3"
import { Contract } from 'web3-eth-contract'

export default class MysteryBoxIssuer {
  contract: Contract

  constructor(web3: Web3, public address: Address) {
    this.contract = new web3.eth.Contract(mbi.abi, mbi.address)
  }

  purchase(issuanceId: string | number, amount: Amount, price: Amount, value: Amount) {
    const method = this.contract.methods.purchase(issuanceId, amount, price)
    return trySendAfterCall(method, this.address, {}, {value: String(value)})
  }

  issuances(id: string | number) {
    const method = this.contract.methods.issuances(id)
    return tryCall(method, this.address)
  }
  
}
