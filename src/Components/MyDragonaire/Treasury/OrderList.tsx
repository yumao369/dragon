import {Component} from "react"
import {connect} from "react-redux"
import {RouteComponentProps,withRouter} from "react-router-dom"
import "./OrderList.scss"
import {
    OrderListParent,
} from "./Containers"
import StyledSelect, {MenuProps} from "Components/Common/StyledSelect"
import { MenuItem } from "@mui/material"
import InputComponent from "Components/Common/InputComponent"
import HandleBtn from "Components/Common/HandleBtn"
import {
    toStakeAction,
} from "Redux/Actions"

interface ActionType{
    toStakeAction: (param: {
        amount: number,
        planIndex: number,
    }) => Promise<boolean>,
    InitTokenStakeListAction: ()=>Promise<boolean>,
}

interface Iprops extends RouteComponentProps,ActionType{
    TokenStakeOptionStore: StakePlanType[],
}

class OrderList extends Component<Iprops>{

    state = {
        feedbackTypes: [
            {
                id: 0,
                state: 0,
                duration: 0,
                durationTitle: "",
                multiplierDecimals: 0,
                multiplier: 0,
                multiplierScale: 0,
            },
        ],
        feedbackTypeSelected: 0,
        stake_amount:"",
    }

    UNSAFE_componentWillMount(){
        const {
            TokenStakeOptionStore,
        } = this.props;
        this.setState({
            feedbackTypes: TokenStakeOptionStore
        },()=>{
            console.log( this.state )
        });
    }

    render(){
        const {
            feedbackTypes,
            feedbackTypeSelected,
            stake_amount
        } = this.state;
        return (
            <>
                <div className="mui-content OrderListComponent">
                    <div className="mui-row OrderListComponentRow">
                        <div className="mui-col-xs-12 OrderListComponentRowColTitle">
                            StakeOrder
                        </div>
                        <div className="mui-col-xs-12 OrderListComponentRowCol">
                            <div className="scrollbars"  style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}>
                                {/*选择框*/}
                                <StyledSelect MenuProps={MenuProps} value={feedbackTypeSelected} onChange={(event)=>{
                                    this.setState({
                                        feedbackTypeSelected: event.target.value
                                    },()=>{
                                        console.log(feedbackTypeSelected)
                                    })
                                }} style={{ marginTop: "5px", width: "187px", height: "37px", border: "1px solid #444B48" }}>
                                    {feedbackTypes.map(op => <MenuItem key={op.id} value={op.id}>{op.durationTitle}</MenuItem>)}
                                </StyledSelect>
                                {/*选择框*/}
                                <InputComponent {...Object.assign(
                                    {},
                                    {
                                        title:"Stake Amount",
                                        name: "stake_amount",
                                        value: stake_amount,
                                    },
                                    {
                                        handleChange: (Obj:any)=>{
                                            this.setState({
                                                [Obj.name]: Math.abs( isNaN(Number(Obj.value)) ? 0 : Obj.value ),
                                            })
                                        }
                                    }
                                )}></InputComponent>
                                <HandleBtn {...Object.assign(
                                    {},
                                    {
                                        title: "Stake"
                                    },
                                    {
                                        toHandle: async()=>{
                                            /*
                                            {
                                                amount:stake_amount as any as number,
                                                planIndex:feedbackTypeSelected,
                                            }
                                            */
                                            await this.props.toStakeAction({
                                                amount: stake_amount as any as number,
                                                planIndex: feedbackTypeSelected
                                            })
                                            await this.props.InitTokenStakeListAction()
                                        }
                                    }
                                )}></HandleBtn>
                            </div>
                        </div>
                    </div>    
                </div>               
            </>
        )
    }

}

export default connect(
    store=>({

    }),
    {

    }
)( OrderListParent( withRouter( OrderList ) ) )