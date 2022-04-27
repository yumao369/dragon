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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      position: "top"
    },
    title: {
      display: true,
      text: 'Claim History',
      color: "#fff",
      font: { size: 16 }
    },
  },
  layout: {
    padding: 0,
  }
}

export default class ClaimHistory extends React.Component<
  {
    style?: React.CSSProperties;
  },
  {
    history: Array<{
      era: number;
      amount: number;
      application: number;
    }>
  }
> {
  state = {
    history: range(1, 7).map(x => ({
      era: x,
      amount: 0,
      application: 0,
    }))
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    try {
      const history = await (await web3Utils.getContract("rewardsController")).getHistory()
      if (history) {
        this.setState({ history: history })
      }
    } catch (e: any) { }
  }

  render() {
    const data = {
      labels: range(0, this.state.history.length).reverse().map(x => {
        if (x === 0) {
          return "Today"
        } else if (x === 1) {
          return "1 day ago"
        } else {
          return `${x} days ago`
        }
      }),
      datasets: [
        {
          label: '$mDEAR',
          data: this.state.history.map(x => x.application).map(x => x / 1e18),
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: '$DEAR',
          data: this.state.history.map(x => x.amount).map(x => x / 1e18),
          backgroundColor: 'rgb(53, 162, 235)',
        },
      ]
    }
    return (
      <Box style={{ ...styles.root, ...this.props.style }}>
        <Center>
          <Bar
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