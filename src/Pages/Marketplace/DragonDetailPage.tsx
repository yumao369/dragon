import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { WithInitTemp } from "Containers"

import { Stack, Box } from "@mui/material"

import BackArrow from "Components/Common/BackArrow"
import DragonDetail from "Components/Common/DragonDetail"
import Navigtion from "Components/Marketplace/Navigation"
import { MarketNFT } from "Capabilities/Capabilities"

const mapStateToProps = (store: any) => ({
  marketplace: store.Marketplace
})

const styles = {
  root: {
    color: "white",
    width: "1200px",
    marginTop: "29px",
  },
  back: {
    fontSize: "18px",
  }
}

// function 
function DragonDetailPage(props: {
  match: { params: any },
  marketplace: {nfts: MarketNFT[]},
  showLogin: () => void
}) {
  const orderid = props.match.params.id
  const nft = props.marketplace.nfts.find(x => x.orderid.toString() === orderid.toString())

  return (
    <Box sx={styles.root}>
      <Stack>
        <Navigtion/>
        <BackArrow/>
        { nft === undefined
          ? <></>
          : <DragonDetail isMine={false} nft={nft} showLogin={props.showLogin}/>
        }
      </Stack>
    </Box>
  )



}

export default connect(mapStateToProps, {})(withRouter(WithInitTemp(DragonDetailPage) as any))
