import React, { useEffect, useState } from "react"

import { withRouter } from "react-router-dom"

import { Stack } from "@mui/material"

import Template from "Components/MyDragonaire/Template"
import ClaimTokenItem from "Components/MyDragonaire/claim/ClaimTokenItem"
import { useSelectable } from "Common/Hooks"
import CurrencyStats from "Components/MyDragonaire/items/CurrencyStats"
import Switcher from "Components/MyDragonaire/items/Swither"
import CliamOrderItem from "Components/MyDragonaire/claim/CliamOrderItem"
import { connect } from "react-redux"
import { ClaimPool } from "Components/MyDragonaire/claim/ClaimPool"
import ClaimHistory from "Components/MyDragonaire/claim/ClaimHistory"
import Spacer from "Components/Containers/Spacer"
import { checkGameUser, getTokenInGame, handleError } from "Api/Endpoints"
import { web3Utils } from "Common/web3utils"
import ClaimDearItem from "Components/MyDragonaire/claim/ClaimDearItem"
import BaseComponent from "Components/Common/BaseComponent"
import { GameUser, GetGameCurrencyResp } from "Capabilities/Capabilities"
import { handleCallResp } from "Common/utils"
import Center from "Components/Layout/Center"
import RefreshIcon from "Assets/Images/Icon/refresh.png"
import { Dispatch } from 'redux'
import { MY_ITEMS_LOAD } from "Constants/ActionTypes"

const stackStyle = { paddingLeft: "37px", margnTop: "40px" }

const styles: Styles ={
  disableWallet:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    position:"absolute",
    border:"1px dashed #444B48",
    top:"225px",
    zIndex:"100",
    height:"260px",
    width:"600px",
    marginBottom: "31px",
    fontSize: "18px",
    fontWeight: "bold",
    color:"red",
    padding:"10px",
    paddingTop:"230px",
    background:'#182A22',
    opacity:"0.6"
  },
  refresh: {
    width: "25px",
    height: "25px",
    background: "#3E8959",
    borderRadius: "3px",
    border: "none",
    padding: "0",
    marginLeft:"10px",
  },
}

const mapStateToProps = (store: any) => ({
  MyItemsLoad:store.MyItemsLoad
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  myItemsLoad: (data:any) => dispatch({ type: MY_ITEMS_LOAD, data})
})


type State = {
  mDear: number; 
  mDes: number;
  dearPool: number;
  totalClaim: number;
  selectedIndex: number;
  applied: number;
}

class ClaimTokenPage extends BaseComponent<any, State> {
  state = { 
    mDear: 0, 
    mDes: 0, 
    dearPool: 0,
    totalClaim: 0,
    selectedIndex: 0,
    applied: 0,
  }

  componentDidMount () {
    super.componentDidMount()
    this.init()
    this.initOrder()
    this.initWallet()
  }

  async init () {
    try {
      await web3Utils.init()
      const data = await handleError(getTokenInGame<GetGameCurrencyResp>())
      this.safeSetState({ mDear: data.mDear, mDes: data.mDes })
      const resp = await (await web3Utils.getContract("rewardsController")).getCurrentReleaseInfo()
      handleCallResp(resp)
      this.setState({ 
        dearPool: resp[1].amount / 1e18,
        totalClaim: resp[1].application / 1e18,
      })
    } catch (e: any) {
      window.message.error(`Error: ${e?.message ?? "Unkown Error"}`)
    }
  }
  
  async initOrder() {
    await web3Utils.init()
    const [status, applied] = await (await web3Utils.getContract("rewardsController")).getApplied()
    if (status === "Ok") {
      this.setState({applied: applied.amount / 1e18})
    }
  }

  getRate() {
    let rate  = 1
    if (this.state.totalClaim > 0) {
      rate = Math.min(1, this.state.dearPool / this.state.totalClaim)
    }
    return rate
  }

  async initWallet(){
    const [status,resp]=await checkGameUser<GameUser>();
    if (status === 200 && resp.code === 0 && resp.data){
      const data = resp.data.exist;
      this.props.myItemsLoad(data);
    }
  }

  renderClaimToken() {
    const rate = this.getRate()
    const {activateWallet}=this.props.MyItemsLoad;
    return (
      <Stack style={stackStyle}>
        {activateWallet===false?(
                <div style={styles.disableWallet}>
                <div>please sign in game then refresh to activate Claim Token</div>
                <button style={styles.refresh} onClick={this.initWallet.bind(this)}>
                <Center>
                  <img src={RefreshIcon} alt="refresh" style={{ width: "13px", height: "17px" }} />
                </Center>
              </button>
              </div>
              ):''}
          <Stack direction="row" spacing="40px">
            <ClaimDearItem 
              token="DEAR" 
              ownAmount={this.state.mDear} 
              poolAmount={this.state.dearPool} 
              rate={rate}
              onSuccess={this.initOrder.bind(this)}
            />

            <ClaimTokenItem token="DES" ownAmount={this.state.mDes} poolAmount={0}/>
            {/* <ClaimPool pool={this.state.dearPool}/> */}
          </Stack>

          {/* 总储备量 */}
          
          <ClaimHistory style={{ marginTop: "50px" }} />

          <div style={{ fontSize: "16px", fontWeight: "bold", marginTop: "33px" }}>Exchange ratio</div>
          <ul style={{ color: "#aaaaaa", fontSize: "16px", marginTop: "26px" }}>
            <li>The redemption of $mDEAR can only be performed 15 days (starting from the day when association to METAMESK account succeeds) after the creation of an account</li>
            <li>Subsequent redemption can only be performed 48 hours after the first successful redemption of $mDEAR.</li>
            <li>The redemption of $mDES is not restricted.</li>
          </ul>
          <div style={{ fontSize: "16px", fontWeight: "bold", marginTop: "33px" }}>Handling Fee</div>
          <ul style={{ color: "#aaaaaa", fontSize: "16px", marginTop: "26px" }}>
            <li>A 4% charge over the conversion of $mDEAR and $mDES will be imposed;</li>
            <li>Minimum charge: XX.</li>
          </ul>
          <Spacer height="100px" />
        </Stack>
    )
  }

  renderOrderList() {
    const rate = this.getRate()
    return (
      this.state.applied > 0
        ? (<Stack spacing="20px" style={stackStyle}>
          <CliamOrderItem token="DEAR" amount={this.state.applied} rate={rate}/>
        </Stack>
        )
        : <></>
    )
  }

  render () {
    return (
      <Stack spacing="25px" >
        <CurrencyStats />
        <Switcher options={["Claim Token", "Order List"]} selectedIndex={this.state.selectedIndex} select={i => this.setState({selectedIndex: i})} />
        {
          this.state.selectedIndex === 0 
            ? this.renderClaimToken()
            : this.renderOrderList()
        }
      </Stack >
    )
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(withRouter(Template(ClaimTokenPage) as any))
