import React from "react"
import { withRouter } from "react-router-dom"
import { Stack } from "@mui/material"

import Template from "Components/MyDragonaire/Template"
import BackArrow from "Components/Common/BackArrow"
import CurrencyStats from "Components/MyDragonaire/items/CurrencyStats"
import DragonDetail from "Components/Common/DragonDetail"
import { connect } from "react-redux"

// @ts-ignore
const mapStateToProps = store => ({
  myNfts: store.MyNfts
})

function ItemDetailPage(props: any) {
  const tokenid = props.match.params.id
  const nft = props.myNfts.nfts.find((x: any) => x.tokenid.toString() === tokenid.toString())

  return (
    <Stack>
      <CurrencyStats/>
      <Stack style={{paddingLeft: "36px"}}>
        <BackArrow/>
        {
          nft === undefined
          ? <></>
          : <DragonDetail isMine={true} nft={nft} showLogin={props.showLogin}/>
        }
      </Stack>
    </Stack>
  )
}

export default connect(mapStateToProps, {})(withRouter(Template(ItemDetailPage) as any))