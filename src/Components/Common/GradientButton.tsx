import React, { useState } from "react"
import { lightenDarkenColor } from 'Common/utils'

export default function GradientButton(props: {
  startColor: string;
  endColor: string;
  style?: React.CSSProperties;
  width?: string;
  height?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}) {

  const {
    style = {},
    startColor,
    endColor,
    width = "120px",
    height = "35px",
    onClick
  } = props

  const backgroundNormal = `linear-gradient(90deg, ${startColor}, ${endColor})`
  const backgroundHover = `linear-gradient(90deg, ${lightenDarkenColor(startColor, 15)}, ${lightenDarkenColor(endColor, 15)})`

  const [background, setBg] = useState(backgroundNormal)

  return (
    <button
      type="button"
      style={{
        width,
        height,
        padding: "0",
        background,
        border: "none",
        fontWeight: "bold",
        fontSize: "14px",
        color: "white",
        borderRadius: "3px",
        transition: "background .3s ease .3s",
        ...style
      }} 
      onClick={onClick}
      onMouseOver={() => setBg(backgroundHover)}
      onMouseLeave={() => setBg(backgroundNormal)}
    >{props.children}</button>
  )
}