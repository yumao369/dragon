import {Component,ComponentType} from "react"
import {RouteComponentProps,withRouter} from "react-router-dom"
import {connect} from "react-redux"
import "./OrderListParent.scss"
import CircularProgress from '@mui/material/CircularProgress';
import {
    InitTokenStateOptionAction,
    toStakeAction,
    InitTokenStakeListAction,
} from "Redux/Actions"

interface SonProps{
    TokenStakeOptionStore: StakePlanType[],
    toStakeAction: (param:{
        amount: number,
        planIndex: number,
    })=>Promise<boolean>,
    InitTokenStakeListAction: ()=>Promise<boolean>,
}

interface Iprops extends RouteComponentProps,SonProps{
    InitTokenStateOptionAction : ()=>Promise<boolean>,
}


export const OrderListParent = (SonComponent:ComponentType<SonProps>)=>{

    class PackageComponent extends Component<Iprops>{

        state = {
            InitTokenStateOptionActionStatus: false,
        }

        async UNSAFE_componentWillMount(){
            const InitTokenStateOptionActionStatus = await this.props.InitTokenStateOptionAction();
            this.setState({
                InitTokenStateOptionActionStatus,
            })
        }


        render(){
            const {
                InitTokenStateOptionActionStatus,
            } = this.state;
            const loading = InitTokenStateOptionActionStatus ? true : false;
            return (
                <>
                    <div className="mui-content OrderListParentContainer">
                        <div className="mui-row OrderListParentContainerRow">
                            <div className="mui-col-xs-12 OrderListParentContainerRowCol">
                                {
                                    loading ? (
                                        <SonComponent {...Object.assign(
                                            {},
                                            {
                                                ...this.props,
                                            },
                                            {

                                            }
                                        )}></SonComponent>
                                    ) : (
                                        <CircularProgress />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </>
            )
        }

    }

    return connect(
        (store:any)=>({
            TokenStakeOptionStore: store.TokenStakeOptionStore,
        }),{
            InitTokenStateOptionAction,
            toStakeAction,
            InitTokenStakeListAction,
        }
    )( withRouter( PackageComponent ) )

}