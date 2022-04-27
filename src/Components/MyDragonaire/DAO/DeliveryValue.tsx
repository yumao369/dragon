import React from 'react'
import { Box } from "@mui/material"
import Center from 'Components/Layout/Center'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2'
import { web3Utils } from 'Common/web3utils';
import { range } from 'ramda';
import { getNearlyDaoResp } from 'Capabilities/Capabilities';
import BigNumber from 'bignumber.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
)

const styles: Styles = {
  root: {
    background: "#303C39",
    borderRadius: "3px",
    width: "540px",
    height: "300px",
    padding: "125px"
  },
  title: {
    position: "absolute",
    left: "20px",
    top: "20px",
    fontWeight: "bold",
  },
  amount: {
    fontSize: "30px",
    fontWeight: "bold",
  }
}

const options: any = {
  responsive: true,
  plugins: {
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: 'DeliveryValue',
      color: "#fff",
      font: { size: 16 }
    },
  },
  layout: {
    padding: 0,
  }
}

export default class DeliveryValue extends React.Component<{ style?: React.CSSProperties; amount: string; nearlyDao: getNearlyDaoResp[] }> {

  getnearlyTotal() {
    const data = this.props.nearlyDao
    var total = data.reduce<string>((prev, cur) => {
      prev = new BigNumber(prev).plus(new BigNumber(cur.amount).dividedBy(new BigNumber(Math.pow(10, 18)))).toFixed()
      return prev;
    }, "0")
    return total;
  }


  render() {
    const current = this.getnearlyTotal()
    const historyTotal = new BigNumber(this.props.amount).dividedBy(new BigNumber(Math.pow(10, 18))).toFixed()
    const data = {
      labels: ['current', 'history'],
      datasets: [
        {
          label: 'delivery value',
          data: [current, (historyTotal as unknown as number) - (current as unknown as number)],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
        }
      ]
    }
    return (
      <Box style={{ ...styles.root, ...this.props.style }}>
        <Center>
          <Pie
            width="355px"
            height="200px"
            options={options}
            data={data}
          />
        </Center>
      </Box>
    )
  }
}