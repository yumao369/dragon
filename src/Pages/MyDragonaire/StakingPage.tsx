import React from "react"

import { Stack } from "@mui/material"
import Template from "Components/MyDragonaire/Template"
import Switcher from "Components/MyDragonaire/items/Swither"
import { useSelectable } from "Common/Hooks"
import CurrencyStats from "Components/MyDragonaire/items/CurrencyStats"
import MyStaking from "Components/MyDragonaire/staking/MyStaking"
import ProfitAssessment from "Components/MyDragonaire/staking/ProfitAssessment"
import TotalStaking from "Components/MyDragonaire/staking/TotalStaking"
import TotalValue from "Components/MyDragonaire/staking/TotalValue"

import DesIcon from "Assets/Images/Icon/des_big.png"
import DearIcon from "Assets/Images/Icon/dear_big.png"
import RealTimePriceItem from "Components/MyDragonaire/staking/RealTimePriceItem"

function StakingPage (props: {}) {
  const switcherProps = useSelectable(0)

  return (
    <Stack spacing="25px">
      <CurrencyStats />
      <Switcher options={["Staking"]} {...switcherProps} />
      <Stack style={{ paddingLeft: "37px", marginTop: "50px" }}>
        <Stack spacing="24px">
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>Real Time Price</div>
          <RealTimePriceItem icon={DesIcon} name="DES" price={188468} />
          <RealTimePriceItem icon={DearIcon} name="DEAR" price={188468} />
        </Stack>
        {/* <RealTimePriceDear/> */}

        <Stack direction="row" spacing="32px" style={{marginTop: "49px"}}>
          <MyStaking/>
          <ProfitAssessment />
        </Stack>

        <Stack direction="row" style={{marginTop: "49px"}} spacing="32px">
          <TotalValue />
          <TotalStaking/>
        </Stack>
      </Stack>
      <div style={{minHeight: "144px"}}/>
    </Stack>
  )
}

export default Template(StakingPage)
