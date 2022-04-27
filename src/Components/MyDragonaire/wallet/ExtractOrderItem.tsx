import React from "react"

import { Box, Stack } from "@mui/material"
import { formatNumber } from "Common/functions"
import DesIcon from "Assets/Images/Icon/des_big.png"
import DearIcon from "Assets/Images/Icon/dear_big.png"
import GradientButton from "Components/Common/GradientButton"
import { updateExtract } from 'Api/Endpoints'

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

export default function ExtractOrderItem(props: {
  token: "DES" | "DEAR";
  status: number;
  orderId: number | string;
  amount: number;
  time: string;
}) {
  const {
    token,
    status,
    orderId,
    amount,
    time
  } = props
  const icon = token === "DES" ? DesIcon : DearIcon
  const formatTime = new Date(time)
  const year = formatTime.getFullYear()
  const month = formatTime.getMonth()
  const date = formatTime.getDate()
  const hour = formatTime.getHours()
  const minute = formatTime.getMinutes()
  const finalTime = year + '-' + month + '-' + date + ' ' + hour + ':' + minute

  const cancel = async () => {
    const FAIL = 4
    const [status, resp] = await updateExtract<any>(orderId, FAIL)
    if (status === 200 && resp.code === 0) {
      window.message.success(`You have canceled the order: ${orderId} successfully.`)
    }
  }

  return (
    <Box style={styles.root}>
      <Stack direction="row" alignItems="center" style={{ height: "100%" }}>
        <img style={styles.icon} src={icon} alt="icon" />
        <span style={styles.name}>${token} </span>
        <div style={{ flex: 1 }} />
        <div style={{ marginRight: "15px" }}>Amount </div>
        <div style={styles.price}>{formatNumber(parseFloat(String(amount)))}</div>
        <div style={{ flex: 2 }} />
        <div style={styles.time}>{finalTime}</div>

        {status >= 2
          ? (
            <GradientButton
              startColor="#FFB631"
              endColor="#D88B27"
              height="27px"
              width="100px"
              onClick={cancel}
            >Cancel</GradientButton>
          )
          : (<></>)
        }
      </Stack>
    </Box>
  )
}