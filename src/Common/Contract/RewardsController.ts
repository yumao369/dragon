import { tryCall, trySendAfterCall } from "Common/utils";
import { RewardsController as rc } from "./Contract";
import Web3 from "web3"
import { Contract } from 'web3-eth-contract'
export default class RewardsController {

  contract: Contract
  constructor(private web3: Web3, public address: Address) {
    this.contract = new web3.eth.Contract(rc.abi, rc.address)
  }

  addApplication(amount: Amount) {
    const method = this.contract.methods.addApplication(this.address, String(amount))
    return trySendAfterCall(method, this.address)
  }

  async getApplied() {
    try {
      const { _era } = await this.contract.methods.releasable().call({ from: this.address })
      const result = await this.contract.methods.getApplied(_era, this.address).call({ from: this.address })
      return ["Ok", result]
    } catch (e) {
      return ["Err", e]
    }
  }

  async getCurrentReleaseInfo (): Promise<["Ok", any] | ["Err", any]> {
    try {
      const { _era, _releasable } = await this.contract.methods.releasable().call({ from: this.address })
      const application = await this.contract.methods.getApplication(_era).call({ from: this.address })
      return ["Ok", {
        era: _era,
        amount: _releasable,
        application: application[1]
      }]
    } catch (e) {
      return ["Err", e]
    }
  }

  async getHistory () {
    try {
      const { _era, _releasable } = await this.contract.methods.releasable().call({ from: this.address })
      const application = await this.contract.methods.getApplication(_era).call({ from: this.address })
      const { number } = await this.web3.eth.getBlock("latest")
      /** @type {Array<any>} */
      const events = await this.contract.getPastEvents("TokensReleasedForEra", { fromBlock: 0, toBlock: number })
      const allEvents = events.reverse().map(x => x.returnValues)
      const result = [{
        era: _era,
        amount: _releasable,
        application: application[1],
      }]
      console.log(result, "<>")

      for (let i = 0; i < allEvents.length && result.length < 6; ++i) {
        const event = allEvents[i] as any
        if (result.findIndex(x => x.era === event.era) === -1) {
          result.push(event)
        }
      }
      return result.reverse()
    } catch (e: any) {
      window.message.error(e?.message ?? "Unkonw Error")
      console.log(e)
      return []
    }
  }
}
