import React from "react"

import { Select } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledSelect = styled(Select)({
  background: "#1F392B",
  color: "white",
  "& .MenuItem-root": {
    background: "#1F392B",
  },
  "& .MuiSvgIcon-root": {
    color: "white",
  },
  "& .Mui-focused": {
    border: "none"
  },
  "& fieldset": {
    border: "none"
  },
})

export const MenuProps = {
  PaperProps: {
    sx: {
      bgcolor: "#1f392b",
      color: "white",
      "& .MuiMenuItem-root.Mui-selected": {
        bgcolor: "rgb(62, 137, 89, 0.4)",
      },
      "& .MuiMenuItem-root:hover": {
        bgcolor: "rgb(62, 137, 89, 0.6)",
      }
    },
  }
}

export default StyledSelect
