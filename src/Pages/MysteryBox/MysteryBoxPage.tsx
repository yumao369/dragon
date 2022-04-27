import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { WithInitTemp } from "Containers"

import { Box, Stack } from "@mui/material"

import GradientButton from "Components/Common/GradientButton"

import CommonBg from "Assets/Images/MysteryBox/commonBg.png"
import EpicBg from "Assets/Images/MysteryBox/epicBg.png"
import LegendaryBg from "Assets/Images/MysteryBox/legendaryBg.png"
import BoxImg from "Assets/Images/MysteryBox/box.png"
import DearIcon from "Assets/Images/Icon/dear.png"
import BnbIcon from "Assets/Images/Icon/bnb.png"
import { web3Utils } from "Common/web3utils"
import { Marketplace } from "Common/Contract/Contract"
import { BNBAddress, getTokenPrice } from "Api/Endpoints"
import { range } from "ramda"
import BaseComponent from "Components/Common/BaseComponent"

function absolutePos(left: number, top: number): React.CSSProperties {
  return {
    position: "absolute",
    left: `${left}px`,
    top: `${top}px`,
  }
}

function withBg(bg: string): React.CSSProperties {
  return {
    width: "310px",
    height: "514px",
    background: `url(${bg})`,
    backgroundSize: "cover",
    position: "relative",
    cursor: "pointer",
  }
}

const styles: Styles = {
  root: {
    width: "1200px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "29px",
  },
  title: {
    fontFamily: "Quadrat",
    fontSize: "61px",
    lineHeight: 1.5,
  },
  info: {
    ...absolutePos(59, 359),
  },
  box: {
    ...absolutePos(37, 96),
    width: "240px",
    height: "224px",

  },
  icon: {
    width: "34px",
    height: "33px",
  },
  name: {
    fontSize: "19px",
    fontWeight: "bold",
  },
  description: {
    width: "772px",
    letterSpacing: "0.2px",
    lineHeight: "1.5",
    fontSize: "18px",
    marginBottom: "20px",
  }
}

function Common(props: {
  name: string;
  price: string;
  priceUSD: string;
  icon: string;
  bg: string;
  goto: () => void;
  style?: React.CSSProperties;
}) {
  const {
    style = {},
    name,
    price,
    priceUSD,
    icon,
    bg,
    goto
  } = props
  return (
    <div style={{ ...style, ...withBg(bg) }} onClick={goto}>
      <img src={BoxImg} alt="box" style={styles.box} />
      <Stack style={styles.info} alignItems="center" spacing="21px">
        <span style={styles.name}>{name}</span>
        <GradientButton
          startColor="#FFB731"
          endColor="#D78C27"
          width="203px"
          height="53px"
        >
          <Stack direction="row" spacing="4px" sx={{ height: "100%", width: "100%" }} justifyContent="center" alignItems="center">
            <img src={icon} alt="icon" style={styles.icon}></img>
            <Stack alignItems="start">
              <span style={styles.price}>{price}</span>
              <span style={styles.priceUSD}>(≈${priceUSD} USD)</span>
            </Stack>
          </Stack>
        </GradientButton>
      </Stack>
    </div>
  )
}

type BoxInfo = {
  boxType: 1 | 2 | 3;
  cap: number;
  issuedCount: number;
  price: number;
  tokenContract: string;
}

type State = {
  bnbUSDPrice: number;
  commonBox: BoxInfo;
  epicBox: BoxInfo;
  legendaryBox: BoxInfo;
}

class MysteryBoxPage extends BaseComponent<any, State> {
  state: State = {
    bnbUSDPrice: 1,
    commonBox: { boxType: 1, cap: 0, issuedCount: 0, price: 2e18, tokenContract: '0xb28FcDC893B8BD6d363a8877276123D726F09404' },
    epicBox: { boxType: 2, cap: 0, issuedCount: 0, price: 1e17, tokenContract: '0x0', },
    legendaryBox: { boxType: 3, cap: 0, issuedCount: 0, price: 1e17, tokenContract: '0x0', },
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    await web3Utils.init()
    const [
      c, e, l
    ] = await Promise.all(range(1, 4).map(async id => (await web3Utils.getContract("mysteryBoxIssuer")).issuances(id)))
    const updater = {}
    if (c[0] === "Ok") {
      updater['commonBox'] = c[1]
    }
    if (e[0] === "Ok") {
      updater['epicBox'] = e[1]
    }
    if (l[0] === "Ok") {
      updater['legendaryBox'] = l[1]
    }

    // const [status, priceInfo] = await getTokenPrice(BNBAddress)
    // if (status === 200) {
    //   const price = parseFloat(priceInfo?.data?.price ?? "1")
    //   updater['bnbUSDPrice'] = price
    // }
    this.setState(updater)
  }


  render() {
    return (
      <div style={styles.root}>
        <div style={styles.title}>
          MYSTERY BOX
        </div>
        <div style={styles.description}>
          Need surprise? Buying a mystery box! You will get one of our <span style={{ color: "#189BDF", fontWeight: "bold" }}>Common</span>,
          <span style={{ color: "#E54DEE", fontWeight: "bold" }}> Epic</span> or <span style={{ color: "#EB9840", fontWeight: "bold" }}>Legendary </span>
          Dragon from it. The higher quality of the box is, the higher drop rate for the high-quality dragon is. TRY YOUR LUCK!
        </div>

        <Stack direction="row" spacing="84px">
          <Common
            name="COMMON BOX"
            bg={CommonBg}
            icon={DearIcon}
            goto={() => this.props.history.push("/mysterybox/1")}
            price={`${this.state.commonBox.price / 1e18} $DEAR`}

            priceUSD="30.0"
          />
          <Common
            style={{ transform: "scale(1.345)" }}
            name="LEGENDARY BOX"
            bg={LegendaryBg}
            //icon={BnbIcon}
            icon={DearIcon}
            goto={() => this.props.history.push("/mysterybox/3")}
            price={`${this.state.legendaryBox.price / 1e18} $DEAR`}
            priceUSD="100.0"
          />
          <Common
            name="EPIC BOX"
            bg={EpicBg}
            //icon={BnbIcon}
            icon={DearIcon}
            goto={() => this.props.history.push(`/mysterybox/2`)}
            price={`${this.state.epicBox.price / 1e18} $DEAR`}
            priceUSD="80.0"
          />
        </Stack>
      </div>
    )
  }
}

export default connect(
  store => ({}), {}
)(withRouter(WithInitTemp(MysteryBoxPage) as any))