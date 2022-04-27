import React from "react"


import { Stack, Badge, Box } from "@mui/material"

import GradientButton from "Components/Common/GradientButton"
import AvatarImage from "Assets/Images/avatar_test.png"
import RefreshIcon from "Assets/Images/Icon/refresh.png"
import { getAllMyNfts, handleError, updateCapability } from "Api/Endpoints"
import { web3Utils } from "Common/web3utils"
import Center from "Components/Layout/Center"
import Pagination from "Components/Common/Pagination"
import {NFTCore, NFTManager} from "Common/Contract/Contract"
import { GetMyOwnNftsResp, MyOwnNFT, UpdateCapabilityResp } from "Capabilities/Capabilities"
import BaseComponent from "Components/Common/BaseComponent"
import { handleCallResp } from "Common/utils"
import { splitEvery } from "ramda"

const styles: Styles = {
  dragon: {
    width: "46px",
    height: "46px",
    border: "1px solid #F7B031",
    borderRadius: "3px"
  },

  stakedHeros: {
    width: "303px",
    height: "239px",
    borderRadius: "4px",
    background: "#31413C",
    padding: "24px 10px 20px 24px",
  },
  refresh: {
    width: "25px",
    height: "25px",
    background: "#3E8959",
    borderRadius: "3px",
    border: "none",
    padding: "0",
    marginRight: "10px",
    marginTop: "20px",
  },
}

export default class MyStaking extends BaseComponent<any> {
  pageSize = 10000
  state = {
    stakingNfts: [] as MyOwnNFT[],
    nftCapabilities: [] as any[],
    page: 1,
    total: 0,
  }

  componentDidMount () {
    super.componentDidMount()
    this.init()
  }


  async init () {
    this.fetch(1)
  }

  async fetch(page: number) {
    const [status, allNfts] = await getAllMyNfts<GetMyOwnNftsResp>(web3Utils.MY_ADDRESS, page, 2, this.pageSize)
    if (status === 200 && this._isMounted) {
      const stakingNfts = allNfts?.data?.shelvesdata ?? []
      this.setState({
        stakingNfts,
        page
      });
      this.updateCapabilities(stakingNfts)
    }
  }

  async updateCapabilities(stakingNfts: MyOwnNFT[]) {
    await web3Utils.init()
    const data = await Promise.all(stakingNfts.map(x => x.tokenid).map(async id => (await web3Utils.getContract("nftContract")).capabilityOf(id)))
    this.setState({
      nftCapabilities: stakingNfts.map((x, i) => ({tokenid: x.tokenid, capability: data[i][0] === "Ok" ? parseInt(data[i][1]) : 0
      }))
    })
    
  }

  onPrev() {
    if (this.state.page > 1) {
      this.fetch(this.state.page - 1)
    }
  }

  onNext() {
    if (this.state.page < this.getTotalPage()) {
      this.fetch(this.state.page + 1)
    }
  }

  gotoPage(page: number) {
    if (page !== this.state.page && page >= 1 && page <= this.getTotalPage()) {
      this.fetch(page)
    }
  }

  getTotalPage() {
    return Math.ceil(this.state.total / this.pageSize)
  }

  isLatestCapability(id: number) {
    const nft = this.state.stakingNfts.find(x => x.tokenid === id)
    const capOnChain = this.state.nftCapabilities.find(x => x.tokenid === id)
    if (nft && Boolean(capOnChain)) {
      return Math.pow(2, nft.star_level - 3) === parseInt(String(capOnChain.capability))
    }
    return true
  }

  async updateNftCapability(tokenId: number | string) {
    try {
      await web3Utils.init()
      const data = await handleError(updateCapability<UpdateCapabilityResp>(tokenId))
      const { r, v, s, calldata, orderid } = data[0].data
      const resp = await (await web3Utils.getContract("contractCaller")).callBySig(NFTManager.address, calldata, orderid, {v, r, s})
      handleCallResp(resp)
      window.message.success("Update nft's capability successfully!");
    } catch (e: any) {
      window.message.error(`Error: ${e?.message ?? "Unkown Error"}`);
    }
  }

  async updateAllNftsCapability() {
    const needUpdateNfts = this.state.stakingNfts.filter(x => !this.isLatestCapability(x.tokenid))
    console.log(needUpdateNfts.length)
    for (const nft of needUpdateNfts) {
      await this.updateNftCapability(nft.tokenid)
    }
  }

  render () {
    const arr = this.state.stakingNfts.map(x => ({id: x['tokenid'], avatarUrl: x['avatarUrl']}))
    const splited = splitEvery(4, arr)

    return (
      <Stack spacing="25px">
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>My Staking</div>
        <Box style={styles.stakedHeros}>
          <Stack>
            <div style={{ height: "150px" }} className="scrollbar">
              <Stack spacing="15px" style={{paddingTop: "5px"}}>
                {
                  splited.map((arr, index) => (
                    <Stack key={index} direction="row" spacing="15px">
                      {arr.map(elm => (
                        <Badge color="error" variant="dot" invisible={this.isLatestCapability(elm.id)} key={elm.id}>
                          <img
                            key={elm.id}
                            src={process.env.PUBLIC_URL + `/dragons/${elm.avatarUrl}`}
                            style={styles.dragon}
                            alt="hero icon"
                          />
                        </Badge>
                      ))}
                    </Stack>
                  ))
                }
              </Stack>
            </div>
            {/* 
            <Pagination 
              totalPage={this.getTotalPage()}
              page={this.state.page}
              onPrev={this.onPrev.bind(this)}
              onNext={this.onNext.bind(this)}
              onChange={this.gotoPage.bind(this)}
            />*/}
            <Stack direction="row" justifyContent="end">
              <button style={styles.refresh} onClick={this.updateAllNftsCapability.bind(this)}>
                <Center>
                  <img src={RefreshIcon} alt="refresh" style={{ width: "13px", height: "17px" }} />
                </Center>
              </button>
            </Stack>
            {/* <Stack style={{ paddingRight: "14px", marginTop: "18px" }} justifyContent="center" direction="row">
              <GradientButton
                startColor="#E2A532"
                endColor="#D88B27"
                width="145px"
                height="32px"
                style={{ fontSize: "18px" }}
              >
                Select More
              </GradientButton>
            </Stack> */}
          </Stack>
        </Box>
      </Stack>
    )
  }
}
