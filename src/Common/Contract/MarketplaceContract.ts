import { trySendAfterCall, tryCall } from "Common/utils"
import { Marketplace } from "./Contract"
import Web3 from "web3"
import { Contract } from 'web3-eth-contract'

export default class MarketplaceContract {
  contract: Contract

  constructor(web3: Web3, public address: Address) {
    this.contract = new web3.eth.Contract(Marketplace.abi, Marketplace.address)
  }
  
  addOrder(tokenId: string, paymentToken: Address, price: Amount) {
    const method = this.contract.methods.addOrder(tokenId, paymentToken, String(price))
    return trySendAfterCall(method, this.address)
  }

  matchOrder(orderId: string, price: Amount) {
    const method = this.contract.methods.matchOrder(orderId, String(price))
    return trySendAfterCall(method, this.address)
  }

  cancelOrder(orderId: string | number) {
    const method = this.contract.methods.cancelOrder(String(orderId))
    return trySendAfterCall(method, this.address)
  }

  onSaleOrders() {
    const method = this.contract.methods.onSaleOrders()
    return tryCall(method, this.address)
  }
}

