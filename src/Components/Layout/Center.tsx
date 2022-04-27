import React from "react"

export default function Center(props: {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  const {
    style = {}
  } = props
  return <div
    style={{
      width: "100%",
      height: "100%",
      ...style,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >{props.children}</div>
}