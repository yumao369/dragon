import React from "react"

import { Box, Stack } from "@mui/material"
import { formatNumber, upperFirst } from "Common/functions"
import DesIcon from "Assets/Images/Icon/des_big.png"
import DearIcon from "Assets/Images/Icon/dear_big.png"
import GradientButton from "Components/Common/GradientButton"
import AppModal from "Components/Common/AppModal"
import { useInput, useModal, useTokenAmountInput } from "Common/Hooks"

import ArrowRight from "Assets/Images/Icon/arrowRight.png"
import { extractToken, handleError } from "Api/Endpoints"
import { web3Utils } from "Common/web3utils"
import { DesExchangeAgent, ExchangeAgent } from "Common/Contract/Contract"
import Web3 from "web3"
import { ExtractResp } from "Capabilities/Capabilities"
import { handleCallResp, loading } from "Common/utils"
import BigNumber from 'bignumber.js'

const styles: Styles = {
  root: {
    background: "#303C39",
    borderRadius: "3px",
    padding: "22px 29px 26px 29px",
    width: "255px",
    height: "200px",
    lineHeight: 1.5,
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
    marginBottom: "30px",
    marginTop: "10px",
  },
  input: {
    background: "#111B18",
    border: "none",
    width: "160px",
    color: "white",
    textAlign: "left",
    fontWeight: "bold"
  },
}

function Token(props: {
  amount: number;
  token: string;
  icon: string;
}) {
  const { amount, token } = props
  return (
    <Stack spacing="2px" alignItems="center">
      <img src={props.icon} alt="token icon" style={{ width: "53px", height: "53px" }} />
      <div style={{ color: "#aaaaaa", fontSize: "11px" }}>${token}</div>
      <div style={{ fontSize: "13px", fontWeight: "bold" }}>{amount !== undefined ? formatNumber(amount) : ""}</div>
    </Stack>
  )
}

export default function ClaimTokenItem(props: {
  token: "DES" | "DEAR";
  ownAmount: number;
  poolAmount: number;
}) {
  const {
    token,
    ownAmount,
    poolAmount,
  } = props
  const isDes = token === "DES"
  const icon = isDes ? DesIcon : DearIcon
  const modalProps = useModal(false)

  const realOwnAmount = token === "DES" ? ownAmount : (ownAmount / 1e8)

  const inputProps = useTokenAmountInput('0', 
    token === "DES" ? realOwnAmount: Math.min(realOwnAmount, poolAmount)
  )


  const claim = async () => {
    const moneyType = "m" + upperFirst(token.toLowerCase())
    try {
      const amount = parseFloat(inputProps.value)
      const data = await handleError(extractToken<ExtractResp>(amount, moneyType))
      modalProps.onClose()
      await loading("Creating exchange order...", async () => {
        const { v, r, s, orderid, calldata } = data
        const resp = await (await web3Utils.getContract("contractCaller")).callBySig(
          isDes ? DesExchangeAgent.address : ExchangeAgent.address,
          calldata, orderid,
          { v, r, s }
        )
        handleCallResp(resp)
        window.message.success("Successfully created exchange order")
      })
    } catch (e: any) {
      window.message.error(`Error: ${e?.message ?? "unknown"}`)
    }
  }

  return (
    <Box style={styles.root}>
      <Stack spacing="22px" alignItems="center">
        <Stack direction="row" spacing="23px">
          <Token icon={icon} amount={realOwnAmount} token={`m${token}`} />
          <img src={ArrowRight} alt="arror right" style={{ width: "26px", height: "14px", marginTop: "22px" }} />
          <Token icon={icon} amount={poolAmount} token={token} />
        </Stack>

        <GradientButton
          startColor="#FFB631"
          endColor="#C18029"
          width="145px"
          height="32px"
          onClick={modalProps.show}
        >Claim</GradientButton>
      </Stack>

      <AppModal {...modalProps} width="300px" height="200px">
        <Stack alignItems="center" justifyContent="start" style={{ height: "100%" }}>
          <div style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "white",
            height: "50px",
            lineHeight: "50px",
          }}>
            Claim Token
          </div>
          <Box style={styles.inputBox}>
            <Stack direction="row" alignItems="center" style={{ height: "100%" }}>
              <img src={icon} alt="bnb" style={{ margin: "0 18px", width: "24px", height: "24px" }} />
              <input style={styles.input} type="number" {...inputProps} />
            </Stack>
          </Box>
          <GradientButton
            startColor="#D78C27"
            endColor="#D68B27"
            width="145px"
            height="40px"
            onClick={claim}
          >Sure</GradientButton>
        </Stack>
      </AppModal>
    </Box>
  )
}
