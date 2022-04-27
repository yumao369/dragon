import React from "react"

import { Box, Stack } from "@mui/material"
import { NorthEast, SouthEast } from "@mui/icons-material"
import { formatNumber } from "Common/functions"
import DesIcon from "Assets/Images/Icon/des_big.png"
import DearIcon from "Assets/Images/Icon/dear_big.png"
import GradientButton from "Components/Common/GradientButton"

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
    width: "178px",
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

export default function CliamOrderItem (props: {
  token: "DES" | "DEAR";
  amount: number;
  rate: number;
}) {
  const icon = props.token === "DES" ? DesIcon : DearIcon
  return (
    <Box style={styles.root}>
      <Stack direction="row" alignItems="center" style={{ height: "100%" }}>
        <img style={styles.icon} src={icon} alt="icon" />
        <span style={styles.name}>${props.token} </span>
        <div style={{marginRight: "15px"}}>Amount </div>
        <div style={styles.price}>{formatNumber(props.amount)}</div>

        <div style={{ flex: 1 }} />
        <div style={{marginRight: "10px"}}>Rate </div>
        <div style={styles.rate}>{props.rate.toFixed(2)}</div>
        {/* <div style={{ flex: 1 }} /> */}
        {/* <GradientButton
          startColor="#FFB631"
          endColor="#D88B27"
          height="27px"
          width="100px"
        >Cancel Order</GradientButton> */}
      </Stack>
    </Box>
  )
}