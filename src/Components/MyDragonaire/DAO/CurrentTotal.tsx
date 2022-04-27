import React, { useEffect } from "react"

import { Box, Stack } from "@mui/material"
import { formatNumber } from "Common/functions"
import DesIcon from "Assets/Images/Icon/des_big.png"
import DearIcon from "Assets/Images/Icon/dear_big.png"
import GradientButton from "Components/Common/GradientButton"
import { updateExtract } from 'Api/Endpoints'
import { web3Utils } from "Common/web3utils"
import { DAOSafe } from "Common/Contract/Contract"

const styles: Styles = {
  root: {
    width: "700px",
    height: "64px",
    border: "3px",
    background: "#31413C",
    paddingRight: "21px"
  },
  icon: {
    width: "42px",
    height: "42px",
    marginLeft: "21px",
  },
  name: {
    fontSize: "16px",
    fontWeight: "bold",
    marginLeft: "7px",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold"
  },
  rate: {
    color: "#f73131",
    fontSize: "18px",
    marginLeft: "5px"
  },
  time: {
    fontSize: "18px",
    marginLeft: "11px",
    marginRight: "34px",
  }
}

export default function CurrentTotal(props: {
  token: "DES" | "DEAR";
  amount: number;
}) {
  const {
    token,
    amount,
  } = props
  const icon = token === "DES" ? DesIcon : DearIcon

  return (
    <Box style={styles.root}>
      <Stack direction="row" alignItems="center" style={{ height: "100%" }}>
        <img style={styles.icon} src={icon} alt="icon" />
        <span style={styles.name}>${token} </span>
        <div style={{ flex: 1 }} />
        <div style={{ marginRight: "15px" }}>Amount </div>
        <div style={styles.price}>{formatNumber(parseFloat(String(amount)))}</div>
        <div style={{ flex: 2 }} />
      </Stack>
    </Box>
  )
}