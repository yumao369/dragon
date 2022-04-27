import React from "react"

import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import { Stack } from "@mui/material"
import { SET_MY_MYSTERYBOX, SET_MY_NFTS } from "Constants/ActionTypes"

import Template from "Components/MyDragonaire/Template"
import Switcher from "Components/MyDragonaire/items/Swither"
import ItemFilter from "Components/MyDragonaire/items/ItemFilter"
import DragonCard from "Components/Marketplace/DragonCard"
import MysteryBoxItem from "Components/MyDragonaire/items/MysteryBoxItem"
import CurrencyStats from "Components/MyDragonaire/items/CurrencyStats"
import Pagination from "Components/Common/Pagination"
import { getAllMyNfts, getBoxes } from "Api/Endpoints"
import { Dispatch } from 'redux'
import { GetBoxesResp, GetMyOwnNftsResp, MyOwnNFT, MysteryBox } from "Capabilities/Capabilities"
import { splitEvery } from "ramda"

// @ts-ignore
const mapStateToProps = store => ({
  myNfts: store.MyNfts,
  myBoxes: store.MyBoxes,
  authentication: store.Authentication
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchNfts: async (address: string, page: number, nftStatus: 0 | 1 | 2) => {
    const [status, resp] = await getAllMyNfts<GetMyOwnNftsResp>(address, page, nftStatus)
    if (status === 200 && resp.code === 0 && resp.data) {
      dispatch({ type: SET_MY_NFTS, data: { nfts: resp.data.shelvesdata, total: resp.data.count, page } })
    }
  },
  fetchBoxes: async (address: string, page: number) => {
    const [status, resp] = await getBoxes<GetBoxesResp>(address, page)
    if (status === 200 && resp.code === 0 && resp.data) {
      dispatch({ type: SET_MY_MYSTERYBOX, data: { nfts: resp.data.shelvesdata, total: resp.data.count, page } })
    }
  }
})

type State = {
  selectedIndex: number;
  nftStatus: 0 | 1 | 2
}

class ItemsPage extends React.Component<any, State> {
  state: State = {
    selectedIndex: 0,
    nftStatus: 0,
  }

  componentDidMount() {
    this.fetch()
  }

  fetch(page = 1) {
    if (this.state.selectedIndex === 0) {
      this.props.fetchNfts(this.props.authentication.address, page, this.state.nftStatus)
    } else {
      this.props.fetchBoxes(this.props.authentication.address, page)
    }
  }

  viewDetail(id: number) {
    this.props?.history?.push(`/my/item/${id}`)
  }

  select(index: number) {
    if (index !== this.state.selectedIndex) {
      this.setState({ selectedIndex: index }, () => {
        this.fetch()
      })
    }
  }

  getMyNfts() {
    return this.state.selectedIndex === 0 ? this.props.myNfts : this.props.myBoxes
  }

  gotoPage(page: number) {
    if (page !== this.getMyNfts().page && page >= 1 && page <= this.getTotalPage()) {
      this.fetch(page)
    }
  }

  prevPage() {
    if (this.getMyNfts().page <= 1) {
      return
    } else {
      this.gotoPage(this.getMyNfts().page - 1)
    }
  }

  nextPage() {
    if (this.getMyNfts().page === this.getTotalPage()) {
      return
    } else {
      this.gotoPage(this.getMyNfts().page + 1)
    }
  }

  getTotalPage() {
    return Math.ceil(this.getMyNfts().total / this.getMyNfts().pageSize)
  }

  switchNftStatus(nftStatus: 0 | 1 | 2) {
    if (nftStatus !== this.state.nftStatus) {
      this.setState({ nftStatus }, this.fetch)
    }
  }

  render() {
    // @ts-ignore
    const myNfts = this.getMyNfts().nfts.filter(x => {
      const isBox = parseInt(x?.nftdata?.dna ?? "0") === 0
      const isBoxPage = this.state.selectedIndex === 1
      return (isBox && isBoxPage) || (!isBox && !isBoxPage)
    })
    const splited = splitEvery(4, myNfts)
    const name = this.state.selectedIndex === 0 ? "Dragons" : "Mystery Boxes"

    return (
      <Stack spacing="25px">
        <CurrencyStats />
        <Switcher options={["Dragons", "Mystery Boxes"]} selectedIndex={this.state.selectedIndex} select={this.select.bind(this)} />
        <Stack style={{ paddingLeft: "36px" }} spacing="25px">
          <Stack direction="row" justifyContent="space-between">
            <span style={{ color: "white", fontSize: "21px", fontWeight: "bold" }}>{this.getMyNfts().total} {name}</span>
            {this.state.selectedIndex === 0 ?
              (<ItemFilter onSelect={this.switchNftStatus.bind(this)} />)
              : (<></>)
            }
          </Stack>
          {/* Dargons */}
          <Stack spacing="20px" style={{ paddingLeft: "20px" }}>
            {
              splited.map((arr, idx) => {
                return (
                  <Stack key={idx} direction="row" justifyContent="start" spacing="26px">
                    {
                      arr.map((nft, i) => (
                        this.state.selectedIndex === 0

                          ? (<DragonCard key={i} nft={nft as MyOwnNFT} isMine={true} viewDetail={() => this.viewDetail.bind(this)((nft as MyOwnNFT).tokenid)} />)
                          : (<MysteryBoxItem key={i} box={nft as MysteryBox} />)
                      ))
                    }
                  </Stack>
                )
              })
            }
          </Stack>
          <Stack style={{ width: "100%", marginTop: "90px" }} justifyContent="center">
            {this.state.selectedIndex === 0 ? (
              <Pagination
                totalPage={this.getTotalPage()}
                page={this.props.myNfts.page}
                onPrev={this.prevPage.bind(this)}
                onNext={this.nextPage.bind(this)}
                onChange={this.gotoPage.bind(this)}
              />
            ) : (
              <Pagination
                totalPage={this.getTotalPage()}
                page={this.props.myBoxes.page}
                onPrev={this.prevPage.bind(this)}
                onNext={this.nextPage.bind(this)}
                onChange={this.gotoPage.bind(this)}
              />
            )}
          </Stack>
          <div style={{ minHeight: "150px" }} />
        </Stack>
      </Stack>
    )
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(withRouter(Template(ItemsPage) as any))
