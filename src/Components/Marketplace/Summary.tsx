import React, { useState } from 'react'

import { ArrowDropDown, ArrowRight } from '@mui/icons-material'
import { minHeight, style } from '@mui/system'

const styles: Styles = {
  root: {
    width: "100%",
    borderTop: "1px solid #303F3C",
    cursor: "pointer",
  },
  header: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    height: "40px",
    fontSize: "11px",
  },
  flag: {
    background: "rgb(62, 137, 89)",
    height: "18px",
    borderRadius: "16px",
    minWidth: "18px",
    lineHeight: "18px",
    textAlign: "center",
    fontSize: "11px",
    fontWeight: "bold",
  }
}

function detail(visible: boolean, maxHeight = "168px"): any {
  return {
    "-webkit-transition": "all .3s ease-out",
    transition: "all .3s ease-out",
    maxHeight: visible ? maxHeight : "0px",
    overflowY: "hidden",
    overflowX: "clip",
  } as any
}

function icon(visible: boolean): React.CSSProperties {
  return {
    transition: ".3s transform ease-out",
    transform: `rotate(${visible ? '90' : '0'}deg)`
  }
}

export default function Summary(props: {
  name: string;
  children?: React.ReactNode;
  maxHeight?: string;
  flagNumber?: number;
}) {
  const {
    name,
    children,
    flagNumber = 0,
    maxHeight
  } = props
  const [visible, setVisible] = useState(false)
  return (
    <div style={styles.root}>
      <div style={styles.header} onClick={() => setVisible(!visible)}>
        <span>{name}</span>
        <div style={{flex: 1}}/>
        {
          flagNumber > 0
            ? <div style={styles.flag}>{flagNumber}</div>
            : <></>
        }
        <ArrowRight fontSize="small" style={icon(visible)}/>
      </div>
      <div style={detail(visible, maxHeight)}>
         {children}
      </div>
    </div>
  )
}