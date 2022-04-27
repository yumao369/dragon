import React from "react"

import { Stack } from "@mui/material"

import { useInput, useSelectable } from "Common/Hooks"

import Template from "Components/MyDragonaire/Template"
import CurrencyStats from "Components/MyDragonaire/items/CurrencyStats"
import Switcher from "Components/MyDragonaire/items/Swither"
import GradientButton from "Components/Common/GradientButton"

const styles: Styles = {
  amountInput: {
    width: "257px",
    height: "40px",
    background: "#111B18",
    borderRadius: "3px",
    border: "none",
    color: "#aaaaaa",
    textAlign: "left",
    paddingLeft: "20px",
    fontWeight: "bold",
  },
}

function SettingInput(props: {
  title: string;
  buttonTitle: string;
  value: string;
  onChange: Fn<any, void>
}) {
  const {
    title = "Name",
    buttonTitle = "Change Name",
    value = "myaddress@gamil.com",
    onChange = () => { }
  } = props
  return (
    <Stack spacing="10px">
      <div style={{ fontSize: "16px", fontWeight: "bold" }}>{title}</div>
      <Stack direction="row" spacing="8px">
        <input style={styles.amountInput} value={value} onChange={onChange} />
        <GradientButton
          startColor="#3D885F"
          endColor="#226742"
          width="157px"
          height="40px"
          style={{ fontSize: "16px" }}
        >{buttonTitle}</GradientButton>
      </Stack>
    </Stack>
  )
}

function AccountSetting(props: {}) {
  const switcherProps = useSelectable(0)
  const nameInput = useInput("my name")
  const emailInput = useInput("my email")
  return (
    <Stack spacing="25px">
      <CurrencyStats />
      <Switcher options={["Account Setting"]} {...switcherProps} />
      <Stack spacing="25px" style={{ marginTop: "50px", paddingLeft: "37px" }}>
        <SettingInput title="Name" buttonTitle="Change Name" {...nameInput} />
        <SettingInput title="Email Address" buttonTitle="Verification" {...emailInput} />
      </Stack>
    </Stack>
  )
}

export default Template(AccountSetting)