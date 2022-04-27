import { DESToken, ExchangeAgent } from "./Contract"; 
import { tryCall, trySendAfterCall } from "Common/utils"
import Web3 from "web3"
import { Contract } from 'web3-eth-contract'
import BigNumber from "bignumber.js";

export default class DESTokenContract {
  contract: Contract

  constructor(web3: Web3, public address: Address) {
    this.contract = new web3.eth.Contract(DESToken.abi, DESToken.address)
  }

  balanceOf() {
    const method = this.contract.methods.balanceOf(this.address)
    return tryCall(method, this.address)
  }

  async approve(spender: Address, amount: Amount) {
    const allowance = await this.contract.methods.allowance(this.address, spender).call()
    if ((new BigNumber(allowance)).gte(new BigNumber(amount))) {
      return true
    }
    const method = this.contract.methods.approve(spender, String(amount))
    return trySendAfterCall(method, this.address)
  }

  transfer(recipient: Address, amount: Amount) {
    const method = this.contract.methods.transfer(recipient, String(amount))
    return trySendAfterCall(method, this.address)
  }

  claim(amount: Amount) {
    return this.transfer(ExchangeAgent.address, String(amount))
  }
}
