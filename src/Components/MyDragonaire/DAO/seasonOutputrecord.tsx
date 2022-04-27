import React from "react"

import { Box, Stack } from "@mui/material"
import { formatNumber } from "Common/functions"
import DesIcon from "Assets/Images/Icon/des_big.png"
import DearIcon from "Assets/Images/Icon/dear_big.png"
import GradientButton from "Components/Common/GradientButton"
import { updateExtract } from 'Api/Endpoints'
import { web3Utils } from "Common/web3utils"
import { DAOSafe } from "Common/Contract/Contract"
import "./seasonOutputrecord.scss"
import CurrentTotal from "./CurrentTotal"

const styles: Styles = {
  root: {
    width: "700px",
    height: "700px",
    border: "3px",
    background: "#31413C",
  }
}

export default function Season() {
  const list1: { token: 'DES' | 'DEAR', amount: number }[] = []
  for (let i = 0; i < 1000; i++) {
    list1.push({ token: 'DEAR', amount: 100000 })
  }

  const renderList = () => {
    return list1.map((item, index) => {
      return <CurrentTotal token={item.token} amount={item.amount} key={index} />
    })
  }
  return (
    <Box style={styles.root}>
      <div className="scrollbars">
        {renderList()}
      </div>
    </Box>
  )
}