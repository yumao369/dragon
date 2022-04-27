import { CircularProgress } from "@mui/material"
import { updateQRToken } from "Api/Endpoints"
import { UpdateQRTokenResp } from "Capabilities/Capabilities"
import { getData } from "Common/localData"
import { updateContractFromServer } from "Common/utils"
import { web3Utils } from "Common/web3utils"
import { SET_USERINFO } from "Constants/ActionTypes"
import { Component } from "react"
import { connect } from "react-redux"
import "./WithInitApp.scss"
/*
* 高阶组件,初始化APP及初始化redux部分参数
*/

const mapDispatchToProps = (dispatch: any) => ({
    setUserInfo: (data: any) => dispatch({ type: SET_USERINFO, data }),
})

const WithInitApp = (CustomComponent: any) => {
    class WarpperComponent extends Component<{
        setUserInfo: (data: any) => void
    }> {
        state = {
            loading: false
        }
        async UNSAFE_componentWillMount () {
            this.setState({ loading: true })
            const data = getData("authentication")


            // init abis
            //updateContractFromServer()
            
            if (Boolean(data) && !web3Utils.isInit()) {
                await web3Utils.init()
                // 有效时间24小时
                const previousTimestamp = parseInt(String(data.timestamp))
                const validTimeRange = 1296000000
                if (!isNaN(previousTimestamp) && previousTimestamp + validTimeRange > Date.now()) {
                    const [status, resp] = await updateQRToken<UpdateQRTokenResp>(data.qrtoken)
                    if (status.toString().startsWith('20') && resp.code === 0) {
                        data.qrtoken = resp.data ?? ""
                    }
                    this.props.setUserInfo(data)
                }
            }
            this.setState({ loading: false })
        }

        render () {
            const props = {
                ...this.props,
            }
            return this.state.loading ?
                (
                    <>
                        <div className="initLoading">
                            <CircularProgress color={"primary"} size={40}></CircularProgress>
                        </div>
                    </>
                ) : (<CustomComponent {...props}></CustomComponent>)
        }

    }

    return connect(store => {}, mapDispatchToProps)(WarpperComponent)
}

export default WithInitApp