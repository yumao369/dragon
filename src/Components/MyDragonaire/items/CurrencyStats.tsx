import React from "react"

import { Box, Stack } from "@mui/material"

import { formatNumber } from "Common/functions"

import BnbIcon from "Assets/Images/Icon/bnb.svg"
import DearIcon from "Assets/Images/Icon/dear.png"
import DesIcon from "Assets/Images/Icon/des.png"
import { web3Utils } from "Common/web3utils"
import { SET_BNB, SET_DEAR, SET_DES } from "Constants/ActionTypes"
import { connect } from "react-redux"

const styles: Styles = {
  currencyItem: {
    border: "1px solid #2E6242",
    borderRadius: "3px",
    width: "231px",
    height: "48px",
    paddingLeft: "12px",
  },
  icon: {
    width: "22px",
    height: "22px",
  },
  amount: {
    color: "#bbbbbb",
    fontSize: "18px",
  },
  unit: {
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
  },

}

// @ts-ignore
const mapDispatchToProps = dispatch => ({
  onLoad: async () => {
    try {
      await web3Utils.init()
      const [desResult, dearResult] = await Promise.all([
        (await web3Utils.getContract("desContract")).balanceOf(),
        (await web3Utils.getContract("dearContract")).balanceOf(),
      ])
      if (desResult[0] === "Ok") {
        dispatch({ type: SET_DES, data: desResult[1] })
      }
      if (dearResult[0] === "Ok") {
        dispatch({ type: SET_DEAR, data: dearResult[1] })
      }
      const blance = await web3Utils.getBlance()
      dispatch({ type: SET_BNB, data: blance })
    } catch (e) {
      console.error(e)
    }
  },
})


// @ts-ignore
const mapStateToProps = store => ({
  tokens: store.Tokens
})

function CurrencyItem(props: {
  icon: string;
  amount: number;
  unit: string;
}) {
  const {
    icon,
    amount,
    unit,
  } = props
  return (
    <Box style={styles.currencyItem}>
      <Stack direction="row" style={{ height: "100%" }} alignItems="center" spacing="8px">
        <img src={icon} alt="icon" style={styles.icon} />
        <span style={styles.amount}>{formatNumber(amount)}</span>
        <span style={styles.unit}>{unit}</span>
      </Stack>
    </Box>
  )
}

class CurrencyStats extends React.Component<any> {
  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    return (
      <Stack direction="row" spacing="25px" sx={{ paddingLeft: "36px" }}>
        <CurrencyItem icon={BnbIcon} amount={this.props.tokens.bnb / 1e18} unit="BNB" />
        <CurrencyItem icon={DearIcon} amount={this.props.tokens.dear / 1e18} unit="$DEAR" />
        <CurrencyItem icon={DesIcon} amount={this.props.tokens.des / 1e18} unit="$DES" />
      </Stack>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyStats)
