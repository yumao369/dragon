import { Component } from "react"
import { connect } from "react-redux"
import { store } from 'Redux/Store'
import { withRouter } from "react-router-dom"
import { Box, Stack } from "@mui/material"
import Header from "Components/Containers/Header";
import Footer from "Components/Containers/Footer";
import LoginModal from "Components/Common/LoginModal"
import {QrTokenObj} from "Common/QrToken"
import {getData} from "Common/localData"
import {updateQRToken} from "Api/Endpoints"
/*
* 高阶组件,初始化page
*/
const WithInitTemp = (CustomComponent: any) => {
    class WarpperComponent extends Component<{
        history: any
    }, {loginVisible: boolean}> {
        state = {
            loginVisible: false,
        }

        //组件挂载完成调用
        componentDidMount () {
            window.mui.init();
            //初始化区域滚动
            window.mui('.WithInitTempRowTwoColOneBoxColTwoWrapper').scroll({
                deceleration: 0.0005, // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
            window.mui('.WithInitTempRowTwoBoxColTwoWrapper').scroll({
                deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });

            const currentPath = this.props.history?.location?.pathname ?? ""
            if (
                !Boolean(store.getState().Authentication.token)
                && currentPath.startsWith("/my/")
            ) {
                // goto 
                this.props.history.push("/marketplace")
            }
        }

        componentWillUnmount() {
            window.timer && clearInterval(window.timer);
        }



        showLogin() {
            this.setState({loginVisible: true})
        }

        render () {
            const props = {
                ...this.props,
            }

            return (
                <Box sx={{ width: "100%" }}>
                    <Stack>
                        <Header showLogin={this.showLogin.bind(this)}/>
                        <Stack
                            sx={{ minHeight: "1000px", background: "linear-gradient(#182724, #1F3B2F)" }}
                            justifyContent="start"
                            alignItems="center"
                        >
                            <CustomComponent {...props} showLogin={this.showLogin.bind(this)}></CustomComponent>
                        </Stack>
                        <Footer />
                    </Stack>

                    <LoginModal
                        visible={this.state.loginVisible}
                        onClose={() => this.setState({loginVisible: false})}
                    />
                </Box>
            )
        }
    }

    return withRouter(WarpperComponent as any)
}

export default WithInitTemp