import React from "react"

import { withRouter } from "react-router-dom"
import { Stack } from "@mui/material"
import { ArrowBackIosNew } from "@mui/icons-material"

const styles = {
  root: {
    margin: "22px 0",
    cursor: "pointer",
    zIndex: 99,
    color: "white",
  } as React.CSSProperties,
  back: {
    fontSize: "18px",
    color: "white",
  } as React.CSSProperties,
}

function BackArrow (props: any) {
  const { history } = props
  return (
    <Stack style={styles.root} onClick={() => history?.goBack()} direction="row" alignItems="center" spacing="12px">
      <ArrowBackIosNew style={{color: "white"}}/>
      <span style={styles.back}>Back</span>
    </Stack>
  )
}

export default withRouter(BackArrow)