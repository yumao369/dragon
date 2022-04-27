import React from "react"

import MultiSelectorOption from "./MultiSelectorOption"

const styles = {
  parity(color: string): React.CSSProperties {
    return {
      color,
      border: `1px solid ${color}`,
      borderRadius: "3px",
      width: "65px",
      height: "17px",
      textAlign: "center",
      fontSize: "10px",
      lineHeight: "15px",
      marginLeft: '10px',
    }
  }
}

export default function ParityOption(props: {
  color: string;
  parity: string;
  selected: boolean;
  onClick: () => void;
}) {
  const { color, parity, selected, onClick } = props
  return (
    <MultiSelectorOption
      selected={selected}
      onClick={onClick}
      style={{marginBottom: "10px", width: "100px"}}
    >
      <div style={styles.parity(color)}>
        {parity}
      </div>
    </MultiSelectorOption>
  )
}

