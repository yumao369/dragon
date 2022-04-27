import React, { Component, ComponentType } from "react";
import BaseComponent from "Components/Common/BaseComponent"
import { Stack } from "@mui/material";
import CurrencyStats from "Components/MyDragonaire/items/CurrencyStats";
import Switcher from "Components/MyDragonaire/items/Swither";
import { withRouter } from "react-router-dom"
import Template from "Components/MyDragonaire/Template"
import { useSelectable } from "Common/Hooks"
import CurrentTotal from "Components/MyDragonaire/DAO/CurrentTotal";
import CumulativeAmount from "Components/MyDragonaire/DAO/CumulativeAmount";
import DeliveryValue from "Components/MyDragonaire/DAO/DeliveryValue";
import { any } from "ramda";
import { DAOSafe } from "Common/Contract/Contract";
import { web3Utils } from "Common/web3utils";
import Season from "Components/MyDragonaire/DAO/seasonOutputrecord";
import { getNearlyDao } from "Api/Endpoints";
import { getNearlyDaoResp } from "Capabilities/Capabilities";

type State = {
  selectedIndex: number;
}

const parent = (SonComponent: ComponentType<any>) => {
  class PackageComponent extends Component<any> {

    state = {
      dataStatus: false,
      nearlyDaoStatus: false,
      CurrentTotal: 0,
      nearlyDao: []
    }

    async componentWillMount() {
      await this.getCurrentTotla()
      await this.getNearlyDao()
    }

    getCurrentTotla = async () => {
      const data = await (await web3Utils.getContract("dearContract")).balanceOfDao(DAOSafe.address)
      this.setState({ CurrentTotal: data[1] })
      this.setState({ dataStatus: true })
    }

    getNearlyDao = async () => {
      const [status, resp] = await getNearlyDao<getNearlyDaoResp[]>();
      if (status === 200 && resp.code === 0 && resp.data) {
        const data = resp.data;
        this.setState({ nearlyDao: data })
        this.setState({ nearlyDaoStatus: true })
      }
    }

    render() {
      const loading = this.state.dataStatus && this.state.nearlyDaoStatus ? true : false;
      return (
        <>{
          loading ?
            <SonComponent CurrentTotal={this.state.CurrentTotal} nearlyDao={this.state.nearlyDao} /> : 'loading...'
        }
        </>)
    }

  }

  return PackageComponent;
}

class DAOPage extends BaseComponent<any, State> {

  state: State = {
    selectedIndex: 0,
  }

  render() {
    return (
      <Stack spacing="25px" >
        <CurrencyStats />
        <Switcher options={["DAO"]} selectedIndex={this.state.selectedIndex} select={i => this.setState({ selectedIndex: i })} />
        <Stack style={{ paddingLeft: "37px", marginTop: "40px" }}>
          <Stack spacing="24px">
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>Current Total</div>
            <CurrentTotal token="DEAR" amount={this.props.CurrentTotal}></CurrentTotal>
          </Stack>
          <Stack spacing="24px" style={{ marginTop: "49px" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>Cumulative volume in the past month</div>
            <CumulativeAmount nearlyDao={this.props.nearlyDao} />
          </Stack>
          <Stack spacing="24px" style={{ marginTop: "49px" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>Current and historical delivery volume</div>
            <DeliveryValue amount={this.props.CurrentTotal} nearlyDao={this.props.nearlyDao} />
          </Stack>
          <Stack spacing="24px" style={{ marginTop: "49px", marginBottom: "49px" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>season output record</div>
            <Season />
          </Stack>
        </Stack>
      </Stack >
    )

  }
}

export default (withRouter(Template(parent(DAOPage)) as any))