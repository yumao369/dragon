import React from "react"

import { Box, Stack } from "@mui/material"

import { formatNumber } from "Common/functions"
import { take, takeLast } from "ramda"

import BnbIcon from "Assets/Images/Icon/bnb.svg"
import CopyImg from "Assets/Images/Icon/copy.png"


const styles: Styles = {
  root: {
    background: "#303C39",
    borderRadius: "3px",
    padding: "27px 18px 27px 27px",
    width: "255px",
    height: "151px",
  }
}

export default function BnbItem (props: {
  amount: number;
  usd?: number;
  addr?: string;
}) {
  const {
    amount = 999999,
    usd = 999999,
    addr = "0x70DC1998D947A8393BF10b381F4c5115de8c69D8"
  } = props
  const link = `https://testnet.bscscan.com/address/${addr}`
  const address = `${take(6, addr)}****${takeLast(6, addr)}`
  const copy = () => {
    window.navigator.clipboard.writeText(link)
    window.message.success("Copied!")
  }
  return (
    <Box style={styles.root}>
      <Stack spacing="17px">
        <Stack direction="row" alignItems="end" justifyContent="space-between">
          <Stack style={{ height: "63px" }} justifyContent="start">
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>{formatNumber(amount)} BNB</div>
            <div style={{ fontSize: "11px", color: "#aaaaaa" }}>≈{formatNumber(usd)} USD</div>
          </Stack>
          <img src={BnbIcon} style={{ width: "53px", height: "53px" }} alt="bnb icon" />
        </Stack>
        <Stack direction="row" alignItems="center" spacing="8px">
          <span style={{fontSize: "11px", color: "#aaaaaa"}}>Address: </span>
          <a style={{fontSize: "10px"}} href={link}>{address}</a>
          <img onClick={copy} src={CopyImg} alt="copy" style={{ width: "13px", height: "13px", cursor: "pointer" }} />
        </Stack>
      </Stack>
    </Box>
  )
}
