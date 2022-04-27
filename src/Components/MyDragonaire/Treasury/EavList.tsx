import {Component} from "react"
import {connect} from "react-redux"
import {RouteComponentProps,withRouter} from "react-router-dom"
import "./EavList.scss"
import {
    EavListParent
} from "./Containers"
import {
    OrderListInfo,
} from "./Components"

interface Iprops extends RouteComponentProps{
    TokenStakeOptionStore: StakePlanType[],
    TokenStakeListStore: any[],
}

class EavList extends Component<Iprops>{

    render(){
        const {
            TokenStakeOptionStore,
            TokenStakeListStore
        } = this.props;
        return (
            <>
                <div className="mui-content EavListComponent">
                    <div className="mui-row EavListComponentRow">
                        <div className="mui-col-xs-12 EavListComponentRowColTitle">
                            StakeList
                        </div>
                        <div className="mui-col-xs-12 EavListComponentRowCol">
                            <div className="scrollbars">
                                {
                                    TokenStakeListStore.map((row)=>{
                                        return (
                                            <OrderListInfo key={row.id} {...Object.assign(
                                                {
                                                    ...row
                                                },
                                                {},
                                                {}
                                            )}></OrderListInfo>
                                        )
                                    } )
                                }
                            </div>
                        </div>
                    </div>    
                </div>               
            </>
        )
    }

}

export default connect(
    (store:any)=>({

    }),
    {

    }
)( EavListParent( withRouter( EavList ) ) )