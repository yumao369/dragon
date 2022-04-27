import React from "react"

import { formatNumber } from "Common/functions"

import { Stack, Box } from "@mui/material"
import AppModal from "Components/Common/AppModal"
import GradientButton from "Components/Common/GradientButton"

import BnbIcon from "Assets/Images/Icon/bnb.svg"
import DEARIcon from "Assets/Images/Icon/dear.png"
import { useInput } from "Common/Hooks"

const styles: Styles = {
  root: {
    margin: "50px 0 0 70px",
  },
  text: {
    fontSize: "14px",
    color: "#bbbbbb",
    marginBottom: "5px",
  },
  inputBox: {
    background: "#111B18",
    border: "1px solid #404D4A",
    borderRadius: "3px",
    width: "249px",
    height: "44px",
  },
  input: {
    background: "#111B18",
    border: "none",
    width: "100px",
    color: "white",
    textAlign: "left",
    fontWeight: "bold"
  },
}

export function SellModal (props: {
  priceUSD?: number;
  onOk: Fn<string, any>;
  visible: boolean;
  onClose: () => void;
}) {
  const {
    priceUSD = 9999999999,
    onOk = (_: any) => {}
  } = props

  const inputProps = useInput('1')
  return (
    <AppModal {...props} width="527px" height="224px">
      <Stack style={styles.root}>
        <div style={styles.text}>Price Range 0 ~ 999999 DEAR</div>
        <Stack direction="row" alignItems="center" spacing="10px">
          <Box style={styles.inputBox}>
            <Stack direction="row" alignItems="center" style={{ height: "100%" }}>
              <img src={DEARIcon} alt="dear" style={{ margin: "0 22px", width: "16px", height: "16px" }} />
              <input style={styles.input} {...inputProps} type="number" />
            </Stack>
          </Box>
          <span style={styles.text}>≈{formatNumber(priceUSD)} USD</span>
        </Stack>
        <Stack style={{ width: "100%", marginTop: "33px", paddingRight: "50px" }} direction="row" justifyContent="center">
          <GradientButton
            startColor="#D78C27"
            endColor="#D68B27"
            width="145px"
            height="40px"
            onClick={() => onOk(inputProps.value)}
          >Sure</GradientButton>
        </Stack>
      </Stack>
    </AppModal>
  )
}