import React from "react"

import { Box, Stack } from "@mui/material"
import QRCode from "qrcode.react"

import GradientButton from "Components/Common/GradientButton"

import { web3Utils } from "Common/web3utils"
import { login } from "Api/Endpoints"


export default class TestPage extends React.Component<any, any> {
  state = {
    token: ''
  }

  async login() {
    try {
      const timestamp = Date.now()
      const [addr, signedData] = await web3Utils.signToLogin(timestamp)
      console.log(`signed data: ${signedData}`)
      const data = await login(addr, 1, signedData, timestamp)
      console.log(`response: ${data}`)

      this.setState({
        token: data[1].data.qrtoken
      })
    } catch (e) {
      window.alert(e)
    }
  }

  tryAgain() {
    this.setState({ token: '' })
  }
  
  render() {
    return (
      <Box>
        <Stack>
          {this.state.token.length === 0 ?
            (<GradientButton
              startColor="#3D885F"
              endColor="#226742"
              onClick={this.login.bind(this)}
            >LOGIN</GradientButton>)
            : (
              <Stack>
                <QRCode
                  value={this.state.token}
                  size={280}
                  fgColor="#1F3B2F"
                  style={{ margin: '10px 10px' }}
                ></QRCode>

                <GradientButton
                  startColor="#3D885F"
                  endColor="#226742"
                  onClick={this.tryAgain.bind(this)}
                >Try Again</GradientButton>
              </Stack>
            )
          }
        </Stack>
      </Box>
    )
  }
}