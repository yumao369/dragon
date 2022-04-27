import React from "react"

import { Box, Stack } from "@mui/material"
import { formatNumber } from "Common/functions"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'
import { range } from "ramda";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const styles: Styles = {
  box: {
    width: "303px",
    height: "311px",
    background: "#31413C",
    borderRadius: "3px",
  },
  title: {
    width: "303px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
    position: "absolute",
    top: "22px",
    left: "0px"
  },
  line: {
    position: "absolute",
    top: "30px",
    left: "0px",
    width: "303px",
    height: "275px"

  },
  amount: {
    width: "303px",
    fontWeight: "bold",
    fontSize: "26px",
    top: "150px",
    textAlign: "center",
    position: "absolute",
  }
}


export default function TotalStaking(props: {
  data?: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      tension: number;
    }>
  }
}) {
  const arr = range(0, 7).map(i => Math.floor(4400000 / Math.pow(1.5, i)))

  const {
    data = {
      labels: range(0, arr.length).map(x => `200${x}`),
      datasets: [{
        label: 'Total Staking',
        data: arr,
        fill: false,
        borderColor: '#596662',
        tension: 0.1
      }]
    }
  } = props
  return (
    <Stack spacing="25px">
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>Total Staking</div>
      <Box position="relative" style={styles.box}>
        <div style={styles.title}>Total Amount Staked</div>
        <div style={styles.line}>
          <Line
            width="303px"
            height="275px"
            options={{
              scales: {
                y: {
                  ticks: {
                    display: false,
                  }
                },
                x: {
                  ticks: {
                    display: false,
                  }
                },
              },
              responsive: true,
              plugins: {
                legend: {
                  display: false
                },
              },
              elements: {
                point: {
                  radius: 1
                }
              },
              layout: {
                padding: 28,
              }
            }}
            data={data}
          />
        </div>
        <div style={styles.amount}>{formatNumber(44430000)}</div>
      </Box>
    </Stack>
  )
}
