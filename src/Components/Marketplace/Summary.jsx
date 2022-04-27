import React, { useState } from 'react'

import { ArrowDropDown, ArrowRight } from '@mui/icons-material'

const styles = {
  root: {
    width: "100%",
    borderTop: "1px solid #303F3C",
    cursor: "pointer",
  },
  header: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    height: "40px",
    fontSize: "11px",
  }
}

export default function Summary(props) {
  const [visiable, setVisiable] = useState(false)
  return (
    <div style={styles.root}>
      <div style={styles.header} onClick={() => setVisiable(!visiable)}>
        <span>{props.name}</span>
        {visiable ? <ArrowDropDown fontSize="small"/> : <ArrowRight fontSize="small"/>}
      </div>
      {visiable ? props.children : <></>}
    </div>
  )
}