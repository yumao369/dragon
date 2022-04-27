import React, { ComponentType, useEffect, useRef, useState } from "react"

import { Stack } from "@mui/material"

import { switchExpr, randInt } from "Common/functions"


// flag
import SellingFlag from "Assets/Images/Marketplace/Card/selling.png"
import StackFlag from "Assets/Images/Marketplace/Card/stack.png"
import lockFlag from "Assets/Images/Marketplace/Card/lock.png"
import lockEnabledFlag from "Assets/Images/Marketplace/Card/lockEnabled.png"

// bg
import DarkBg from "Assets/Images/Marketplace/Card/darkBg.png"
import bg1 from "Assets/Images/Marketplace/Card/bg1.png"
import bg2 from "Assets/Images/Marketplace/Card/bg2.png"
import bg3 from "Assets/Images/Marketplace/Card/bg3.png"
import bg4 from "Assets/Images/Marketplace/Card/bg4.png"
import bg5 from "Assets/Images/Marketplace/Card/bg5.png"
import bg6 from "Assets/Images/Marketplace/Card/bg6.png"

import frame1 from "Assets/Images/Marketplace/Card/frame1.png"
import frame2 from "Assets/Images/Marketplace/Card/frame2.png"
import frame3 from "Assets/Images/Marketplace/Card/frame3.png"

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

import BnbIcon from "Assets/Images/Icon/bnb.svg"
import DEARIcon from "Assets/Images/Icon/dear.png"
import GradientButton from "Components/Common/GradientButton"
import { getCharacter, getCharacterByImageUrl } from "Constants/DragonConfig"
import DargonImageViewer from "Components/Common/DragonImageViewer"
import { MarketNFT, MyOwnNFT } from "Capabilities/Capabilities"
import { web3Utils } from "Common/web3utils"
import { useCountdown } from "./countDown"

function root(isMine: boolean): React.CSSProperties {
  return {
    position: "relative",
    width: "210px",
    height: "360px",
    color: "white",
    cursor: isMine ? "normal" : "pointer",
  }
}
const styles: Styles = {
  darkBg: {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "201px",
    height: "351px",
    zIndex: 1,
  },
  farmPower: {
    position: "absolute",
    top: "25px",
    left: "5px",
    height: "224px",
    zIndex: 2,
    // width: "180px"
  },
  frame: {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "202px",
    height: "345px",
    zIndex: 4,
  },
  classType: {
    position: "absolute",
    top: "226px",
    left: "164px",
    zIndex: 5,
  },
  element: {
    position: "absolute",
    top: "15px",
    left: "89px",
    width: "24px",
    height: "24px",
    zIndex: 6,
  },
  star: {
    position: "absolute",
    top: "242px",
    left: "19px",
    fontSize: "13px",
    fontWeight: "bold",
    width: "40px",
    textAlign: "center",
    zIndex: 7,
  },
  flag: {
    position: "absolute",
    top: "48px",
    left: "-2px",
    zIndex: 8,
  },
  lockingFlag: {
    position: "absolute",
    top: "215px",
    left: "40px",
    zIndex: 8,
    fontSize: "12px",
    color: "#B5FF54 ",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  level: {
    padding: "4px 5px",
    position: "absolute",
    top: "260px",
    left: "8px",
    width: "186px",
    zIndex: 9,
    lineHeight: 1.2,
    borderBottom: "1px solid #838383",
  },
  key: {
    fontSize: "11px",
    color: "#8F9292",
    fontWeight: "bold",
    marginRight: "5px",
  },
  value: {
    fontSize: "11px",
    fontWeight: "bold",
    color: "white",
  },
  id: {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#8F9292"
  },
  viewButton: {
    position: "absolute",
    left: "48px",
    top: "305px",
    zIndex: 10,
    lineHeight: "21px",
    fontSize: "13px",
  },
  price: {
    position: "absolute",
    width: "210px",
    left: "0px",
    top: "302px",
    lineHeight: 1.2,
    zIndex: 11,
  },
  priceText: {
    fontSize: "18px",
    color: "white",
    fontWeight: "bold",
  },
  dollarText: {
    fontSize: "11px",
    color: "#8F9292"
  }
}

const frames = [frame1, frame2, frame3]
const bgs = [bg1, bg2, bg3, bg4, bg5, bg6]
const classTypes = [StrengthIcon, AgilityIcon, MagicIcon, MercyIcon, AgilityIcon]
const elements = [null, EarthIcon, WaterIcon, FireIcon, WindIcon, LightIcon, DarkIcon, EtherealIcon]
const grades = ["D", "C", "B", "A", "S", "SS"]
const qualities = [3, 4, 5]
const careers = [1, 2, 3, 4]
const camps = [0, 1, 2, 3, 4, 5, 6, 7]

function indexOf<T>(arr: T[], target: T, defaultIndex: number): number {
  const index = arr.indexOf(target)
  if (index === -1) {
    return defaultIndex
  } else {
    return index
  }
}




export default function DragonCard(props: {
  isMine: boolean;
  nft: MarketNFT | MyOwnNFT;
  dollar?: number;
  viewDetail?: () => void;
  onClick?: () => void;
}) {
  const {
    isMine = false,
    nft,
    dollar = 1234.5,
    viewDetail = () => { },
    onClick = () => { },
  } = props
  const {
    star_level,
    quality,
    career,
    grade,
    camp,
    level,
    hatch,
    tokenid,
    cfg_id,
    imageUrl,
    character,
  } = nft

  const status = (nft as MyOwnNFT).status
  const price = (nft as MarketNFT).price

  const bgIndex = tokenid % 6

  const [lockState, setLockState] = useState(0)
  const [unlockTime, setUnlockTime] = useState(0)
  const [days, hours, minutes, seconds] = useCountdown(unlockTime)

  useEffect(() => {
    getLockStatus(tokenid)
  })

  const getLockStatus = async (tokenid: number) => {
    await web3Utils.init()
    const [status, result] = await (await web3Utils.getContract("nftLocker")).lockingOf(tokenid)
    const { state, unlockTime } = result
    const date = unlockTime * 1000
    setLockState(Number(state))
    setUnlockTime(Number(date))
  }

  return (
    <div style={root(isMine)} onClick={isMine ? () => { } : onClick}>
      <img style={styles.darkBg} alt="dark bg" src={DarkBg} />
      <img style={styles.farmPower} src={bgs[bgIndex]} alt="farm power" />
      <DargonImageViewer src={getCharacterByImageUrl(imageUrl)}
        style={{
          left: "calc(50% - 150px)",
          top: "calc(50% - 250px)",
          position: "relative",
          width: "300px",
          height: "300px",
          zIndex: 3
        }}
      />
      <img style={styles.frame} src={frames[indexOf(qualities, quality, 0)]} alt="frame" />
      <img style={styles.classType} src={classTypes[indexOf(careers, career, 0)]} alt="class" />
      <img style={styles.element} src={elements[indexOf(camps, camp, 1)] as any} alt="element" />
      <div style={styles.star}>{star_level}</div>
      {
        switchExpr(status)
          .caseIs(2, <img style={styles.flag} src={SellingFlag} alt="selling" />)
          .caseIs(3,
            switchExpr(lockState)
              .caseIs(1, <img style={styles.flag} src={lockFlag} alt="stack" />)
              .caseIs(2, days + hours + minutes + seconds > 0 ? <div style={styles.lockingFlag}>
                <div>estimate unlocking time</div>
                <div><span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span></div>
              </div> : <img style={styles.flag} src={lockEnabledFlag} alt="stack" />)
              .defaultAs(<></>)
          )
          .defaultAs(<></>)
      }
      <Stack style={styles.level} direction="row" justifyContent="space-between" alignItems="end">
        <Stack direction="column">
          <Stack direction="row">
            <span style={styles.key}>Level</span>
            <span style={styles.value}>{level}</span>
          </Stack>
          <Stack direction="row">
            <span style={styles.key}>Breed Count</span>
            <span style={styles.value}>{`${hatch}/3`}</span>
          </Stack>
        </Stack>
        <div style={styles.id}>#{tokenid}</div>
      </Stack>
      {isMine
        ? (<GradientButton
          style={styles.viewButton}
          startColor="#3D885F"
          endColor="#226742"
          width="95px"
          height="21px"
          onClick={viewDetail}
        >View details</GradientButton>)
        : (
          <Stack direction="column" style={styles.price} justifyContent="center" alignItems="center">
            <Stack direction="row">
              <img src={DEARIcon} style={{ width: "20px", height: "20px" }} alt="bnd icon" />
              <span style={styles.priceText}>{parseInt(price) / 1e18} DEAR</span>
            </Stack>

            <div style={styles.dollarText}>≈＄{dollar}</div>
          </Stack>
        )
      }
    </div>
  )
}
