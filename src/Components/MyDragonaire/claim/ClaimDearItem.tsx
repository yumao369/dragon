import React from "react"

import { Box, Stack } from "@mui/material"
import { formatNumber } from "Common/functions"
import DesIcon from "Assets/Images/Icon/des_big.png"
import DearIcon from "Assets/Images/Icon/dear_big.png"
import GradientButton from "Components/Common/GradientButton"
import AppModal from "Components/Common/AppModal"
import { useInput, useModal, useTokenAmountInput } from "Common/Hooks"

import ArrowRight from "Assets/Images/Icon/arrowRight.png"
import { extractRewards, handleError } from "Api/Endpoints"
import { web3Utils } from "Common/web3utils"
import { RewardsController } from "Common/Contract/Contract"
import Web3 from "web3"
import { ExtractRewardsResp } from "Capabilities/Capabilities"
import { handleCallResp, loading } from "Common/utils"
import BigNumber from 'bignumber.js';

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

export default function ClaimDearItem(props: {
  token: string;
  ownAmount: number;
  poolAmount: number;
  rate: number;
  onSuccess?: () => {}
}) {
  const {
    token,
    ownAmount,
    poolAmount,
    rate
  } = props
  const isDes = token === "DES"
  const icon = isDes ? DesIcon : DearIcon
  const modalProps = useModal(false)

  const realOwnAmount = token === "DES" ? ownAmount : (ownAmount / 1e8)

  const inputProps = useTokenAmountInput('0', 
    token === "DES" ? realOwnAmount: Math.min(realOwnAmount, poolAmount)
  )

  const claim = async () => {
    try {
      const [statusApplied, applied] = await (await web3Utils.getContract("rewardsController")).getApplied()
      if (statusApplied === "Ok" && parseInt(applied.amount) > 0 && applied.status === "1") {
        window.message.error("You have to cancel the old order!")
        return;
      }
      const amount = Web3.utils.toWei(inputProps.value)
      const data = await handleError(extractRewards<ExtractRewardsResp>(amount))
      modalProps.onClose()
      await loading("Creating claim order...", async () => {
        const { v, r, s, orderid, calldata } = data
        const resp = await (await web3Utils.getContract("contractCaller")).callBySig(RewardsController.address, calldata, orderid, {v, r, s})
        handleCallResp(resp)
        window.message.success("Successfully created claim order")
        props.onSuccess && props.onSuccess()
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
          <Stack alignItems="center">
            <img src={ArrowRight} alt="arror right" style={{ width: "26px", height: "14px", marginTop: "22px" }} />
            <div style={{ fontSize: "11px" }}>1:{rate.toFixed(2)}</div>
          </Stack>
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
