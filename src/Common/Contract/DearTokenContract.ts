import { DEARToken, ExchangeAgent } from "./Contract";
import { tryCall, trySendAfterCall } from "Common/utils"
import Web3 from "web3"
import { Contract } from 'web3-eth-contract'
import BigNumber from "bignumber.js";

export default class DEARTokenContract {
  contract: Contract

  constructor(web3: Web3, public address: string) {
    this.contract = new web3.eth.Contract(DEARToken.abi, DEARToken.address)
  }

  balanceOf() {
    console.log('deartokenaddress', DEARToken.address)
    const method = this.contract.methods.balanceOf(this.address)
    return tryCall(method, this.address)
  }

  balanceOfDao(address: Address) {
    const method = this.contract.methods.balanceOf(address)
    return tryCall(method, address)
  }

  async approve(spender: Address, amount: Amount): Promise<boolean> {
    const [status, resp] = await this.balanceOf()
    if (status === "Ok") {
      if ((new BigNumber(resp)).lt(new BigNumber(amount))) {
        throw Error("The price exceeds your balance")
      }
      const allowance = await this.contract.methods.allowance(this.address, spender).call()
      if ((new BigNumber(allowance)).gte(new BigNumber(amount))) {
        return true
      }
      const method = this.contract.methods.approve(spender, String(amount))
      const result = await trySendAfterCall(method, this.address)
      return result[0] === "Ok"
    }
    return false
  }

  transfer(recipient: Address, amount: Amount) {
    const method = this.contract.methods.transfer(recipient, String(amount))
    return trySendAfterCall(method, this.address)
  }

  claim(amount: Amount) {
    return this.transfer(ExchangeAgent.address, amount)
  }

}
