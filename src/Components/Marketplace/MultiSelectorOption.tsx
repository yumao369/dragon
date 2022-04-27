import React from 'react'
import { Stack } from "@mui/material"
import {
  CheckBoxOutlineBlank, Check
} from '@mui/icons-material'
import { useMouseOver } from 'Common/Hooks';


const styles: Styles = {
  checked: {
    color: "white",
    width: "19px",
    height: "19px",
    fontWeight: "bold",
    position: "absolute",
    top: "-2px",
    left: "-2px",
  },
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  }

}

function checkedBg(isOver: boolean): React.CSSProperties {
  return {
    cursor: "pointer",
    border: `1px solid ${isOver ? 'white' : '#3E8959'}`,
    width: "17px",
    height: "17px",
    position: "relative",
    borderRadius: "3px",
    transition: "border .2s ease .2s"
  }
}

/**
 * 
 * @param {{selected: boolean; onClick: () => void, children: any}} props 
 * @returns 
 */
export default function MultiSelectorOption(props: {
  onClick: () => void;
  selected: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const style = props.style ?? {}
  const root = styles.root
  const { isOver, onMouseOver, onMouseLeave } = useMouseOver()

  return (
    <Stack
      direction="row"
      style={{ ...root, ...style }}
      onClick={props.onClick}
      onMouseOver={onMouseOver} 
      onMouseLeave={onMouseLeave}
    >
      <div style={checkedBg(isOver)} >
        {props.selected
          ? <Check style={styles.checked} />
          : <></>
        }
      </div>
      {props.children}
    </Stack>
  )
}
