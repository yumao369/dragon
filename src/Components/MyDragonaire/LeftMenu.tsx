import React from "react"
import { withRouter, Link } from "react-router-dom"

import { Stack } from "@mui/material"

const styles = {
  menuItem(selected: boolean): React.CSSProperties {
    return {
      width: "255px",
      height: "48px",
      background: selected ? "#1F392B" : "",
      color: selected ? "white" : "#bbbbbb",
      fontSize: "16px",
      fontWeight: "bold",
      lineHeight: "48px",
      textAlign: "left",
      paddingLeft: "55px",
      cursor: "pointer",
      borderRadius: "3px",
    }
  }
}

function MenuItem(props: {
  selected: boolean;
  to: string;
  name: string;
}) {
  return (
    <Link style={styles.menuItem(props.selected)} to={props.to}>
      {props.name}
    </Link>
  )
}

function LeftMenu(props: any) {
  const menuConfig = [
    { name: "Staking", link: "/my/staking", pathStart: "/my/staking" },
    { name: "Items", link: "/my/items", pathStart: "/my/item" },
    { name: "My Wallet", link: "/my/wallet", pathStart: "/my/wallet" },
    { name: "DAO Treasury", link: "/my/treasury", pathStart: "/my/treasury" },
    //{ name: "Claim Tokens", link: "/my/claim", pathStart: "/my/claim" },
    { name: "DAO", link: "/my/dao", pathStart: "/my/dao" },
    { name: "Staking", link: "/my/staking", pathStart: "/my/staking" },
    { name: "Feedback", link: "/my/feedback", pathStart: "/my/feedback" },
    { name: "Account Setting", link: "/my/setting", pathStart: "/my/setting" },
  ]

  const current = props.history?.location?.pathname ?? ""

  return (
    <Stack style={{ marginRight: "10px" }}>
      {menuConfig.map((config, index) => (
        <MenuItem key={config.name} name={config.name} selected={current.startsWith(config.pathStart)} to={config.link} />
      ))
      }
    </Stack>
  )
}

export default withRouter(LeftMenu)