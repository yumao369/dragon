import React from "react"
import { Box, Stack } from "@mui/material"

import "./Switcher.scss"

const styles: Styles = {
  root: {
    height: "40px",
    borderBottom: "1px solid #2E6242",
    paddingTop: "8px",
  }
}

export default function Switcher(props: {
  options: string[];
  selectedIndex: number;
  select: Fn<number, void>;
}) {
  const {
    options = ["Dragons", "Mystery Box"],
    selectedIndex,
    select
  } = props

  return (
    <Box style={styles.root}>
      <Stack direction="row" spacing="50px" sx={{ paddingLeft: "36px" }}>
        {
          options.map((op, index) => (
            <div
              className="switcher-item"
              onClick={() => select(index)}
              key={op}
            ><div className={selectedIndex === index ? "active" : ""}>{op}</div></div>
          ))
        }

      </Stack>
    </Box>
  )
}