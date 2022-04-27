import { NFTCore, Marketplace } from "./Contract"
import { tryCall, trySendAfterCall } from "Common/utils"
import Web3 from "web3"
import { Contract } from 'web3-eth-contract'

export default class NftContract {
  contract: Contract

  constructor(web3: Web3, public address: Address) {
    this.contract = new web3.eth.Contract(NFTCore.abi, NFTCore.address)
  }

  async balanceOf() {
    const method = this.contract.methods.balanceOf(this.address)
    return tryCall(method, this.address)
  }

  async approve(tokenId: string) {
    const method = this.contract.methods.approve(Marketplace.address, tokenId)
    return trySendAfterCall(method, this.address)
  }

  async setApprovalForAll(address: Address) {
    let result = false
    try {
      result = await this.contract.methods.isApprovedForAll(this.address, address).call({ from: this.address })
    } catch (e) {
      throw e
    }
    if (!result) {
      const method = this.contract.methods.setApprovalForAll(address, true)
      return trySendAfterCall(method, this.address)
    } else {
      return ["Ok", true]
    }
  }

  capabilityOf(tokenId: string | number) {
    const method = this.contract.methods.capabilityOf(tokenId)
    return tryCall(method, this.address)
  }
}