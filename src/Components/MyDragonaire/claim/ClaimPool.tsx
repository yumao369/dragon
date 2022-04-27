import React from 'react'
import { Box, Stack } from "@mui/material"
import { formatNumber } from 'Common/functions'
import Center from 'Components/Layout/Center'
import DearIcon from "Assets/Images/Icon/dear_big.png"

const styles: Styles = {
  root: {
    background: "#303C39",
    borderRadius: "3px",
    padding: "22px 29px 26px 29px",
    width: "255px",
    height: "200px",
  },
  title: {
    position: "absolute",
    left: "20px",
    top: "20px",
    fontWeight: "bold",
  },
  amount: {
    fontSize: "30px",
    fontWeight: "bold",
  }
}

export function ClaimPool (props: {
  pool: number;
  style?: React.CSSProperties;
}) {
  const {
    pool,
    style = {}
  } = props 
  return (
    <Box style={{...styles.root, ...style}} position="relative">
      <Stack direction="row" style={styles.title} spacing="5px">
        <img src={DearIcon} alt="token icon" style={{ width: "20px", height: "20px" }} />
        <div>$DEAR</div>
      </Stack>
      <Center>
        <div style={styles.amount}>{formatNumber(pool)}</div>
      </Center>
    </Box>
  )
}