import React, { useState, useRef } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import { Stack, Box, Avatar, Menu } from "@mui/material"
import QRCode from 'qrcode.react'
import { headerPathList } from "Constants/RouterConfig"
import { CLEAR_USERINFO } from "Constants/ActionTypes"
import { Login } from "Redux/Actions"
import { take, takeLast } from 'ramda'
import { deleteToken } from "Api/Endpoints"



import GradientButton from "Components/Common/GradientButton"

import { writeToClipboard } from 'Common/functions'
import { useHover } from "Common/Hooks"
import "./Header.scss"
import gameLogo from "Assets/Images/game_logo.png"
import CopyIcon from "Assets/Images/Icon/copy.png"
import { Dispatch } from 'redux'
import { QrTokenObj } from "Common/QrToken"

const styles: Styles = {
  root: {
    width: "100%",
    height: "64px",
    background: "black",
    // position: "fixed",
    zIndex: 199,
  },
  logoDiv: {
    flex: 1,
    paddingLeft: "30px",
  },
  logo: {
    height: "51px",
  },
  rightPart: {
    flex: 1,
    paddingRight: "15px"
  },
  profileBox: {
    border: "1px solid #202F2A",
    borderRadius: "3px",
    height: "35px",
    width: "143px",
    cursor: "pointer",
  },
  avatar: {
    width: "20px",
    height: "20px",
    margin: "0 11px",
    border: "1px solid white"
  },
  addr: {
    color: "#2FD1FF",
    fontSize: "11px",
  },
  arrow: {
    position: "absolute",
    top: "-3px",
    left: "10px",
    width: "5px",
    height: "5px",
    background: "white",
    transform: "rotate(-135deg)"
  },
  copyIcon: {
    width: "13px",
    height: "13px",
    cursor: "pointer"
  },
  menuItem: {
    borderBottom: "1px solid #BDBDBD",
    minHeight: "32px",
    lineHeight: "32px",
    width: "185px",
    marginLeft: "9px",
    marginRight: "9px",
    fontSize: "11px",
    color: "#555555"
  },
  qrDesc: {
    overflowWrap: "break-word",
    whiteSpace: "normal",
    lineHeight: 1.1,
  },
  logout: {
    width: "128px",
    height: "29px",
    background: "#3E8959",
    borderRadius: "3px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "white",
    padding: "0",
    border: "none",
    marginTop: "11px",
  },
  profileMenu: {
    width: "503px",
    marginTop: "20px",
    maxWidth: "500px",
  }
}

function qrcode(showQRCode: boolean): React.CSSProperties {
  return {
    width: "100%",
    padding: "12px 27px",
    filter: `blur(${showQRCode ? 0 : 5}px)`,
    cursor: "pointer",
  }
}

const menuItems = [
  { name: "MY DRAGONAIRE", path: "/my/" },
  { name: "MARKETPLACE", path: "/marketplace" },
  { name: "MYSTERY BOX", path: "/mysterybox" }
]

// @ts-ignore
const mapStateToProps = store => ({
  authentication: store.Authentication,
})


const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: Login(dispatch),
  logout: () => dispatch({ type: CLEAR_USERINFO })
})

function HeaderMenu(props: {
  address: string;
  logout: () => {};
  refresh: () => void;
  qrtoken: string;
}) {
  const hoverProps = useHover(500)

  const [anchorEl, setAnchorEl] = useState(null);
  const menuRoot = useRef(null)

  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }

  const {
    address = "ERROR"
  } = props
  const addressAbbr = `${take(6, address)}...${takeLast(3, address)}`
  const addressAbbr2 = `${take(8, address)}...${takeLast(8, address)}`
  const copy = async () => {
    window.message.success("Copied!", 2000)
    writeToClipboard(address, menuRoot?.current as any)
  }

  const deletetoken = async () => {
    const [status, resp] = await deleteToken<{}>()
    if (status === 201 && resp.code === 0 && resp.data === null) {
      window.message.success("successfully deleted!")
    }
  }

  return (
    <>
      <Box
        style={styles.profileBox}
        id="profile-avatar"
        aria-controls={open ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Stack
          direction="row"
          justifyContent="start"
          alignItems="center"
          style={{ height: "35px" }}
        >
          <Avatar style={styles.avatar} alt="avatar" src="" />
          <div style={styles.addr}>{addressAbbr}</div>
        </Stack>
      </Box>

      <Menu
        anchorEl={anchorEl}
        sx={styles.profileMenu}
        id="profile-menu"
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'profile-avatar',
        }}
      >
        <Box>
          <Box style={styles.menuItem} ref={menuRoot}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ height: "29px" }}
            >
              <span>{addressAbbr2}</span>
              <img src={CopyIcon} style={styles.copyIcon} alt="copy" onClick={copy} />
            </Stack>
          </Box>
        </Box>
        <Box>
          <Box style={styles.menuItem}>User Center</Box>
        </Box>
        <Box>
          <Box style={styles.menuItem}>
            <Stack sx={{ padding: "3px 0 7px 0" }}>
              <span style={{ fontWeight: "bold" }}>Hover to reveal</span>
              <div style={qrcode(hoverProps.show)} {...hoverProps}>
                <QRCode
                  value={props.qrtoken}
                  renderAs="svg"
                  size={128}
                />
              </div>
              <div style={styles.qrDesc}>Don't show the QR code to anyone, for asset security.</div>
            </Stack>
          </Box>
        </Box>
        <Box>
          <Stack style={{ ...styles.menuItem, borderBottom: "none" }} justifyContent="center" direction="row">
            <button style={styles.logout} onClick={() => { deletetoken() }}>delete token</button>
          </Stack>
          <Stack style={{ ...styles.menuItem, borderBottom: "none" }} justifyContent="center" direction="row">
            <button style={styles.logout} onClick={props.refresh}>refresh</button>
          </Stack>
          <Stack style={{ ...styles.menuItem, borderBottom: "none" }} justifyContent="center" direction="row">
            <button style={styles.logout} onClick={props.logout}>Logout</button>
          </Stack>
        </Box>
      </Menu>
    </>
  )
}

type State = {
  anchorEl: any;
  showQRCode: boolean;
}

class Header extends React.Component<any, State> {
  state: State = {
    anchorEl: null,
    showQRCode: false
  }

  getActiveIndex() {
    const currentPath = this.props.history?.location?.pathname ?? ""
    return headerPathList.findIndex(x => x.test(currentPath))
  }

  async login() {
    this.props.login();
  }

  goto(path: string) {
    const isLogin = Boolean(this.props.authentication.token)
    if (!isLogin && path === menuItems[0].path) {
      this.props.showLogin()
      return
    }
    this.props.history.push(path)
  }

  render() {
    const isLogin = Boolean(this.props.authentication.token)
    const activeIndex = this.getActiveIndex()


    return (
      <Stack
        style={styles.root}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <div style={styles.logoDiv}>
          <img src={gameLogo} alt="logo" style={styles.logo} />
        </div>
        <Stack
          className="switcher"
          direction="row"
          justifyContent="center"
          spacing="60px"
        >
          {menuItems.map((mi, index) => (
            <div className="menu-item" key={mi.name}>
              <div onClick={() => this.goto.bind(this)(mi.path)} className={activeIndex === index ? "active" : ""}>{mi.name}</div>
            </div>
          ))}
        </Stack>
        <Box sx={styles.rightPart}>
          <Stack direction="row" spacing="23px" justifyContent="end">
            <GradientButton
              startColor="#FFB731"
              endColor="#D78C27"
              onClick={() => { }}
            >BUY $DEAR</GradientButton>
            {isLogin
              ? (<HeaderMenu
                logout={this.props.logout}
                refresh={() => { QrTokenObj.refresh(); window.mui.toast("QR code refreshed successfully"); }}
                address={this.props.authentication.address}
                qrtoken={this.props.authentication.qrtoken}
              />)
              : <GradientButton
                startColor="#3D885F"
                endColor="#226742"
                onClick={this.login.bind(this)}
              >LOGIN</GradientButton>
            }
          </Stack>
        </Box >
      </Stack>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header))