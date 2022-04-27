import React from 'react'

export default function DargonImageViewer(props: {
  src: string;
  style?: React.CSSProperties
}) {
  const { src, style = {} } = props

  return (<div
    style={{
      backgroundImage: `url(${src})`,
      backgroundSize: "contain",
      backgroundPosition: "center center",
      pointerEvents: "none",
      ...style,
    }}
  ></div>)
}