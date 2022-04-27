import React, { Component } from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { WithInitTemp } from "Containers"
import { Stack, Box } from "@mui/material"

import Navigation from "Components/Marketplace/Navigation"
import Filter from "./Filter"

import { getAllNfts } from 'Api/Endpoints'
import { SET_MARKETPLACE_NFTS, SET_PAGE } from 'Constants/ActionTypes'
import { formatNumber } from 'Common/functions'
import SearchAndSort from 'Components/Marketplace/SearchAndSort'
import DragonCard from 'Components/Marketplace/DragonCard'
import Pagination from 'Components/Common/Pagination'
import { Store, Dispatch } from 'redux'
import { splitEvery } from 'ramda'
import { MarketNFT, MarketNftsResp } from 'Capabilities/Capabilities'


const mapStateToProps = (store: any) => ({
  filter: store.MarketplaceFilter,
  marketplace: store.Marketplace,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetch: async (filter: any) => {
    const {
      element,
      classType,
      parity,
      farmPower,
      starRange,
      levelRange,
      breedRange,
      deRange,
      priceRange,
      searchId,
      sortType,
      pageIndex,
      pageSize,
    } = filter
    const sortTypes = ["Latest Sale", "Oldest Sale", "Lowest Sale", "Highest Sale"]
    const index = sortTypes.indexOf(sortType)

    const params = {
      camp: element, // element,
      career: classType, // classType,
      level: levelRange.join(','), // levelRange,
      computing: 0, // farmPower,
      energy: deRange.join(','), // deRange,
      quality: parity.join(','), // parity
      star_level: starRange.join(','), // starRange
      hatch: breedRange.join(','), // breedRange
      address: "", // 
      pageIndex, // 
      pageSize,
      amountLower: Boolean(priceRange[0]) ? priceRange[0] : 0, // price lower
      amountUpper: Boolean(priceRange[1]) ? priceRange[1] : 0, // price upper 
      sortContentType: Math.ceil((index + 1) / 2), // 1时间 2价格
      sortType: 2 - (index % 2),  // 1:正序 2倒序 默认正序
      tokenid: Boolean(searchId) ? searchId : 0, // id
      grade: farmPower.join(','),
    }

    const [status, resp] = await getAllNfts<MarketNftsResp>(params)
    if (status === 200 && resp.code === 0 && resp.data) {
      dispatch({ type: SET_MARKETPLACE_NFTS, data: { nfts: resp.data.shelvesdata, total: resp.data.count } })
    }
  },
  gotoPage: (page: number) => {
    dispatch({type: SET_PAGE, data: { page }})
  }
})

class Marketplace extends Component<any> {
  componentDidMount () {
    this.init()
  }

  init () {
    this.props.fetch(this.props.filter)
  }


  prevPage() {
    if (this.props.filter.pageIndex > 1) {
      this.props.gotoPage(this.props.filter.pageIndex - 1)
      this.props.fetch({...this.props.filter, pageIndex:this.props.filter.pageIndex - 1 })
    }
  }

  nextPage() {
    console.log(">>", this.props.filter.pageIndex, Math.ceil(this.props.marketplace.total / 8))
    if (this.props.filter.pageIndex < Math.ceil(this.props.marketplace.total / 8)) {
      this.props.gotoPage(this.props.filter.pageIndex + 1)
      this.props.fetch({...this.props.filter, pageIndex:this.props.filter.pageIndex + 1 })
    }
  }

  gotoPage(page: number) {
    if (page !== this.props.filter.pageIndex && page >= 1 && page <= Math.ceil(this.props.marketplace.total / 8)) {
      this.props.gotoPage(page)
      this.props.fetch({...this.props.filter, pageIndex: page })
    }
  }

  render () {
    const {
      nfts = [],
      total = 0,
    } = this.props.marketplace

    const splited = splitEvery(4, nfts as MarketNFT[])

    return (
      <Box sx={{ width: "1200px", paddingTop: "29px" }}>
        <Stack>
          <Navigation />
          <Stack direction="row">
            <Filter onApply={() => this.props.fetch(this.props.filter)} />

            <Box sx={{ width: "1000px", paddingLeft: "40px" }}>
              <Stack>
                <Stack direction="row" spacing="18px" style={{ margin: "20px 0 50px 0" }} alignItems="start">
                  <Stack direction="row" style={{ color: "white" }}>
                    <span style={{ fontSize: "29px" }}>{formatNumber(total)}</span>
                    <span style={{ fontSize: "18px", marginTop: "3px", marginLeft: "5px" }}>Dragons</span>
                  </Stack>
                  <div style={{ flex: 1 }} />
                  <SearchAndSort refresh={this.init.bind(this)}/>
                </Stack>

                {/* Dargons */}
                <Stack spacing="20px" style={{ paddingLeft: "20px" }}>
                  {
                    splited.map((arr, idx) => (
                      <Stack key={idx} direction="row" justifyContent="start" spacing="33px">
                        {arr.map((nft, i) => <DragonCard isMine={false} nft={nft} key={i} onClick={() => this.props.history.push(`/marketplace/${nft.orderid}`)} />)}
                      </Stack>
                    ))
                  }
                </Stack>
                <Stack style={{ width: "100%", marginTop: "90px" }} justifyContent="center">
                  <Pagination 
                    page={this.props.filter.pageIndex} 
                    totalPage={Math.ceil(total / 8)} 
                    onPrev={this.prevPage.bind(this)} 
                    onNext={this.nextPage.bind(this)} 
                    onChange={this.gotoPage.bind(this)} 
                  />
                </Stack>
                <div style={{ minHeight: "150px" }} />
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Box>
    )
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WithInitTemp(Marketplace as any) as any))
