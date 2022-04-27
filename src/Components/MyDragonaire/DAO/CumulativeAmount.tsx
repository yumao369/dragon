import React from 'react'
import { Box } from "@mui/material"
import Center from 'Components/Layout/Center'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'
import { web3Utils } from 'Common/web3utils';
import { range } from 'ramda';
import { getNearlyDaoResp } from 'Capabilities/Capabilities';
import BigNumber from 'bignumber.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

/*type daoDataType = {
  time: string,
  amount: string
}*/



const styles: Styles = {
  root: {
    background: "#303C39",
    borderRadius: "3px",
    //width: "540px",
    width: "800px",
    height: "300px",
    padding: "10px"
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
      //position: "top"
      display: false
    },
    title: {
      display: true,
      text: 'Cumulative Amount',
      color: "#fff",
      font: { size: 16 }
    }

  },
  layout: {
    padding: 0,
  }
}

export default class CumulativeAmount extends React.Component<{ style?: React.CSSProperties; nearlyDao: getNearlyDaoResp[] }> {

  labels: string[] = []
  data: string[] = []
  backgroundColor: string[] = []
  borderColor: string[] = []

  componentWillMount() {
    this.daoDataDeal(this.props.nearlyDao)
  }

  daoDataDeal = (data: getNearlyDaoResp[]) => {
    data.map(item => {
      const date = new Date(item.time)
      const data = item.amount
      this.labels.push((date.getMonth() + 1) + '-' + date.getDate())
      this.data.push(new BigNumber(data).dividedBy(new BigNumber(Math.pow(10, 18))).toFixed())
      this.backgroundColor.push('rgba(255, 99, 132, 0.2)')
      this.borderColor.push('rgb(153, 102, 255)')
    })
  }

  render() {
    const data = {
      labels: this.labels,
      datasets: [{
        data: this.data,
        backgroundColor: this.backgroundColor,
        borderColor: this.borderColor,
        borderWidth: 1
      }]
    }
    return (
      <Box style={{ ...styles.root, ...this.props.style }}>
        <Center>
          <Bar
            width="800px"
            height="300px"
            options={options}
            data={data}
          />
        </Center>
      </Box>
    )
  }
}