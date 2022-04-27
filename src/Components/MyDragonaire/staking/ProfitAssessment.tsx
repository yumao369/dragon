import React from "react"

import { Box, Stack, Tooltip } from "@mui/material"
import { ErrorOutline } from "@mui/icons-material"
import StakePointsIcon from "Assets/Images/Icon/stake_points.png"
import TotalStakePointsIcon from "Assets/Images/Icon/total_stake_points.png"
import ProfitAssessmentIcon from "Assets/Images/Icon/profit_assessment.png"
import { web3Utils } from "Common/web3utils"

const styles: Styles = {
  box: {
    width: "303px",
    height: "239px",
    borderRadius: "3px",
    background: "#31413C",
    paddingLeft: "27px",
    paddingTop: "15px"
  },
  row: {
    fontSize: "16px",
    height: "62px",
    width: "253px",
    borderBottom: "1px solid #444E4B"
  }
}

export default class ProfitAssessment extends React.Component {
  state = {
    myCap: 0,
    totalCap: 0,
    profitAssessment: 0
  }

  componentDidMount () {
    this.init()
  }

  async init () {
    await web3Utils.init()
    const [status, info] = await (await web3Utils.getContract("stakingRewards")).profitAssessment()
    if (status === "Ok") {
      this.setState({
        myCap: info.myCap,
        totalCap: info.totalCap,
        profitAssessment: info.profitAssessment / 1e18
      })
    }
  }

  render () {
    return (
      <Stack spacing="25px">
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>Estimated Rewards</div>
        <Box style={styles.box}>
          <Stack>
            <Stack direction="row" alignItems="center" style={styles.row} spacing="2px">
              <img src={StakePointsIcon} alt="icon" style={{ width: "12px", height: "14px" }} />
            <span>My Mining Power: </span>
              <Tooltip title="The sum of all staking dargons' farm power " placement="top" arrow>
                <Stack alignItems="center" direction="row" spacing="6px">
                  <span>{this.state.myCap}</span>
                  <ErrorOutline />
                </Stack>
              </Tooltip>
            </Stack>
            <Stack direction="row" alignItems="center" style={styles.row} spacing="2px">
              <img src={TotalStakePointsIcon} alt="icon" style={{ width: "17px", height: "15px" }} />
              <span>Total Mining Power: </span>
              <span>{this.state.totalCap}</span>
            </Stack>
            <Stack direction="row" alignItems="center" style={styles.row} spacing="2px">
              <img src={ProfitAssessmentIcon} alt="icon" style={{ width: "15px", height: "15px" }} />
              <span>Claimable Rewards: </span>
              <span>{this.state.profitAssessment}</span>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    )
  }
}
