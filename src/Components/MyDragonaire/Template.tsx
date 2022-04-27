import React from "react"

import { Stack, Divider, Box } from "@mui/material"
import { WithInitTemp } from "Containers"
import LeftPart from "./LeftPart"

export default function Template (CustomComponent: any) {
  function Comp (props: any) {
    return (
      <Stack
        direction="row"
        divider={<Divider style={{background: "#45504E"}} orientation="vertical" flexItem/>}
      >
        <Box style={{marginTop: "41px"}}>
          <LeftPart />
        </Box>
        <Box sx={{ width: "971px", marginLeft: "6px", marginTop: "41px" }}>
          <CustomComponent {...props}></CustomComponent>
        </Box>
      </Stack>
    )
  }

  return WithInitTemp(Comp)
}