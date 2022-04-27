import React from "react"

import { Stack } from "@mui/material"
import GradientButton from "Components/Common/GradientButton"
import DragonIcon from "Assets/Images/Marketplace/dragon_icon.png"
import { ArrowDropUp } from "@mui/icons-material"

export default function Navigation(props: {}) {
  return (
    <Stack direction="row" spacing="29px" sx={{ height: "63px", borderBottom: "1px solid #3E8959" }}>
      <GradientButton
        startColor="#3E8959"
        endColor="#26663D"
        width="215px"
        height="41px"
        style={{ fontSize: "17px", position: "relative" }}
      >
        <Stack direction="row" spacing="8px" alignItems="center" justifyContent="center">
          <img src={DragonIcon} alt="icon" style={{ width: "20px", height: "19px" }} />
          <span>DRAGONS</span>
        </Stack>
        <ArrowDropUp style={{
          width: "20px",
          color: "#3E8959",
          position: "absolute",
          left: "90px",
          bottom: "-32px"
        }}></ArrowDropUp>
      </GradientButton>

      <div style={{
        background: "#888888",
        borderRadius: "3px",
        width: "215px",
        height: "41px",
        fontSize: "17px",
        fontWeight: "bold",
        color: "#555555",
        textAlign: "center",
        lineHeight: "39px"
      }}>COMMING SOON</div>
    </Stack>
  )
}