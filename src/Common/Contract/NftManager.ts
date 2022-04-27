import { trySendAfterCall } from "Common/utils";
import { NFTManager } from "./Contract"
import Web3 from "web3"
import { Contract } from 'web3-eth-contract'

export default class NftManagerContract {
  allNfts = []
  contract: Contract

  constructor(private web3: Web3, public address: Address) {
    this.contract = new web3.eth.Contract(NFTManager.abi, NFTManager.address)
  }

  async unbox (tokenId: string | number) {
    await this.contract.methods.randomFee().call()
    const method = this.contract.methods.unbox(tokenId);
    return trySendAfterCall(method, this.address)
  }
}