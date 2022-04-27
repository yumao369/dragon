import React from "react"

import { Box, Stack } from "@mui/material"

import GradientButton from "Components/Common/GradientButton"

import { randInt } from "Common/functions"

import BoxImg from "Assets/Images/MysteryBox/box.png"
import CommonBg from "Assets/Images/MysteryBox/commonBg.png"
import EpicBg from "Assets/Images/MysteryBox/epicBg.png"
import LegendaryBg from "Assets/Images/MysteryBox/legendaryBg.png"
import { web3Utils } from "Common/web3utils"
import { parseBoxType } from "Constants/DragonConfig"
import { MysteryBox } from "Capabilities/Capabilities"
import { handleCallResp } from "Common/utils"


function absolutePos(left: number, top: number): React.CSSProperties {
  return {
    position: "absolute",
    left: `${left}px`,
    top: `${top}px`
  }
}

function withBg(bg: string): React.CSSProperties {
  return {
    width: "210px",
    height: "320px",
    backgroundImage: `url(${bg})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    position: "relative",
    color: "white",
  }
}

const styles: Styles = {
  box: {
    ...absolutePos(16, 50),
    width: "163px",
    height: "152px",
  },
  info: {
    ...absolutePos(40, 220),
  },
  name: {
    fontSize: "16px",
    fontWeight: "bold",
  },
}

export default function MysteryBoxItem(props: {
  style?: React.CSSProperties;
  box: MysteryBox
}) {
  const {
    style = {},
    box,
  } = props
  const boxType = parseBoxType(box.nftdata.artifacts)
  const bgs = [CommonBg, EpicBg, LegendaryBg]
  const names = ["Common Box", "Epic Box", "Legendary Box"]

  const open = async () => {
    try {
      await web3Utils.init()
      const resp = await (await web3Utils.getContract("nftManagerContract")).unbox(box.tokenid)
      handleCallResp(resp)
      window.message.success("Open box successfully!")
    } catch (e: any) {
      window.message.error(e?.message ?? "Open box failed!")
    }
  }

  return (
    <div style={{ ...style, ...withBg(bgs[boxType - 1]) }}>
      <img src={BoxImg} alt="box" style={styles.box} />
      <Stack style={styles.info} alignItems="center" spacing="12px">
        <span style={styles.name}>{names[boxType - 1]}</span>
        <GradientButton
          startColor="#FFB731"
          endColor="#D78C27"
          width="110px"
          height="30px"
          onClick={open}
        >
          Open it
        </GradientButton>
      </Stack>
    </div>
  )

}