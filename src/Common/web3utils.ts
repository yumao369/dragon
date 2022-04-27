import Web3 from "web3"
import MarketplaceContract from "./Contract/MarketplaceContract";
import NftContract from "./Contract/NftContract";
import NftManagerContract from "./Contract/NftManager";
import DESTokenContract from "./Contract/DesTokenContract";
import DEARTokenContract from "./Contract/DearTokenContract";
import ExchangeAgentContract from "./Contract/ExchangeAgentContract";
import ContractCaller from "./Contract/ContractCaller";
import MysteryBoxIssuer from "./Contract/MysteryBoxIssuer";
import StakingRewards from "./Contract/StakingRewards";
import NFTLocker from "./Contract/NFTLocker";
import DesExchangeAgentContract from "./Contract/DesExchangeAgent";
import RewardsController from "./Contract/RewardsController";
import Optional from "./Optional";
import { getData } from 'Common/localData'
import { store } from 'Redux/Store'
import { Login } from 'Redux/Actions/Authentication'

type Contracts = {
  nftContract: NftContract;
  marketplaceContract: MarketplaceContract;
  nftManagerContract: NftManagerContract;
  desContract: DESTokenContract;
  dearContract: DEARTokenContract;
  exchangeAgentContract: ExchangeAgentContract;
  desExchangeAgentContract: DesExchangeAgentContract;
  contractCaller: ContractCaller;
  mysteryBoxIssuer: MysteryBoxIssuer;
  stakingRewards: StakingRewards;
  nftLocker: NFTLocker;
  rewardsController: RewardsController;
}

class Web3Utils {
  MY_ADDRESS = "0x70DC1998D947A8393BF10b381F4c5115de8c69D8"
  chainId = '0x539'

  private web3 = Optional.None<Web3>()
  private nftContract = Optional.None<NftContract>()
  private marketplaceContract = Optional.None<MarketplaceContract>()
  private nftManagerContract = Optional.None<NftManagerContract>()
  private desContract = Optional.None<DESTokenContract>()
  private dearContract = Optional.None<DEARTokenContract>()
  private exchangeAgentContract = Optional.None<ExchangeAgentContract>()
  private desExchangeAgentContract = Optional.None<DesExchangeAgentContract>()
  private contractCaller = Optional.None<ContractCaller>()
  private mysteryBoxIssuer = Optional.None<MysteryBoxIssuer>()
  private stakingRewards = Optional.None<StakingRewards>()
  private nftLocker = Optional.None<NFTLocker>()
  private rewardsController = Optional.None<RewardsController>()

  private _isInit = false

  async switchEthereumChain() {
    if (typeof window.ethereum === 'undefined') {
      window.alert("You Need Metamask to connect your wallet.");
      return;
    }
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: this.chainId,
        }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: this.chainId,
                chainName: 'dragonaire-dev',
                rpcUrls: ['http://43.154.239.90:8545']
              },
            ],
          });
        } catch (addError) {
          // handle "add" error
          console.error(addError)
        }
      }

      console.error(switchError)
    }
  }

  async init() {
    if (this._isInit) { return }
    const provider = Web3.givenProvider
    console.log("provider", provider)
    if (typeof provider === 'undefined') {
      window.alert("You Need Metamask to connect your wallet.");
      return
    }
    await this.switchEthereumChain()
    await provider.request({
      method: "eth_requestAccounts"
    })
    console.log("provider.enable, start contruct contract")
    const web3 = new Web3(provider)
    this.web3 = Optional.Some(web3)
    const accounts = await web3.eth.requestAccounts()
    if (accounts.length === 0) {
      window.alert("You need to connect yor wallet.")
      return
    }

    window.ethereum.removeAllListeners('accountsChanged')
    window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
      this._isInit = false

      // 判断是否登录
      if (Boolean(getData('authentication')?.token ?? '')) {
        window.dialog.show({
          title: "Confirm",
          description: "Metamask's default account has been changed, do you need to login with this new account?",
          okText: "Yes",
          cancelText: "No",
          onOk: () => {
            Login(store.dispatch)()
          }
        })
      }
    });


    this.MY_ADDRESS = accounts[0]

    this.nftContract = Optional.Some(new NftContract(web3, this.MY_ADDRESS))
    this.marketplaceContract = Optional.Some(new MarketplaceContract(web3, this.MY_ADDRESS))
    this.nftManagerContract = Optional.Some(new NftManagerContract(web3, this.MY_ADDRESS))
    this.desContract = Optional.Some(new DESTokenContract(web3, this.MY_ADDRESS))
    this.dearContract = Optional.Some(new DEARTokenContract(web3, this.MY_ADDRESS))
    this.exchangeAgentContract = Optional.Some(new ExchangeAgentContract(web3, this.MY_ADDRESS))
    this.desExchangeAgentContract = Optional.Some(new DesExchangeAgentContract(web3, this.MY_ADDRESS))
    this.contractCaller = Optional.Some(new ContractCaller(web3, this.MY_ADDRESS))
    this.mysteryBoxIssuer = Optional.Some(new MysteryBoxIssuer(web3, this.MY_ADDRESS))
    this.stakingRewards = Optional.Some(new StakingRewards(web3, this.MY_ADDRESS))
    this.nftLocker = Optional.Some(new NFTLocker(web3, this.MY_ADDRESS))
    this.rewardsController = Optional.Some(new RewardsController(web3, this.MY_ADDRESS))

    this.nftContract.setErrMsg("nftContract contract init failed")
    this.marketplaceContract.setErrMsg("marketplaceContract contract init failed")
    this.nftManagerContract.setErrMsg("nftManagerContract contract init failed")
    this.desContract.setErrMsg("desContract contract init failed")
    this.dearContract.setErrMsg("dearContract contract init failed")
    this.exchangeAgentContract.setErrMsg("exchangeAgentContract contract init failed")
    this.desExchangeAgentContract.setErrMsg("desExchangeAgentContract contract init failed")
    this.contractCaller.setErrMsg("contractCaller contract init failed")
    this.mysteryBoxIssuer.setErrMsg("mysteryBoxIssuer contract init failed")
    this.stakingRewards.setErrMsg("stakingRewards contract init failed")
    this.nftLocker.setErrMsg("nftLocker contract init failed")
    this.rewardsController.setErrMsg("rewardsController contract init failed")

    this._isInit = true
  }

  isInit() {
    return this._isInit
  }

  async getContract<T extends keyof Contracts>(name: T): Promise<Contracts[T]> {
    await this.init()
    if (name === "nftContract") {
      return this.nftContract.error("nftContract init failed") as any
    } else if (name === "marketplaceContract") {
      return this.marketplaceContract.error("marketplaceContract init failed") as any
    } else if (name === "nftManagerContract") {
      return this.nftManagerContract.error("nftManagerContract init failed") as any
    } else if (name === "desContract") {
      return this.desContract.error("desContract init failed") as any
    } else if (name === "dearContract") {
      return this.dearContract.error("dearContract init failed") as any
    } else if (name === "exchangeAgentContract") {
      return this.exchangeAgentContract.error("exchangeAgentContract init failed") as any
    } else if (name === "desExchangeAgentContract") {
      return this.desExchangeAgentContract.error("desExchangeAgentContract init failed") as any
    } else if (name === "contractCaller") {
      return this.contractCaller.error("contractCaller init failed") as any
    } else if (name === "mysteryBoxIssuer") {
      return this.mysteryBoxIssuer.error("mysteryBoxIssuer init failed") as any
    } else if (name === "stakingRewards") {
      return this.stakingRewards.error("stakingRewards init failed") as any
    } else if (name === "nftLocker") {
      return this.nftLocker.error("nftLocker init failed") as any
    } else if (name === "rewardsController") {
      return this.rewardsController.error("rewardsController init failed") as any
    } else {
      throw new Error(`Unkown contract: ${name}`)
    }
  }

  async signToLogin(timestamp: string | number) {
    const appName = "DragonaireMarketplace";
    const method = "Login";
    const userMessage = "Please sign to login.";
    const web3 = this.web3.error("You Need Metamask to connect your wallet.")
    return [this.MY_ADDRESS, await (web3.eth.personal.sign as any)([timestamp, appName, method, userMessage].join("|"), this.MY_ADDRESS)]
  }

  getBlance() {
    const web3 = this.web3.error("You Need Metamask to connect your wallet.")
    return web3.eth.getBalance(this.MY_ADDRESS)
  }

  getBalanceOfDao(address: Address) {
    return this.web3.error(".....").eth.getBalance(address)
  }

  async getLatestBlockTime() {
    const time = await (await this.web3.error("......").eth.getBlock('latest')).timestamp
    return Number(time)
  }

}

export const web3Utils = new Web3Utils()
