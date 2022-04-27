import React, { useEffect, useState } from "react"

import { Stack, Box, Divider } from "@mui/material"

import { switchExpr } from "Common/functions"

import GradientButton from "Components/Common/GradientButton"
import Center from "Components/Layout/Center"

import { useModal } from "Common/Hooks"
import { DEARToken, DESToken, Link, Marketplace, NFTLocker, NFTManager } from "Common/Contract/Contract"

import bg1 from "Assets/Images/Marketplace/Card/bg1.png"
import bg2 from "Assets/Images/Marketplace/Card/bg2.png"
import bg3 from "Assets/Images/Marketplace/Card/bg3.png"
import bg4 from "Assets/Images/Marketplace/Card/bg4.png"
import bg5 from "Assets/Images/Marketplace/Card/bg5.png"
import bg6 from "Assets/Images/Marketplace/Card/bg6.png"

import SSIcon from "Assets/Images/Marketplace/Power/ss.png"
import SIcon from "Assets/Images/Marketplace/Power/s.png"
import AIcon from "Assets/Images/Marketplace/Power/a.png"
import BIcon from "Assets/Images/Marketplace/Power/b.png"
import CIcon from "Assets/Images/Marketplace/Power/c.png"
import DIcon from "Assets/Images/Marketplace/Power/d.png"

import AtkIcon from "Assets/Images/Marketplace/Card/atk.png"
import HpIcon from "Assets/Images/Marketplace/Card/hp.png"
import DefIcon from "Assets/Images/Marketplace/Card/def.png"
import SpdIcon from "Assets/Images/Marketplace/Card/spd.png"

import WaterIcon from "Assets/Images/Marketplace/Elements/water.png"
import EarthIcon from "Assets/Images/Marketplace/Elements/earth.png"
import LightIcon from "Assets/Images/Marketplace/Elements/light.png"
import DarkIcon from "Assets/Images/Marketplace/Elements/dark.png"
import FireIcon from "Assets/Images/Marketplace/Elements/fire.png"
import WindIcon from "Assets/Images/Marketplace/Elements/wind.png"
import EtherealIcon from "Assets/Images/Marketplace/Elements/ethereal.png"

import MagicIcon from "Assets/Images/Marketplace/Classes/magic.png"
import MercyIcon from "Assets/Images/Marketplace/Classes/mercy.png"
import AgilityIcon from "Assets/Images/Marketplace/Classes/agility.png"
import StrengthIcon from "Assets/Images/Marketplace/Classes/strength.png"

import Star from "Assets/Images/Marketplace/Card/star.png"
import StarBg from "Assets/Images/Marketplace/Card/starBg.png"

import BnbIcon from "Assets/Images/Icon/bnb.svg"

import DragonImg from "Assets/Images/dragon_test.png"
import { SellModal } from "Components/MyDragonaire/items/SellModal"
import { web3Utils } from "Common/web3utils"
import Web3 from "web3"
import { store } from "Redux/Store"
import { connect } from "react-redux"
import { getCharacterByImageUrl, qualityConfigItems } from "Constants/DragonConfig"
import DargonImageViewer from "./DragonImageViewer"
import { handleError, updateCapability, unLock } from "Api/Endpoints"
import { MarketNFT, MyOwnNFT, UnlockResp, UpdateCapabilityResp } from "Capabilities/Capabilities"
import { handleCallResp, loading } from "Common/utils"
import { range } from "ramda"

function absolutePos(left: number, top: number): {
  position: "absolute";
  left: string;
  top: string;
} {
  return {
    position: "absolute",
    left: `${left}px`,
    top: `${top}px`,
  }
}

function parity(color: string): React.CSSProperties {
  return {
    color,
    border: `1px solid ${color}`,
    borderRadius: "3px",
    width: "65px",
    height: "17px",
    textAlign: "center",
    fontSize: "10px",
    lineHeight: "15px"
  }
}

const styles: Styles = {
  root: {
    color: "white"
  },
  meta: {
    background: "#303C39",
    borderRadius: "3px",
    width: "414px",
    height: "85px",
  },
  iconBg: {
    background: "#26302E",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
  },
  dragon: {
    width: "414px",
    height: "600px",
    position: "relative",
  },
  dragonBg: {
    ...absolutePos(57, 30),
    width: "300px",
  },
  dragonShadow: {
    ...absolutePos(70, 220),
    width: "274px",
    height: "274px",
    borderRadius: "50%",
    transform: "scaleY(0.09)",
    background: "black",
  },
  dragonImage: {
    ...absolutePos(0, 0),
    zIndex: 1,
    width: "414px",
    height: "400px",
    backgroundImage: `url(${DragonImg})`,
    backgroundSize: "contain",
  },
  starRow1: absolutePos(144, 380),
  starRow2: absolutePos(74.5, 400),
  buy: {
    ...absolutePos(0, 449),
    width: "414px",
  },
  price: {
    width: "261px",
    height: "40px",
    border: "1px solid #3C8558",
    borderRadius: "3px",
  },

  actions: {
    ...absolutePos(0, 449),
    width: "414px",
  },

  displayItem: {
    width: "414px",
    height: "48px",
    background: "#303C39",
    borderRadius: "3px",
  },
  itemTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    marginRight: "5px"
  },
  itemValue: {
    fontSize: "13px",
    color: "#1DFFA4",
  },
  statsItem: {
    width: "100px",
  },
  statsIcon: {
    height: "17px",
  },
  stats: {
    padding: "25px 6px 18px 6px",
    width: "414px",
    height: "134px",
    borderRadius: "3px",
    background: "#303C39",
  },
  statsNum: {
    color: "red",
    fontSize: "16px",
    fontWeight: "bold",
  }

}

const mapStateToProps = (store: any) => ({
  marketplace: store.Marketplace
})

const classTypes = [StrengthIcon, AgilityIcon, MagicIcon, MercyIcon, AgilityIcon]
const elements = [null, EarthIcon, WaterIcon, FireIcon, WindIcon, LightIcon, DarkIcon, EtherealIcon]
const bgs = [bg1, bg2, bg3, bg4, bg5, bg6]
const careers = [1, 2, 3, 4]
const camps = [0, 1, 2, 3, 4, 5, 6, 7]
const grades = ["D", "C", "B", "A", "S", "SS"]

// Left Part 
function MetaData(props: MarketNFT | MyOwnNFT) {
  const {
    tokenid = "1",
    quality,
    career,
    camp,
  } = props

  const qualityConfig = qualityConfigItems.find(x => x.id === quality)
  const owner = (props as MarketNFT)?.seller ?? web3Utils.MY_ADDRESS

  return (
    <Box sx={styles.meta}>
      <Stack justifyContent="space-between" sx={{ height: "100%", padding: "16px 10px 16px 16px" }}>
        <Stack direction="row" spacing="12px" alignItems="center">
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>#{tokenid}</span>
          <div style={{ flex: 1 }}></div>
          <div style={parity(qualityConfig?.color ?? "white")}>{qualityConfig?.name}</div>
          <Center style={styles.iconBg}>
            <img src={elements[camps.indexOf(camp)] as any} alt="element" style={{ width: "16px", height: "17px" }} />
          </Center>
          <Center style={styles.iconBg}>
            <img src={classTypes[careers.indexOf(career)] as any} alt="element" style={{ height: "21px" }} />
          </Center>
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <span style={{ fontSize: "13px", fontWeight: "bold" }}>OWNER</span>
          <span style={{ fontSize: "13px" }}>{owner}</span>
        </Stack>
      </Stack>
    </Box>
  )
}


function Dragon(props: {
  isMine: boolean;
  nft: MarketNFT | MyOwnNFT,
  showLogin: () => void
}) {
  const {
    nft,
    isMine = false
  } = props

  const [hasRequestUnlock, setHasRequestUnlock] = useState(0)
  useEffect(() => {
    getLockState(tokenid)
  })
  const {
    star_level = 5,
    tokenid,
    orderid,
    imageUrl,
  } = nft

  const row1Star = Math.min(star_level, 5)
  const row2Star = Math.max(star_level - 5, 0)
  const bgIndex = tokenid % 6 //indexOf(grades, grade, 0)

  const sellModalProps = useModal()

  const sell = async (value: string) => {
    sellModalProps.onClose()
    try {
      await loading("Wait for approving...", async () => {
        const nftContract = await web3Utils.getContract("nftContract")
        return nftContract.setApprovalForAll(Marketplace.address)
      })

      await loading("Now adding order, please wait a while...", async () => {
        const price = Web3.utils.toWei(String(value), "ether")
        const marketplaceContract = await web3Utils.getContract("marketplaceContract")
        const result = await marketplaceContract.addOrder(String(tokenid), DEARToken.address, price)
        if (result[0] === "Ok") {
          window.message.success("Add order successfully.")
        } else {
          throw result[1]
        }
      })
    } catch (e: any) {
      window.message.error(`Error: ${e?.message ?? "unknown"}`)
    }
  }

  const preBuy = () => {
    if ((nft as MarketNFT).seller === web3Utils.MY_ADDRESS) {
      window.message.warn("Can not match your own order")
    } else {
      buy()
    }
  }

  const buy = async () => {
    const isLogin = Boolean(store.getState().Authentication.token)
    const price = (nft as MarketNFT).price
    if (!isLogin) {
      props.showLogin()
      return
    }
    try {
      await web3Utils.init()

      await loading("Wait for approval...", async () => {
        const dearContract = (await web3Utils.getContract("dearContract"))
        return dearContract.approve(Marketplace.address, price)
      })

      await loading("Buying this nft...", async () => {
        const marketplaceContract = (await web3Utils.getContract("marketplaceContract"))
        const result = await marketplaceContract.matchOrder(String(orderid), price)
        handleCallResp(result)
        window.message.success("Cons! You have bought this nft!")
      })
    } catch (e: any) {
      window.message.error(`Error: ${e?.message ?? "unknown"}`)
    }
  }

  const lock = async (tokenid: number) => {
    try {
      await web3Utils.init()
      await web3Utils.getContract("nftLocker")
      await (await web3Utils.getContract("nftLocker")).lock(tokenid)
      window.message.success("Stake successfully.")
    } catch (e: any) {
      window.message.error(`Error: ${e?.message ?? "unknown"}`)
    }
  }

  const requestUnlock = async (tokenid: number) => {
    await web3Utils.init()
    const [status, result] = await (await web3Utils.getContract("nftLocker")).requestUnlock(tokenid)
    if (status === "Ok") {
      window.message.success("requestUnlock successfully.")
    } else {
      window.message.error(`Error: ${result?.message ?? "unknown"}`)
    }
  }

  const unlock = async (tokenid: number) => {
    await web3Utils.init()
    const timelatest = await web3Utils.getLatestBlockTime()
    const [getLockingStatus, getLockingResult] = await (await web3Utils.getContract("nftLocker")).lockingOf(tokenid)
    const { unlockTime } = getLockingResult
    if (unlockTime > timelatest) {
      const date = new Date(unlockTime * 1000).toUTCString()
      window.message.warn(`please unlock after ${date}`)
      return
    }
    const [status, result] = await (await web3Utils.getContract("nftLocker")).unlock(tokenid)
    if (status === "Ok") {
      window.message.success("Unlock successfully.")
    } else {
      window.message.error(`Error: ${result?.message ?? "unknown"}`)
    }
  }

  const getLockState = async (tokenid: number) => {
    await web3Utils.init()
    const [status, result] = await (await web3Utils.getContract("nftLocker")).lockingOf(tokenid)
    const { state } = result
    setHasRequestUnlock(state)
  }

  const cancelOrder = async (orderId: string | number) => {
    await web3Utils.init()
    const [status, result] = await (await web3Utils.getContract("marketplaceContract")).cancelOrder(orderId)
    if (status === "Ok") {
      window.message.success("Cancel order successfully.")
    } else {
      window.message.error(`Error: ${result?.message ?? "unknown"}`)
    }
  }

  const status = (nft as MyOwnNFT).status
  const price = (nft as MarketNFT).price
  const isSellerMyself = (nft as MarketNFT)?.seller?.toUpperCase() === web3Utils.MY_ADDRESS.toUpperCase()

  return (
    <div style={styles.dragon as any}>
      <img src={bgs[bgIndex]} alt="power" style={styles.dragonBg} />
      <div style={styles.dragonShadow} />
      <DargonImageViewer src={getCharacterByImageUrl(imageUrl)}
        style={{
          left: "calc(50% - 240px)",
          top: "calc(50% - 380px)",
          position: "relative",
          width: "480px",
          height: "480px",
          zIndex: 1,
        }}
      />

      <Stack style={styles.starRow1} direction="row" spacing="4px">
        {range(0, 5).map(i => <img key={i} src={row1Star > i ? Star : StarBg} alt="star" />)}
      </Stack>
      <Stack style={styles.starRow2} direction="row" spacing="4px">
        {range(0, 10).map(i => <img key={i} src={row2Star > i ? Star : StarBg} alt="star" />)}
      </Stack>

      {
        isMine
          ? (switchExpr(status)
            .caseIs(1,
              (<Stack direction="row" spacing="15px" style={styles.actions} justifyContent="center">
                <GradientButton
                  startColor="#FFB731"
                  endColor="#D78C27"
                  onClick={sellModalProps.show}
                >Sell</GradientButton>
                <GradientButton
                  startColor="#3D885F"
                  endColor="#226742"
                  onClick={() => lock(tokenid)}
                >Stake</GradientButton>
              </Stack>))
            .caseIs(2, (<Stack direction="row" spacing="15px" style={styles.actions} justifyContent="center">
              <GradientButton
                startColor="#FFB731"
                endColor="#D78C27"
                onClick={() => cancelOrder(orderid)}
              >Cancel</GradientButton>
            </Stack>))
            .caseIs(3, (<Stack direction="row" spacing="15px" style={styles.actions} justifyContent="center">
              <GradientButton
                startColor="#FFB731"
                endColor="#D78C27"
                onClick={Number(hasRequestUnlock) === 2 ? () => unlock(tokenid) : () => requestUnlock(tokenid)}
              >{Number(hasRequestUnlock) === 2 ? 'Unstake' : 'requestUnlock'}</GradientButton>
            </Stack>))
            .defaultAs(<></>)
          )
          : (
            <Stack style={styles.buy} direction="row" justifyContent={isSellerMyself ? "space-around" : "space-between"}>
              <Box sx={styles.price}>
                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ height: "100%" }}>
                  <img src={BnbIcon} alt="bnb" />
                  <span style={{ fontSize: "16px", margin: "0 9px 0 2px", fontWeight: "bold" }}>{parseInt(price) / 1e18}BNB</span>
                  <span style={{ fontSize: "14px", color: "#aaaaaa" }}>≈$1077.5</span>
                </Stack>
              </Box>
              {isSellerMyself ? '' : <GradientButton
                width="142px"
                height="40px"
                startColor="#FFB731"
                endColor="#D78C27"
                onClick={preBuy}
              >BUY Now</GradientButton>}
            </Stack>
          )
      }

      <SellModal {...sellModalProps} onOk={sell} />
    </div>
  )
}

// Right Part

function FarmPower(props: MarketNFT | MyOwnNFT) {
  const {
    grade,
    computing = 1234,
    has_not_comfirm_attr
  } = props
  const powerIcons = { "SS": SSIcon, "S": SIcon, "A": AIcon, "B": BIcon, "C": CIcon, "D": DIcon }
  const powerIcon = powerIcons[grade]

  return (
    <Box sx={styles.displayItem}>
      <Stack direction="row" sx={{ height: "100%", padding: "0 24px 0 29px" }} alignItems="center">
        <span style={styles.itemTitle}>FARM POWER</span>
        <div style={{ flex: 1 }} />
        {
          has_not_comfirm_attr ? <div>????</div> : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={powerIcon} alt="power" />
              <span style={{ fontSize: "13px", color: "#FFB631" }}>{computing}</span>
            </div>
          )
        }
      </Stack>
    </Box>
  )
}

function DisplayItem(props: { title: string, value: string }) {
  return (
    <Box sx={styles.displayItem}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: "100%", padding: "0 24px 0 29px" }}>
        <span style={styles.itemTitle}>{props.title}</span>
        <span style={styles.itemValue}>{props.value}</span>
      </Stack>
    </Box>
  )
}

function StatsItem(props: {
  icon: any;
  value: any;
  key?: any;
}) {
  const {
    icon,
    value,
  } = props

  return (
    <Box style={styles.statsItem}>
      <Stack alignItems="center" spacing="14px" sx={{ width: "100%" }}>
        <img style={styles.statsIcon} src={icon} alt="icon" />
        <span style={{ fontSize: "13px" }}>{value}</span>
      </Stack>
    </Box>
  )
}

function Stats(props: MarketNFT | MyOwnNFT) {
  const {
    attack = 999999,
    hp = 12233133,
    armor = 2313445,
    speed = 9231345,
    power = 9999
  } = props

  const arr = [
    { icon: AtkIcon, value: attack },
    { icon: HpIcon, value: hp },
    { icon: DefIcon, value: armor },
    { icon: SpdIcon, value: speed },
  ]

  return (
    <Box style={styles.stats}>
      <Stack justifyContent="space-between" sx={{ height: "100%" }}>
        <Stack direction="row" sx={{ marginLeft: "20px" }}>
          <span style={styles.itemTitle}>STATS</span>
          <span style={styles.statsNum}>({power})</span>
        </Stack>

        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem sx={{ borderColor: "#444F4C" }} />}
        >
          {arr.map((item, index) => <StatsItem key={index} {...item} />)}
        </Stack>
      </Stack>
    </Box>
  )
}

function DragonDetail(props: {
  isMine: boolean;
  nft: MarketNFT | MyOwnNFT,
  showLogin: () => void
}) {
  const {
    isMine = false,
    nft,
    showLogin
  } = props
  const {
    level = 10,
    energy = 0,
    star_level = 5,
    hatch = 0,
  } = nft
  return (
    <Box style={styles.root}>
      <Stack direction="row" spacing="80px">
        <Stack>
          <MetaData {...nft} />
          <Dragon nft={nft} isMine={isMine} showLogin={showLogin} />
        </Stack>
        <Stack spacing="16px">
          <Stats {...nft} />
          <FarmPower {...nft} />
          <DisplayItem title="STAR" value={`${star_level}/15`} />
          <DisplayItem title="LEVEL" value={`${level}/260`} />
          <DisplayItem title="BREED COUNT" value={`${hatch}/3`} />
          <DisplayItem title="DE" value={`${energy}/11015`} />
        </Stack>

      </Stack>
    </Box>
  )
}

export default connect(mapStateToProps, {})(DragonDetail)