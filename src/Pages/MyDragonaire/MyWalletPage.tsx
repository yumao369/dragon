import React from "react"
import { withRouter } from "react-router-dom"
import { Stack } from "@mui/material"
import Template from "Components/MyDragonaire/Template"
import BnbItem from "Components/MyDragonaire/wallet/BnbItem"
import CurrencyItem from "Components/MyDragonaire/wallet/CurrencyItem"
import CurrencyStats from "Components/MyDragonaire/items/CurrencyStats"
import Switcher from "Components/MyDragonaire/items/Swither"
import Pagination from "Components/Common/Pagination"
import { checkGameUser, getExtractOrder, getRecharge, getTokenInGame, handleError } from "Api/Endpoints"
import { connect } from "react-redux"
import { MY_ITEMS_LOAD, SET_EXTRACT_ORDER_LIST, SET_MDEAR, SET_MDES } from "Constants/ActionTypes"
import ClaimTokenModal from "Components/MyDragonaire/wallet/ClaimTokenModal"
import { web3Utils } from "Common/web3utils"
import ExtractOrderItem from "Components/MyDragonaire/wallet/ExtractOrderItem"
import BaseComponent from "Components/Common/BaseComponent"
import { Dispatch } from 'redux'
import { ExtractResp, GameUser, GetClaimOrderResp, getExtractOrderResp, GetGameCurrencyResp } from "Capabilities/Capabilities"
import { handleCallResp } from "Common/utils"
import Center from "Components/Layout/Center"
import RefreshIcon from "Assets/Images/Icon/refresh.png"

const styles: Styles = {
  disableWallet: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "absolute",
    border: "1px dashed #444B48",
    top: "250px",
    zIndex: "100",
    height: "500px",
    width: "900px",
    marginBottom: "31px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "red",
    padding: "10px",
    background: '#182A22',
    opacity: "0.6"
  },
  refresh: {
    width: "25px",
    height: "25px",
    background: "#3E8959",
    borderRadius: "3px",
    border: "none",
    padding: "0",
    marginLeft: "10px",
  },
}

const mapStateToProps = (store: any) => ({
  token: store.Tokens,
  MyItemsLoad: store.MyItemsLoad,
  ExtractOrderList: store.ExtractOrderList
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMDes: (data: any) => dispatch({ type: SET_MDES, data }),
  setMDear: (data: any) => dispatch({ type: SET_MDEAR, data }),
  myItemsLoad: (data: any) => dispatch({ type: MY_ITEMS_LOAD, data }),
  fetchExtractOrderList: async (page: number) => {
    const [status, resp] = await getRecharge<getExtractOrderResp>(page)
    if (status === 200 && resp.code === 0 && resp.data) {
      console.log('resp.data', resp.data)
      dispatch({ type: SET_EXTRACT_ORDER_LIST, data: { page, total: resp.data.count, extractOrderList: resp.data.rechargeOrder } })
    }
  }
})

type Props = {
  setMDear: (data: any) => void;
  setMDes: (data: any) => void;
}

type State = {
  claimModalVisible: boolean;
  token: "DEAR" | "DES";
  ownAmount: number;
  poolAmount: number;
  selectedIndex: number;
  claimOrdersType1: any[];
  claimOrdersType2: any[];
}

class MyWalletPage extends BaseComponent<any, State> {
  state: State = {
    claimModalVisible: false,
    token: "DEAR",
    ownAmount: 0,
    poolAmount: 0,
    selectedIndex: 0,
    claimOrdersType1: [],
    claimOrdersType2: []
  }

  componentDidMount() {
    super.componentDidMount()
    this.init()
    this.initClaimOrdersType1()
    this.initClaimOrdersType2()
    this.initWallet()
    this.fetch()
  }

  async init() {
    try {
      await web3Utils.init()
      const data = await handleError(getTokenInGame<GetGameCurrencyResp>())
      this.props.setMDear(data.mDear)
      this.props.setMDes(data.mDes)
      const resp = await (await web3Utils.getContract("exchangeAgentContract")).storedTokensOf()
      handleCallResp(resp)
      this.safeSetState({ poolAmount: parseInt(resp[1]) })
    } catch (e: any) {
      window.message.error(`Error: ${e?.message ?? "Unkown Error"}`)
    }
  }

  async initClaimOrdersType1() {
    const [status, resp] = await getExtractOrder<GetClaimOrderResp>(1, -1)
    if (status === 200 && resp.code === 0 && resp.data) {
      const data = resp.data.map(x => ({
        orderId: x.orderid,
        amount: x.amount,
        token: x.money_type.slice(1).toUpperCase(),
        staus: x.status
      }))
      this.safeSetState({ claimOrdersType1: data })
    }
  }

  async initClaimOrdersType2() {
    const [status, resp] = await getExtractOrder<GetClaimOrderResp>(2, -1)
    if (status === 200 && resp.code === 0 && resp.data) {
      const data = resp.data.map(x => ({
        orderId: x.orderid,
        amount: x.amount,
        token: x.money_type.slice(1).toUpperCase(),
        staus: x.status
      }))
      this.safeSetState({ claimOrdersType2: data })
    }
  }

  async initWallet() {
    const [status, resp] = await checkGameUser<GameUser>();
    if (status === 200 && resp.code === 0 && resp.data) {
      const data = resp.data.exist;
      this.props.myItemsLoad(data)
    }
  }

  fetch(page = 1) {
    this.props.fetchExtractOrderList(page)
  }

  getExtractOrderList() {
    return this.props.ExtractOrderList
  }

  getTotalPage() {
    return Math.ceil(this.getExtractOrderList().total / this.getExtractOrderList().pageSize)
  }

  gotoPage(page: number) {
    if (page !== this.getExtractOrderList().page && page >= 1 && page <= this.getTotalPage()) {
      this.fetch(page)
    }
  }

  prevPage() {
    if (this.props.ExtractOrderList.page <= 1) {
      return
    } else {
      this.gotoPage(this.props.ExtractOrderList.page - 1)
    }
  }

  nextPage() {
    if (this.props.ExtractOrderList.page === this.getTotalPage()) {
      return
    } else {
      this.gotoPage(this.props.ExtractOrderList.page + 1)
    }
  }

  showClaimDearModal() {
    this.setState({
      claimModalVisible: true,
      token: "DEAR",
      ownAmount: this.props.token.mDear,
    })
  }

  showClaimDesModal() {
    this.setState({
      claimModalVisible: true,
      token: "DES",
      ownAmount: this.props.token.mDes,
    })
  }

  renderOrderList() {
    const ExtractOrderList = [];
    const ClaimOrderList = this.state.claimOrdersType1.concat(this.state.claimOrdersType2)
    console.log('ClaimOrderList', ClaimOrderList, 'this.state.claimOrdersType1', this.state.claimOrdersType1, 'this.state.claimOrdersType2', this.state.claimOrdersType2)
    for (const item of this.getExtractOrderList().extractOrderList) {
      ExtractOrderList.push({
        orderId: item.orderid,
        amount: item.amount,
        token: item.money_type.slice(1).toUpperCase(),
        status: item.status,
        time: item.create_time
      })
    }
    console.log('OrderList', ExtractOrderList)
    return (
      <Stack spacing="20px" style={{ paddingLeft: "37px", marginTop: "40px" }}>
        {this.state.selectedIndex === 1
          ? ExtractOrderList.map((elm, i) => (<ExtractOrderItem key={i}  {...elm} />))
          : ClaimOrderList.map((elm, i) => (<ExtractOrderItem key={i}  {...elm} />))
        }
        {this.state.selectedIndex === 1 ? (
          <Pagination
            totalPage={this.getTotalPage()}
            page={this.props.ExtractOrderList.page}
            onPrev={this.prevPage.bind(this)}
            onNext={this.nextPage.bind(this)}
            onChange={this.gotoPage.bind(this)}
          />
        ) : ''}
      </Stack>

    )
  }

  render() {
    const { activateWallet } = this.props.MyItemsLoad;
    return (
      <Stack spacing="25px">
        <CurrencyStats />
        <Switcher options={["My Wallet", "Extract Order List", "Claim Order List"]} selectedIndex={this.state.selectedIndex} select={i => this.setState({ selectedIndex: i })} />
        {this.state.selectedIndex === 0
          ? (<Stack spacing="25px">
            <Stack style={{ paddingLeft: "37px", marginTop: "55px" }}>
              {activateWallet === false ? (
                <div style={styles.disableWallet}>
                  <div>please sign in game then refresh to activate wallet</div>
                  <button style={styles.refresh} onClick={this.initWallet.bind(this)}>
                    <Center>
                      <img src={RefreshIcon} alt="refresh" style={{ width: "13px", height: "17px" }} />
                    </Center>
                  </button>
                </div>
              ) : ''}
              <Stack direction="row" spacing="40px">
                <BnbItem amount={this.props.token.bnb / 1e18} />
                <CurrencyItem amount={this.props.token.des / 1e18} usd={123456} token="DES" inGame={false} />
              </Stack>

              <div style={{ marginTop: "55px", marginBottom: "31px", fontSize: "18px", fontWeight: "bold" }}>Ingame Currency</div>
              <Stack direction="row" spacing="40px">
                <CurrencyItem dearPool={this.state.poolAmount / 1e18} amount={this.props.token.mDear} usd={12345} token="DEAR" inGame={true} onClick={this.showClaimDearModal.bind(this)} />
                <CurrencyItem amount={this.props.token.mDes} usd={123456} token="DES" inGame={true} onClick={this.showClaimDesModal.bind(this)} />
              </Stack>
            </Stack>

            <ClaimTokenModal
              visible={this.state.claimModalVisible}
              hide={() => this.setState({ claimModalVisible: false })}
              token={this.state.token}
              ownAmount={this.state.ownAmount}
              poolAmount={this.state.poolAmount / 1e18}
            />
          </Stack>
          )
          : this.renderOrderList()
        }
      </Stack>
    )
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(withRouter(Template(MyWalletPage) as any))
