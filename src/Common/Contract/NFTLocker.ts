import { NFTLocker as nl } from "./Contract";
import { tryCall, trySendAfterCall } from "Common/utils"
import { web3Utils } from "../web3utils"
import Web3 from "web3"
import { Contract } from 'web3-eth-contract'

export default class NFTLocker {
  contract: Contract
  constructor(web3: Web3, public address: Address) {
    this.contract = new web3.eth.Contract(nl.abi, nl.address)
  }

  async lock(tokenId: number): Promise<["Ok", any] | ["Err", any]> {
    try {
      console.log('nl.address', nl.address)
      const nftContract = await web3Utils.getContract("nftContract")
      await nftContract.setApprovalForAll(nl.address)
      const method = this.contract.methods.lock(tokenId)
      console.log(tokenId, this.address, method)
      return await trySendAfterCall(method, this.address)
    } catch (e) {
      return ["Err", e]
    }
  }

  async unlock(tokenId: number) {
    const method = this.contract.methods.unlock(tokenId)
    return trySendAfterCall(method, this.address)
  }

  async requestUnlock(tokenId: number) {
    const method = this.contract.methods.requestUnlock(tokenId)
    return trySendAfterCall(method, this.address)
  }

  async lockingOf(tokenId: number) {
    const method = this.contract.methods.lockingOf(tokenId)
    return tryCall(method, this.address)
  }
}