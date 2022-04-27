import React from "react"

import "./ElementClassOption.scss"

const styles = {
  text: {
    fontSize: "11px" 
  }
}

/**
 * 
 * @param {{selected: boolean; imageSrc: string; text: string, onClick: () => void}} props 
 * @returns {JSX.Element}
 */
export default function ElementClassOption(props: {
  selected: boolean;
  imageSrc: string;
  text: string;
  iconStyle?: React.CSSProperties;
  onClick: () => void
}) {
  const {
    iconStyle={
      width: "18px",
      height: "18px",
      margin: "0 10px 0 4px"
    }
  } = props
  return (
    <div className={props.selected ? "option selected" : "option"} onClick={props.onClick}>
      <img src={props.imageSrc} style={iconStyle} alt="icon" />
      <span style={styles.text}>{props.text}</span>
    </div>
  )
}
