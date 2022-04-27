import React from "react"

import { Box, Stack, Tooltip } from "@mui/material"
import { ErrorOutline } from "@mui/icons-material"

import { formatNumber, switchExpr, upperFirst } from "Common/functions"

import DearIcon from "Assets/Images/Icon/dear_big.png"
import DesIcon from "Assets/Images/Icon/des_big.png"
import GradientButton from "Components/Common/GradientButton"
import AppModal from "Components/Common/AppModal"
import { useInput, useModal, useTokenAmountInput } from "Common/Hooks"
import { web3Utils } from "Common/web3utils"
import { ExchangeAgent } from "Common/Contract/Contract"
import { claimToken, handleError } from "Api/Endpoints"
import Web3 from "web3"
import { handleCallResp, loading } from "Common/utils"

const styles: Styles = {
  root: {
    background: "#303C39",
    borderRadius: "3px",
    padding: "27px 18px 27px 27px",
    minWidth: "255px",
    height: "151px",
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

export default function CurrencyItem(props: {
  amount: number;
  usd: number;
  token: "DES" | "DEAR";
  inGame: boolean;
  onClick?: () => void;
  dearPool?: number;
}) {
  const modalProps = useModal(false)
  const {
    amount = 999999,
    usd = 999999,
    token = "DES",
    inGame = false,
    onClick = modalProps.show,
    dearPool = -1,
  } = props

  const icon = token === "DES" ? DesIcon : DearIcon
  const name = `$${inGame ? "m" : ""}${token}`
  const action = inGame ? "Claim" : "Extract"
  const realAmount = inGame ? (token === "DES" ? amount : (amount / 1e8)) : amount
  const inputProps = useTokenAmountInput('0', realAmount)

  const extract = async () => {
    try {
      const amount = Web3.utils.toWei(String(inputProps.value), "ether")
      const contract = switchExpr(token)
        .caseIs("DES", (await web3Utils.getContract("desContract")))
        .caseIs("DEAR", (await web3Utils.getContract("dearContract")))
        .defaultAs(null)
      const exchangeAgentContract = switchExpr(token)
        .caseIs("DES", (await web3Utils.getContract("desExchangeAgentContract")))
        .caseIs("DEAR", (await web3Utils.getContract("exchangeAgentContract")))
        .defaultAs(null)
      if (contract && exchangeAgentContract) {
        modalProps.onClose()
        const txHash = await loading("transfering...", async () => {
          await contract.approve(ExchangeAgent.address, amount)
          const resp = await exchangeAgentContract.deposit(amount)
          handleCallResp(resp)
          return resp[1].transactionHash
        })
        await loading("Sending message to server...", async () => {
          await handleError(claimToken<any>(txHash, amount, "m" + upperFirst(token.toLowerCase())))
          window.message.success("Extract Successfully!")
        })
      } else {
        throw new Error(`Unkown token: ${token}`)
      }
    } catch (e: any) {
      window.message.error(`Error: ${e?.message ?? "unknown"}`)
    }
  }

  const stack = () => (
    <Stack direction="row" alignItems="center">
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>{formatNumber(realAmount)} {name}</div>
      {inGame ? <></> : (<ErrorOutline style={{ color: "white", marginLeft: "5px" }} />)}
    </Stack>
  )
  return (
    <Box style={styles.root}>
      <Stack spacing="16px">
        <Stack direction="row" alignItems="end" justifyContent="space-between">
          <Stack style={{ height: "63px" }} justifyContent="start">
            {inGame ? stack()
              : (
                <Tooltip title="Dragon Evolution Augmented Reality" placement="top" arrow>
                  {stack()}
                </Tooltip>
              )
            }
            <div style={{ fontSize: "11px", color: "#aaaaaa" }}>≈{formatNumber(usd)} USD</div>
            {dearPool >= 0
              ? (
                <Tooltip title="pool of claim" placement="top" arrow>
                  <div style={{
                    fontSize: "13px",
                    // fontFamily: "Quadrat",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    color: "#1effaf",

                  }}>(^$DEAR: {formatNumber(dearPool)})</div>
                </Tooltip>)
              : (<></>)
            }
          </Stack>
          <img src={icon} alt="des icon" style={{ width: "53px", height: "53px" }} />
        </Stack>
        <Stack direction="row" justifyContent="center" style={{ marginRight: "28px", width: "100%" }}>
          <GradientButton
            width="145px"
            height="32px"
            startColor="#FFB631"
            endColor="#D88B27"
            style={{ fontSize: "18px" }}
            onClick={onClick}
          >{action}</GradientButton>
        </Stack>
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
            Extract Token
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
            onClick={extract}
          >Sure</GradientButton>
        </Stack>
      </AppModal>
    </Box>
  )
}
