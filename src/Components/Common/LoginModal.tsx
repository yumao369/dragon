import React from 'react'
import AppModal from "./AppModal"
import GradientButton from './GradientButton'
import { Stack } from '@mui/material'
import { store } from "Redux/Store"
import { Login } from 'Redux/Actions/Authentication'

export default function LoginModal (props: {
  width?: string;
  height?: string;
  onClose: () => void;
  visible: boolean;
}) {
  return (
    <AppModal
      {...props}
      width="260px"
      height="160px"
    >
      <Stack alignItems="center" style={{ width: "100%" }}>
        <div style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "white",
          height: "50px",
          lineHeight: "50px",
        }}>
          Login
        </div>
        <div style={{
          fontSize: "14px",
          fontWeight: "bold",
          color: "white",
          height: "50px",
          lineHeight: "50px",
        }}>
          You need login.
        </div>
        <GradientButton
          startColor="#3D885F"
          endColor="#226742"
          onClick={async () => {
            await Login(store.dispatch)();
            props.onClose()
          }}
        >LOGIN</GradientButton>
      </Stack>
    </AppModal>
  )
}
