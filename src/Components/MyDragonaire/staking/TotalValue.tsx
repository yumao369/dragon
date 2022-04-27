import React from "react"

import { Box, Stack, CircularProgress, circularProgressClasses } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { style } from "@mui/system";
import { web3Utils } from "Common/web3utils";
import { formatWei } from "Common/functions";
import { handleCallResp } from "Common/utils";
ChartJS.register(ArcElement, Tooltip, Legend);

const StyledCircular = styled(CircularProgress)({
  [`&.${circularProgressClasses.colorPrimary}`]: {
    color: "white",
  },
});

const styles: Styles = {
  box: {
    width: "303px",
    height: "311px",
    borderRadius: "3px",
    background: "#31413C",
    position: "relative",
  },
  stack: {
    position: "relative",
    top: "26px",
    left: "0",
    width: "303px",
    height: "259px"
  },
  chart: {
    position: "absolute",
    left: "70px",
    top: "70px",
    zIndex: 4,
    width: "164px",
    height: "164px",
  },
  chartBg: {
    position: "absolute",
    left: "70px",
    top: "70px",
    zIndex: 3,
    width: "164px",
    height: "164px",
  },
}

export default class TotalValue extends React.Component {
  state = {
    percent: 0,
    total: 0,
    userEarned: 0,
    released: 0,
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    try {
      await web3Utils.init()
      const resp = await (await web3Utils.getContract("stakingRewards")).currentEraInfo()
      handleCallResp(resp)
      this.setState({
        userEarned: resp[1].userEarned,
        released: resp[1].released,
      })

      const resp2 = await (await web3Utils.getContract("stakingRewards")).releasedInfo()
      handleCallResp(resp2)
      this.setState({
        percent: resp2[1].released / resp2[1].total * 100,
        total: resp2[1].total
      })
    } catch (e: any) {
      window.message.error(`Error: ${e?.message ?? "Unknown error"}`)
    }
  }

  render() {
    return (
      <Stack spacing="25px">
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>Total Value</div>
        <Box style={styles.box}>
          <Stack style={styles.stack} alignItems="center" justifyContent="space-between">
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>Dragonaire Rewarads</div>
            <Stack spacing="15px">
              <div style={{ fontSize: "11px", color: "#bbbbbb", lineHeight: 1.5, textAlign: "center" }}>Total<br />Distributed</div>
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>{formatWei(this.state.total)}</div>
            </Stack>

            <Stack direction="row" style={{ fontWeight: "bold", width: "271px" }} justifyContent="space-between">
              <Stack>
                <div style={{ fontSize: "11px" }}>User Earned:</div>
                <div style={{ fontSize: "19px" }}>{formatWei(this.state.userEarned)}</div>
              </Stack>
              <Stack>
                <div style={{ fontSize: "11px" }}>Released:</div>
                <div style={{ fontSize: "19px" }}>{formatWei(this.state.released)}</div>
              </Stack>
            </Stack>
          </Stack>
          <CircularProgress style={styles.chartBg} sx={{ color: "#192824" }} variant="determinate" value={100} />
          <StyledCircular style={styles.chart} variant="determinate" value={this.state.percent} />
        </Box>
      </Stack>
    )
  }
}
