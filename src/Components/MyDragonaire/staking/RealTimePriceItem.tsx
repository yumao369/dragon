import React from "react"

import { Box, Stack } from "@mui/material"
import { NorthEast, SouthEast } from "@mui/icons-material"
import { formatNumber } from "Common/functions"

function rate(isGrowing: boolean): React.CSSProperties {
  return {
    color: isGrowing ? "#f73131" : "#0ebe98",
    fontSize: "18px",
    marginLeft: "5px"
  }
}

const styles: Styles = {
  root: {
    width: "638px",
    height: "64px",
    border: "3px",
    background: "#31413C",
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
  time: {
    fontSize: "18px",
    marginLeft: "11px",
    marginRight: "34px",
  }
}

export default function RealTimePriceItem(props: {
  icon: string;
  name: string;
  price: number;
}) {
  const isGrowing = Math.random() > 0.5
  return (
    <Box style={styles.root}>
      <Stack direction="row" alignItems="center" style={{ height: "100%" }}>
        <img style={styles.icon} src={props.icon} alt="icon" />
        <span style={styles.name}>${props.name} Price</span>
        <div style={styles.price}>{formatNumber(props.price)} USD</div>

        <div style={{ flex: 1 }} />

        {
          isGrowing
            ? <NorthEast />
            : <SouthEast />
        }

        <div style={rate(isGrowing)}>0.62%</div>
        <div style={styles.time}>last 24h</div>
      </Stack>
    </Box>
  )
}