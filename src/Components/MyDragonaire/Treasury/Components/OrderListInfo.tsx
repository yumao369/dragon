import {Component} from "react"
import {connect} from "react-redux"
import {RouteComponentProps,withRouter} from "react-router-dom"
import "./OrderListInfo.scss"
import {
    unStakeAction,
    InitTokenStakeListAction,
} from "Redux/Actions"

interface ActionType{
    unStakeAction: (param:{id:number})=>Promise<boolean>,
    InitTokenStakeListAction: ()=>Promise<boolean>,
}

interface Iprops extends RouteComponentProps,ActionType{
    amount: number,
    blockNumber: number,
    duration: number,
    eva: number,
    id: number,
}

class OrderListInfo extends Component<Iprops>{

    render(){
        const {
            amount,
            blockNumber,
            duration,
            eva,
            id,
        } = this.props;
        return (
            <>
                <div className="mui-content" style={{
                    height:"50px",
                    fontSize:"13px",
                    fontFamily:"Avenir,Helvetica Neue,Arial,Helvetica,sans-serif",
                    fontWeight:"500",
                }}>
                    <div className="mui-row" style={{
                        height:"50px",
                        borderBottom: "1px dashed #1F392B",
                    }}>
                        <div className="mui-col-xs-3" style={{
                            height:"100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            overflow:"hidden",
                        }}>
                            {duration == 0 ? "ACTIVE": `${duration} Days`}
                        </div>
                        <div className="mui-col-xs-3" style={{
                            height:"100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            overflow:"hidden",
                        }}>
                            {amount}
                        </div>
                        <div className="mui-col-xs-3" style={{
                            height:"100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            overflow:"hidden",
                        }}>
                            {eva}
                        </div>
                        <div className="mui-col-xs-3" style={{
                            height:"100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            overflow:"hidden",
                        }}>
                            <button 
                                type="button" 
                                className="mui-btn mui-btn-success"
                                style={{
                                    fontSize:"6px",
                                }}
                                onClick={async()=>{
                                    await this.props.unStakeAction({id});
                                    await this.props.InitTokenStakeListAction();
                                }}
                            >UnStake</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default connect(
    (store:any)=>({

    }),{
        unStakeAction,
        InitTokenStakeListAction,
    }
)( withRouter( OrderListInfo ) )

