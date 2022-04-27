import React from "react"

import { Box, Stack } from "@mui/material"
import { Remove, Add } from "@mui/icons-material"

import GradientButton from "Components/Common/GradientButton"
import Center from "Components/Layout/Center"

import { formatNumber } from "Common/functions"
import { useCounter } from "Common/Hooks"
import { web3Utils } from "Common/web3utils"
import { store } from "Redux/Store"

import BoxImg from "Assets/Images/MysteryBox/box.png"
import DearIcon from "Assets/Images/Icon/dear.png"
import BnbIcon from "Assets/Images/Icon/bnb.svg"
import BoxBg from "Assets/Images/MysteryBox/boxBg.png"
import { Marketplace, MysteryBoxIssuer } from "Common/Contract/Contract"
import { getOfficialMysteryBoxes } from "Api/Endpoints"
import Web3 from "web3"
import { handleCallResp, loading } from "Common/utils"
import BigNumber from "bignumber.js"


const styles: Styles = {
  root: {
    position: "relative",
    width: "539px",
    lineHeight: 1,
  },
  bg: {
    position: "absolute",
    width: "529px",
    height: "634px",
    top: "-110px",
    left: "0",
    zIndex: 1,
  },
  boxStack: {
    position: "absolute",
    zIndex: 2,
    left: "104px",
    top: "50px",
  },
  amountInput: {
    width: "257px",
    height: "51px",
    background: "#111B18",
    borderRadius: "3px",
    marginTop: "20px",
  },
  button: {
    border: "none",
    background: "#3E8959",
    color: "white",
    fontWeight: "bold",
    width: "34px",
    height: "28px",
  },
  input: {
    background: "#111B18",
    border: "none",
    width: "100px",
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  },
  icon: {
    width: "48px",
    height: "48px"
  },
  price: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "white",
  },
  priceUSD: {
    fontSize: "13px",
    color: "#eeeeee",
  },
}

function MysteryBox(props: {
  price: number,
  priceUSD?: number;
  issuerId: number;
  count: number;
}) {
  const {
    price = 1000,
    priceUSD = 72.76,
    issuerId = 1,
    count = 1,
  } = props
  //const tokenIcon = issuerId === 1 ? DearIcon : BnbIcon
  //const tokenName = issuerId === 1 ? "DEAR" : "BNB"
  const tokenIcon = DearIcon
  const tokenName = "DEAR"

  return (
    <Stack alignItems="center" spacing="24px">
      <img src={BoxImg} alt="box" style={{ width: "330px", height: "284px" }} />
      <Stack direction="row" spacing="14px" sx={{ height: "100%", width: "100%" }} justifyContent="center" alignItems="center">
        <img src={tokenIcon} alt="icon" style={styles.icon}></img>
        <Stack alignItems="start" spacing="7px">
          <span style={styles.price}>{formatNumber(price * count / 1e18)} {tokenName}</span>
          <span style={styles.priceUSD}>(≈${priceUSD} USD)</span>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default function MysteryBoxItem(props: {
  avaiable: number;
  showLogin: () => void;
  token: string;
  price: number;
  issuerId: number;
}) {
  const {
    count, inc, dec, onChange
  } = useCounter(1, 1, props.avaiable)

  const buy = async () => {
    const isLogin = Boolean(store.getState().Authentication.token)
    if (!isLogin) {
      props.showLogin()
      return
    }
    try {
      if (props.avaiable <= 0) {
        window.message.error("Mystery boxes have been sold out!")
        return
      }

      const amount = count
      const price = props.price * amount
      let value = price

      await web3Utils.init()

      if (parseInt(props.token) !== 0) {
        // 特定的ERC20货币
        await loading("Wait for approval...", async () => {
          console.log('MysteryBoxIssuer.address', MysteryBoxIssuer.address)
          console.log(price)
          const data = await (await web3Utils.getContract("dearContract")).approve(MysteryBoxIssuer.address, price)
          console.log("?")
        })
        value = 0
      } else {
        // 网络基础货币
        const baseToken = await web3Utils.getBlance()

        if ((new BigNumber(baseToken)).lt(new BigNumber(value))) {
          throw new Error("The price exceeds your balance")
        }
      }
      await loading(`minting ${count} nft${count > 1 ? 's' : ''}...`, async () => {
        console.log("hello world")
        console.log(props.issuerId)
        console.log(amount)
        console.log(props.price)
        console.log(value)
        console.log("hello world")
        const resp = await (await web3Utils.getContract("mysteryBoxIssuer")).purchase(props.issuerId, amount, String(props.price), String(value))
        handleCallResp(resp)
        window.message.success("Cons! Mint nfts successfully!")
      })
    } catch (e: any) {
      window.message.error(`Error: ${e?.message ?? "unknown"}`)
    }
  }

  return (
    <Box sx={styles.root}>
      <img src={BoxBg} alt="bg" style={styles.bg} />
      <Stack alignItems="center" style={styles.boxStack}>
        <MysteryBox {...props} count={count} />
        <Box sx={styles.amountInput}>
          <Stack direction="row" alignItems="center" justifyContent="space-around" sx={{ height: "100%" }}>
            <button style={styles.button} onClick={dec}>
              <Center><Remove /></Center>
            </button>
            <input style={styles.input} type="number" value={count} onChange={onChange} />
            <button style={styles.button} onClick={inc}>
              <Center><Add /></Center>
            </button>
          </Stack>
        </Box>
        <GradientButton
          startColor="#FFB731"
          endColor="#D78C27"
          width="257px"
          height="40px"
          onClick={buy}
          style={{ fontSize: "18px", marginTop: "16px" }}
        >BUY NOW</GradientButton>
      </Stack>
    </Box>
  )
}
