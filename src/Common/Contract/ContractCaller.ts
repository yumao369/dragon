import { ContractCaller as cc } from "./Contract"; 
import { trySendAfterCall } from "Common/utils"
import Web3 from "web3"
import { Contract } from 'web3-eth-contract'

export default class ContractCaller {
  contract: Contract
  constructor(web3: Web3, public address: string) {
    this.contract = new web3.eth.Contract(cc.abi, cc.address)
  }
  
  callBySig(
    target: Address, 
    calldata: string, 
    amount: Amount, 
    sig: Signautre
  ) {
    const { v, r, s } = sig
    const method = this.contract.methods.callBySig(target, calldata, String(amount), v, r, s)
    return trySendAfterCall(method, this.address)
  }
}
