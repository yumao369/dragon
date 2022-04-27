import * as nftcore from "./abis/DragonaireNFTCore.json"
import * as nftmanager from "./abis/DragonaireNFTManager.json"
import * as marketplace from "./abis/DragonaireNFTMarketplace.json"
import * as exchangeagent from "./abis/ExchangeAgent.json"
import * as desexchangeagent from "./abis/DAEExchangeAgent.json"
import * as link from "./abis/Link.json"
import * as deartoken from "./abis/DAREToken.json"
import * as destoken from "./abis/DAEToken.json"
import * as contractcaller from "./abis/ContractCaller.json"
import * as mysteryboxissuer from "./abis/MysteryBoxIssuer.json"
import * as stakingrewards from "./abis/StakingRewards.json"
import * as nftlocker from "./abis/NFTLocker.json"
import * as daosafe from "./abis/DAOSafe.json"
import * as rewardscontroller from "./abis/RewardsController.json"

import { AbiItem } from 'web3-utils'

type ContractConfig = {
  abi: AbiItem[];
  address: string;
}

export const networkId = '1337'


function getAddress(networks: { [key: string]: { address: string } }) {
  return networks[networkId].address
}

export let NFTCore: ContractConfig = {
  address: getAddress(nftcore.networks),
  abi: nftcore.abi as AbiItem[],
}

export function setNFTCore(config: { address: string; abi: Array<any> } | {}) {
  NFTCore = { ...NFTCore, ...config }
}

export let NFTManager: ContractConfig = {
  address: getAddress(nftmanager.networks),
  abi: nftmanager.abi as AbiItem[],
}

export function setNFTManager(config: { address: string; abi: Array<any> } | {}) {
  NFTManager = { ...NFTManager, ...config }
}


export let Marketplace: ContractConfig = {
  address: getAddress(marketplace.networks),
  abi: marketplace.abi as AbiItem[]
}

export function setMarketplace(config: { address: string; abi: Array<any> } | {}) {
  Marketplace = { ...Marketplace, ...config }
}

export let ExchangeAgent: ContractConfig = {
  address: getAddress(exchangeagent.networks),
  abi: exchangeagent.abi as AbiItem[]
}

export function setExchangeAgent(config: { address: string; abi: Array<any> } | {}) {
  ExchangeAgent = { ...ExchangeAgent, ...config }
}

export let DesExchangeAgent: ContractConfig = {
  address: getAddress(desexchangeagent.networks),
  abi: desexchangeagent.abi as AbiItem[]
}

export function setDesExchangeAgent(config: { address: string; abi: Array<any> } | {}) {
  DesExchangeAgent = { ...DesExchangeAgent, ...config }
}

export let DEARToken: ContractConfig = {
  address: getAddress(deartoken.networks),
  abi: deartoken.abi as AbiItem[]
}

export function setDEARToken(config: { address: string; abi: Array<any> } | {}) {
  DEARToken = { ...DEARToken, ...config }
}

export let DESToken: ContractConfig = {
  address: getAddress(destoken.networks),
  abi: destoken.abi as AbiItem[]
}

export function setDESToken(config: { address: string; abi: Array<any> } | {}) {
  DESToken = { ...DESToken, ...config }
}

export let MysteryBoxIssuer: ContractConfig = {
  address: getAddress(mysteryboxissuer.networks),
  abi: mysteryboxissuer.abi as AbiItem[]
}

export function setMysteryBoxIssuer(config: { address: string; abi: Array<any> } | {}) {
  MysteryBoxIssuer = { ...MysteryBoxIssuer, ...config }
}

export let Link: ContractConfig = {
  address: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
  abi: link.abi as AbiItem[]
}

export let ContractCaller: ContractConfig = {
  address: getAddress(contractcaller.networks),
  abi: contractcaller.abi as AbiItem[],
}

export function setContractCaller(config: { address: string; abi: Array<any> } | {}) {
  ContractCaller = { ...ContractCaller, ...config }
}

export let NFTLocker: ContractConfig = {
  address: getAddress(nftlocker.networks),
  abi: nftlocker.abi as AbiItem[],
}

export let DAOSafe: ContractConfig = {
  address: getAddress(daosafe.networks),
  abi: daosafe.abi as AbiItem[],
}

export function setNFTLocker(config: { address: string; abi: Array<any> } | {}) {
  NFTLocker = { ...NFTLocker, ...config }
}

export function setDAOSafe(config: { address: string; abi: Array<any> } | {}) {
  DAOSafe = { ...DAOSafe, ...config }
}

export let StakingRewards: ContractConfig = {
  address: getAddress(stakingrewards.networks),
  abi: stakingrewards.abi as AbiItem[],
}

export function setStakingRewards(config: { address: string; abi: Array<any> } | {}) {
  StakingRewards = { ...StakingRewards, ...config }
}

export let RewardsController: ContractConfig = {
  address: getAddress(rewardscontroller.networks),
  abi: rewardscontroller.abi as AbiItem[]
}

export function setRewardsController(config: { address: string; abi: Array<any> } | {}) {
  console.log("setRewardsController", config)
  RewardsController = { ...RewardsController, ...config }
}

