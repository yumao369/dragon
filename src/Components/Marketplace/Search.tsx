import React, { useState } from "react"

import { styled } from "@mui/material/styles"
import { Box, Stack } from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"

const styles: Styles = {
  root: {
    width: "187px",
    height: "37px",
    border: "1px solid #28513A",
    borderRadius: "3px",
    padding: "0 12px 0 23px",
  },
  searchIcon: {
    color: "#888888",
    cursor: "pointer",
  },
  input: {
    background: "transparent",
    border: "none",
    color: "white",
    width: "130px",
    fontSize: "16px",
  }
}

export default function Search(props: {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSearch: () => void;
}) {
  return (
    <Box style={styles.root}>
      <Stack style={{height: "100%"}} direction="row" justifyContent="space-between" alignItems="center">
        <input value={props.value} onChange={props.onChange} placeholder="Search by ID" style={styles.input}></input>
        <SearchIcon style={styles.searchIcon} onClick={props.onSearch}/>
      </Stack>
    </Box>
  )
}
