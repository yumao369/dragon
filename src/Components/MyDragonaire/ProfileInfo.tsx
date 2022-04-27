import React from "react"
import { connect } from "react-redux"

import { Stack, Box, Avatar } from "@mui/material"
import { QrCode2 } from "@mui/icons-material"
import { askPermission, writeToClipboard } from "Common/functions"

import AvatarImg from "Assets/Images/avatar_test.png"
import AvatarSettingModal from "./AvatarSettingModal"
import { useModal } from "Common/Hooks"

import EditImg from "Assets/Images/Icon/edit.png"
import CopyImg from "Assets/Images/Icon/copy.png"
import LoginWithQRCode from "./account/LoginWithQRCode"
import { take, takeLast } from "ramda"

import "./ProfileInfo.scss"


const styles: Styles = {
  avatar: {
    width: "91px",
    height: "91px",
    border: "3px solid white",
    marginBottom: "10px",
    cursor: "pointer",
  },
  address: {
    fontSize: "16px",
    color: "white",
    fontWeight: "bold",
  },
  edit: {
    color: "#8C8C8C",
    fontSize: "16px",
  },
  link: {
    fontSize: "10px",
  },
  showQR: {
    fontWeight: "bold",
  },
  icon: {
  width: "13px",
    height: "13px",
    cursor: "pointer",
  }
}

// @ts-ignore
const mapStateToProps = store => ({
  authentication: store.Authentication,
})

function ProfileInfo (props: {
  authentication: Authentication
}) {
  const { authentication } = props
  const addr = authentication.address
  const address = `${take(6, addr)}****${takeLast(6, addr)}`
  const link = `https://testnet.bscscan.com/address/${addr}`
  const avatarSettingModalProps = useModal(false)
  const qrcodeModalProps = useModal(false)

  const copy = async () => {
    // await askPermission()
    window.message.success("Copied!", 2000)
    writeToClipboard(link)
    // window.navigator.clipboard.writeText(link)
  }

  return (
    <Stack alignItems="center">
      <Avatar sx={styles.avatar} alt="Profile" src={AvatarImg} onClick={avatarSettingModalProps.show}/>
      <Stack direction="row" style={{marginBottom: "16x"}} alignItems="center" spacing="5px">
        <span style={styles.address}>{address}</span>
        <img src={EditImg} alt="edit" style={styles.icon}/>
      </Stack>
      <Stack direction="row" style={{marginBottom: "16px"}} alignItems="center" spacing="10px">
        <a style={styles.link} href={link}>{address}</a>
        <img src={CopyImg} alt="copy" style={styles.icon} onClick={copy}/>
      </Stack>
      <button className="qr-button" onClick={qrcodeModalProps.show}>
        <Stack direction="row" alignItems="center">
          <QrCode2/>
          <span style={styles.showQR}>SHOW QR</span>
        </Stack>
      </button>
      
      <AvatarSettingModal {...avatarSettingModalProps}/>
      <LoginWithQRCode {...qrcodeModalProps} qrtoken={props.authentication.qrtoken}/>
    </Stack>
  )
}

export default connect(
  mapStateToProps
  , {}
)(ProfileInfo)