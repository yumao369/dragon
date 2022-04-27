import {Component} from "react"
import {RouteComponentProps,withRouter} from "react-router-dom"
import {connect} from "react-redux"
import "./TreasuryPage.scss"
import Template from "Components/MyDragonaire/Template"
import CurrencyStats from "Components/MyDragonaire/items/CurrencyStats"
import Switcher from "Components/MyDragonaire/items/Swither"
import StyledSelect from "Components/Common/StyledSelect"
import { Stack, MenuItem } from "@mui/material"
import {
    InfoStats,
    EavList,
    OrderList,
    Comment,
} from "Components/MyDragonaire/Treasury"
import BnbIcon from "Assets/Images/Icon/bnb.svg"
import DearIcon from "Assets/Images/Icon/dear_big.png"
import {
    TreasuryPageParent,
} from "./Containers"

interface DataType{
    amount: number,
    blockNumber: number,
    duration: number,
    eva: number,
    id: number,
}

interface Iprops extends  RouteComponentProps{
    TokenStakeListStore:DataType[],
}

class TreasuryPage extends Component<Iprops>{

    state = {
        selectedIndex: 0,
    }

    render(){
        const {
            TokenStakeListStore,
        } = this.props;
        const dearAmount = TokenStakeListStore.reduce<number>((prev,cur)=>{
            return prev += Number(cur.amount);
        },0);
        const eavAmount = TokenStakeListStore.reduce<number>((prev,cur)=>{
            return prev += Number(cur.eva);
        },0);
        console.log( TokenStakeListStore ) 
        return (
            <>
                <Stack spacing="25px">
                    <CurrencyStats />
                    <Switcher options={["DAO Treasury"]} selectedIndex={this.state.selectedIndex} select={i => this.setState({ selectedIndex: i })} />

                    {/*数字框*/}
                    <div className="mui-content">
                        <div className="mui-row">
                            <div className="mui-col-xs-4" style={{
                                display:"flex",
                                flexDirection:"column",
                                alignItems: "center",
                                justifyContent:"center",
                            }}>
                                <InfoStats {...Object.assign(
                                    {},
                                    {
                                        icon:DearIcon,
                                        amount:dearAmount,
                                        unit: "DARE"
                                    },
                                    {}
                                )}></InfoStats>
                            </div>
                            <div className="mui-col-xs-4" style={{
                                display:"flex",
                                flexDirection:"column",
                                alignItems: "center",
                                justifyContent:"center",
                            }}>
                                <InfoStats {...Object.assign(
                                    {},
                                    {
                                        icon:BnbIcon,
                                        amount:eavAmount,
                                        unit: "EAV"
                                    },
                                    {}
                                )}></InfoStats>
                            </div>
                        </div>
                        <div className="mui-row">
                            <div className="mui-col-xs-5" style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <OrderList></OrderList>
                            </div>
                            <div className="mui-col-xs-5" style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <EavList></EavList>
                            </div>
                        </div>
                        <div className="mui-row">
                            <Comment></Comment>
                        </div>
                    </div>

                </Stack>
            </>
        )
    }
}

export default connect(
    (store:any) => ({

    }),{

    }
)(  Template( TreasuryPageParent( withRouter(TreasuryPage) ) ) )
