import React from "react"

import { Stack, MenuItem, TextareaAutosize } from "@mui/material"

import BackArrow from "Components/Common/BackArrow"
import FileDrop from "Components/MyDragonaire/feedback/FileDrop"
import GradientButton from "Components/Common/GradientButton"
import StyledSelect, {MenuProps} from "Components/Common/StyledSelect"

import "./feedback.scss"

const styles: Styles = {
  input: {
    background: "#182A22",
    border: "1px solid #444B48",
    borderRadius: "3px",
    width: "647px",
    height: "37px",
    paddingLeft: "13px",
    marginTop: "19px",
  }
}

export default function Feedback (propss: {}) {
  const feedbackTypes = ["Feedback 1", "Feedback 2", "Feedback 3"]
  return (
    <Stack>
      <BackArrow />
      <Stack style={{ marginLeft: "37px", width: "650px" }}>
        <div className="required">Choose the type of feedback</div>
        <StyledSelect MenuProps={MenuProps} style={{ marginTop: "19px", width: "187px", height: "37px", border: "1px solid #444B48" }}>
          {feedbackTypes.map(op => <MenuItem key={op} value={op}>{op}</MenuItem>)}
        </StyledSelect>

        <div style={{ marginTop: "29px" }} className="required">Problem Description</div>

        { /* @ts-ignore */}
        <TextareaAutosize rows="5" placeholder="Problem Description" style={{
          border: "1px solid #444B48",
          borderRadius: "3px",
          width: "647px",
          minHeight: "135px",
          padding: "15px",
          background: "#182A22",
          resize: "vertical",
          marginTop: "19px"
        }} />

        <div style={{ marginTop: "29px" }} className="required">Screenshots</div>
        <div style={{ marginTop: "14px", fontSize: "13px", color: "#bbbbbb" }}>(You can upload up to 5 pictures, each with a maximum of 5M.)</div>
        <FileDrop style={{ marginTop: "19px", width: "647px", background: "#182A22", color: "#bbbbbb" }} />
        <div style={{ marginTop: "29px" }} className="required">Email Address</div>
        <input style={styles.input} placeholder="enter your email address"></input>
        <div style={{ marginTop: "29px" }} className="required">Your wallet address</div>
        <input style={styles.input} placeholder="Your wallet address"></input>
        <div style={{ marginTop: "29px" }} className="required">Choose the language you want to reply to you</div>
        <StyledSelect MenuProps={MenuProps} style={{ marginTop: "19px", width: "187px", height: "37px", border: "1px solid #444B48" }}>
          {feedbackTypes.map(op => <MenuItem key={op} value={op}>{op}</MenuItem>)}
        </StyledSelect>
        <Stack direction="row" justifyContent="center" style={{ width: "100%" }}>
          <GradientButton
            style={{ marginTop: "61px", marginBottom: "41px" }}
            startColor="#FFB631"
            endColor="#D88B27"
            width="145px"
            height="40px"
          >Submit</GradientButton>
        </Stack>
      </Stack>
    </Stack>
  )
}
