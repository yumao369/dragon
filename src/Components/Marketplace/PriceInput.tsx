import React from "react"

import { Stack } from "@mui/material"

import Summary from "./Summary"

const styles: Styles = {
  inputRow: {
    color: "white",
    fontSize: "11px",
    width: "200px",
    marginBottom: "10px"
  },
  input: {
    color: "#888888",
    width: "65px",
    height: "26px",
    background: "#131E1C",
    border: "1px solid #46514F",
    borderRadius: "3px",
    fontSize: "11px",
    padding: "0 2px",
  },
  bnb: {
    fontSize: "14px"
  },
}

export default function PriceInput(props: {
  value: [string, string];
  onChange: Fn<[string, string], void>;
}) {
  const {
    value,
    onChange 
  } = props
  const [start, end] = value
  return (
    <Summary name="PRICE" maxHeight="36px" flagNumber={(start.length > 0 && end.length > 0) ? 1 : 0}>
      <Stack style={styles.inputRow} spacing="8px"
        direction="row"
        justifyContent="start"
        alignItems="center"
      >
        <input style={styles.input} value={start} type="number" onChange={e => onChange([e?.target?.value ?? "0",  end])}/>
        <span>to</span>
        <input style={styles.input} value={end} type="number" onChange={e => onChange([start, e?.target?.value ?? "0",])}/>
        <span style={styles.bnb}>BNB</span>
      </Stack>
    </Summary>
  )
}
