import React from "react"

import MultiSelectorOption from "./MultiSelectorOption"

const styles = {
  icon: {
    width: "48px"
  }
}

export default function FarmPowerOption(props: {
  onClick: () => void;
  selected: boolean;
  icon: string;
}) {
  return (
    <MultiSelectorOption onClick={props.onClick} selected={props.selected} style={{width: "66px"}}>
      <img style={styles.icon} src={props.icon} alt="power"/>
    </MultiSelectorOption>
  )
}

