import React from "react"

import { Stack, Divider, Box } from "@mui/material"
import ProfileInfo from "./ProfileInfo"
import LeftMenu from "./LeftMenu"

function LeftPart (props: {}) {
  return (
    <Box>
      <Stack
        divider={<Divider style={{background: "#45504E"}}/>}
        spacing="35px"
      >
        <ProfileInfo/>
        <LeftMenu/>
      </Stack>
    </Box>
  )
}

export default LeftPart