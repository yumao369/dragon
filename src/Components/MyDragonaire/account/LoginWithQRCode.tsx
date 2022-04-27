import React from "react"
import { Stack } from "@mui/material"
import QRCode from "qrcode.react"

import AppModal from "Components/Common/AppModal"

export default function LoginWithQRCode(props: {
  visible: boolean;
  qrtoken: string;
  onClose: Callback;
}) {

  return (
    <AppModal
      {...props}
      width="300px"
      height="280px"
    >
      <Stack alignItems="center" style={{ width: "100%" }}>
        <div style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "white",
          height: "50px",
          lineHeight: "50px",
        }}>
          Login with QR Code
        </div>
        <QRCode
          value={props.qrtoken}
          renderAs="svg"
          size={180}
          includeMargin={true}
        />
        <div style={{
          color: "#e23e3e",
          fontSize: "14px",
          height: "40px",
          lineHeight: "40px",
        }}>DO NOT show this QR code to anyone</div>
      </Stack>
    </AppModal>
  )
}