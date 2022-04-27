import React from "react"

import { Backdrop, Box, Stack } from "@mui/material"
import { Close } from "@mui/icons-material"

const styles: Styles = {
  root: {


  },
  closeBtn: {

  },
  title: {

  }
}
export default function CongratulationsModal(props: {
  visible: boolean;
}) {
  return (
    <Backdrop 
      open={props.visible}
    >
      <Box style={styles.root}>
        <Close style={styles.closeBtn}/>
        <Stack>
          <div style={styles.title}>CONGRATULATIONS!</div>
          
        </Stack>

      </Box>
    </Backdrop>
  )
}