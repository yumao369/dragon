import React from "react"
import { Stack, Box } from "@mui/material"
import { useSelectable } from "Common/Hooks"

const styles = {
  filterItem(selected: boolean): React.CSSProperties {
    return {
      background: selected ? "#1F392B" : "none",
      width: "64px",
      height: "24px",
      fontSize: "13px",
      fontWeight: selected ? "bold" : "400",
      color: selected ? "white" : "#bbbbbb",
      cursor: "pointer",
      textAlign: "center",
      lineHeight: "24px",
      borderRadius: "3px"
    }
  }
}

function ItemFilterItem (props: {
  key: any;
  name: string;
  selected: boolean;
  onClick: Fn<any, void>
}) {
  return <Box onClick={props.onClick} style={styles.filterItem(props.selected)}>{props.name}</Box>
}

export default function ItemFilter (props: {
  onSelect?: Fn<0 | 1 | 2, void>
}) {
  const arr = ["ALL", "SALE", "STAKE"]
  const { selectedIndex, select } = useSelectable(0)

  const onClick = (index: number) => {
    select(index)
    props.onSelect && props.onSelect(index as 0 | 1 | 2)
  }

  return (
    <Stack direction="row" spacing="6px">
      {arr.map((elm, index) => (
        <ItemFilterItem key={elm} name={elm} selected={selectedIndex === index} onClick={() => onClick(index)}></ItemFilterItem>
      ))}
    </Stack>
  )
}