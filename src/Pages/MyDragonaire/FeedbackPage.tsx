import React from "react"
import { withRouter } from "react-router-dom"
import { Stack } from "@mui/material"
import Template from "Components/MyDragonaire/Template"
import { useSelectable } from "Common/Hooks"
import CurrencyStats from "Components/MyDragonaire/items/CurrencyStats"
import Switcher from "Components/MyDragonaire/items/Swither"
import Feedback from "Components/MyDragonaire/feedback/Feedback"

function FeedbackPage (props: {}) {
  const switcherProps = useSelectable(0)
  return (
    <Stack spacing="25px">
      <CurrencyStats />
      <Switcher options={["Feedback"]} {...switcherProps} />

      <Stack style={{paddingLeft: "37px", marginTop: "40px"}}>
        <Feedback/>
      </Stack>

    </Stack>
  )
}

export default withRouter(Template(FeedbackPage) as any)