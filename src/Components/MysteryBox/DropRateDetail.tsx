import React from "react"
import { LinearProgress, linearProgressClasses, Stack, Box } from "@mui/material"
import { styled } from "@mui/material/styles"

const styles: Styles = {
  rateDetail: {
    width: "414px",
    height: "269px",
    borderRadius: "4px",
    background: "#303C39",
    padding: "28px 43px 37px 27px",
  },
  title: {
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
  }
}

const styledLinearProgress = (color: string) => styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 2,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "black",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 2,
    backgroundColor: color,
  },
}))

function Bar(props: {
  color: string;
  name: string;
  percent: number;
}) {
  const {
    color,
    name,
    percent
  } = props

  const Progress = styledLinearProgress(color)
  const value = Math.floor(percent * 100)

  return (
    <Stack spacing="6px">
      <Stack direction="row" style={{ color }} justifyContent="space-between">
        <span>{name}</span>
        <span>{value}%</span>
      </Stack>
      <Progress value={value} variant="determinate" />
    </Stack>
  )
}

export default function DropRateDetail(props: {
  percents: [number, number, number]
}) {
  const {
    percents
  } = props
  const [epic, legendary, genesis] = percents
  return (
    <Box sx={styles.rateDetail}>
      <Stack justifyContent="space-between" sx={{ height: "100%" }}>
        <span style={styles.title}>Drop Rate Detail</span>
        <Bar color="#E54DEE" name="Epic" percent={epic} />
        <Bar color="#FF8400" name="Legendary" percent={legendary} />
        <Bar color="#FF0000" name="Genesis" percent={genesis} />
      </Stack>
    </Box>
  )
}
