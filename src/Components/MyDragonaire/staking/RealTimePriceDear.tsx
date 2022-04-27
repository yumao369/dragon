import React from 'react'
import { Stack, Box, Divider } from '@mui/material'
import { NorthEast, SouthEast } from "@mui/icons-material"

import DearIcon from "Assets/Images/Icon/dear.png"

function rate(isGrowing: boolean): React.CSSProperties {
  return {
    color: isGrowing ? "#f73131" : "#0ebe98",
    fontSize: "11px",
  }
}

const styles: Styles = {
  root: {
    width: "638px",
    height: "88px",
    borderRadius: "3px",
    background: "#31413C",
  },
  title: {
    fontSize: "13px",
    color: "#bbbbbb"
  },
  value: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  change: {
    width: "59px",
    height: "18px",
    background: "#192824",
    borderRadius: "2px",
    paddingLeft: "3px"
  }
}

export default function RealTimePriceDear(props: {}) {
  const isGrowing = Math.random() > 0.4
  return (
    <Stack spacing="20px">
      <Stack direction="row" spacing="6px">
        <img src={DearIcon} alt="dear" style={{ width: "22px", height: "22px" }} />
        <div style={{ fontSize: "18px" }}>DEAR stats</div>
      </Stack>
      <Box style={styles.root}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem style={{ borderColor: "#4A5351", height: "45px", margin: "auto 0" }} />}
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Stack style={{ flex: 1 }} alignItems="center" spacing="10px">
            <div style={styles.title}>DEAR PRICE</div>
            <Stack direction="row" spacing="10px" alignItems="center">
              <div style={styles.value}>$XXXXX</div>
              <Stack direction="row" style={styles.change} alignItems="center">
                {isGrowing ? <NorthEast style={{ fontSize: "16px" }} /> : <SouthEast style={{ fontSize: "16px" }} />}
                <div style={rate(isGrowing)}>0.62%</div>
              </Stack>
            </Stack>
          </Stack>

          <Stack style={{ flex: 1 }} alignItems="center" spacing="10px">
            <div style={styles.title}>DAILY REWARDS</div>
            <div style={styles.value}>X,XXX DEAR</div>
          </Stack>

          <Stack style={{ flex: 1 }} alignItems="center" spacing="10px">
            <div style={styles.title}>CIRCULATING SUPPLY</div>
            <div style={styles.value}>X,XXX DEAR</div>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  )
}