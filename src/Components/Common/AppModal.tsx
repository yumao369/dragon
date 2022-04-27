import React from "react"

import { Modal, Box } from "@mui/material"
import { Close } from "@mui/icons-material"

const styles = {
  appModal(width: string, height: string): React.CSSProperties {
    return {
      width,
      height,
      border: "1px solid #306745",
      background: "#1F392B",
      borderRadius: "8px",
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }
  },
  closeBtn: {
    position: "absolute",
    top: "11px",
    right: "11px",
    fontSize: "20px",
    color: "white",
    cursor: "pointer",
  } as React.CSSProperties
}


export default function AppModal(props: {
  width?: string;
  height?: string;
  visible: boolean;
  onClose: Callback;
  children?: React.ReactNode
}) {
  const {
    width = "550px", height = "300px",
    visible, onClose
  } = props
  return (
    <Modal
      open={visible}
    >
      <Box style={styles.appModal(width, height)}>
        <Close style={styles.closeBtn} onClick={onClose}/>
        {props.children}
      </Box>
    </Modal>
  )
}