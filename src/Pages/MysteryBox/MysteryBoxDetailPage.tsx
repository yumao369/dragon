import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { WithInitTemp } from "Containers"

import { Box, Stack } from "@mui/material"

import MysteryBoxItem from "Components/MysteryBox/MysteryBoxItem"
import DropRateDetail from "Components/MysteryBox/DropRateDetail"
import AvailableHeros from "Components/MysteryBox/AvailableHeros"
import BackArrow from "Components/Common/BackArrow"
import { web3Utils } from "Common/web3utils"
import * as DragonConfig from "Constants/DragonConfig.json"
import { boxTypeToPercents } from "Constants/DragonConfig"
import BaseComponent from "Components/Common/BaseComponent"

const styles: Styles = {
  root: {
    color: "white",
    paddingTop: "29px",
  }
}

const dragons = {
  "1": DragonConfig[1],
  "2": DragonConfig[2],
  "3": DragonConfig[3]
}

type State = {
  avaiable: number;
  price: number;
  token: string;
  issuerId: number;
  boxDragons: Array<{
    boxType: number;
    artifactType: number;
    itemId: number;
    percent: number;
  }>
}

class MysteryBoxDetailPage extends BaseComponent<any, State> {
  state: State = {
    avaiable: 0,
    price: 0,
    token: '0x0',
    issuerId: 0,
    boxDragons: []
  }

  componentDidMount() {
    super.componentDidMount()
    this.init()
  }

  async init() {
    const cat = this.props.match.params.cat
    const boxDragons = dragons[cat]
    this.safeSetState({ boxDragons: boxDragons })
    await web3Utils.init()
    const [status, issuer] = await (await web3Utils.getContract("mysteryBoxIssuer")).issuances(cat)
    if (status === "Ok") {
      this.safeSetState({
        avaiable: parseInt(issuer.cap) - parseInt(issuer.issuedCount),
        price: parseInt(issuer.price),
        token: issuer.tokenContract,
        issuerId: parseInt(cat),
      })
    }
  }

  render() {
    const dragonIds = this.state.boxDragons.map(x => x.itemId)
    // const percent = [
    //   this.state.boxDragons.find(x => x.a)
    // ]
    return (
      <Box sx={styles.root}>
        <Stack>
          <BackArrow />
          <Stack direction="row">
            <MysteryBoxItem
              {...this.props}
              avaiable={this.state.avaiable}
              price={this.state.price}
              token={this.state.token}
              issuerId={this.state.issuerId}
              showLogin={this.props.showLogin}
            />
            <Stack spacing="32px">
              <div style={{ fontSize: "21px", color: "white", fontWeight: "bold" }}>LEGENDARY BOX</div>
              <DropRateDetail percents={boxTypeToPercents[this.props.match.params.cat]} />
              <AvailableHeros dragonIds={dragonIds} />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    )
  }
}



export default connect(
  store => ({}), {}
)(withRouter(WithInitTemp(MysteryBoxDetailPage) as any))
