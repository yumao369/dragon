import { ExchangeAgent } from "./Contract"
import { tryCall, trySendAfterCall } from "Common/utils"
import Web3 from "web3"
import { Contract } from 'web3-eth-contract'

export default class ExchangeAgentContract {
  contract: Contract

  constructor(web3: Web3, public address: Address) {
    this.contract = new web3.eth.Contract(ExchangeAgent.abi, ExchangeAgent.address)
  }

  balanceOf() {
    const method = this.contract.methods.balanceOf(this.address)
    return tryCall(method, this.address)
  }

  deposit(amount: Amount) {
    const method = this.contract.methods.deposit(String(amount))
    return trySendAfterCall(method, this.address)
  }

  storedTokensOf() {
    const method = this.contract.methods.storedTokensOf(this.address)
    return tryCall(method, this.address)
  }
}
