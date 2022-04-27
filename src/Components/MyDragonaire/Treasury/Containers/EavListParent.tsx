import {Component,ComponentType} from "react"
import {RouteComponentProps,withRouter} from "react-router-dom"
import {connect} from "react-redux"
import "./EavListParent.scss"
import CircularProgress from '@mui/material/CircularProgress';
import {
    InitTokenStateOptionAction,
    InitTokenStakeListAction,
} from "Redux/Actions"

interface SonProps{
    TokenStakeOptionStore: StakePlanType[],
    TokenStakeListStore: any[]
}

interface Iprops extends RouteComponentProps,SonProps{
    InitTokenStateOptionAction : ()=>Promise<boolean>,
    InitTokenStakeListAction: ()=>Promise<boolean>,
}


export const EavListParent = (SonComponent:ComponentType<SonProps>)=>{

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
                    <div className="mui-content EavListParentContainer">
                        <div className="mui-row EavListParentContainerRow">
                            <div className="mui-col-xs-12 EavListParentContainerRowCol">
                                {
                                    loading ? (
                                        <SonComponent {...Object.assign(
                                            {
                                                ...this.props,
                                            },
                                            {
                                            },
                                            {}
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
            TokenStakeListStore: store.TokenStakeListStore,
        }),{
            InitTokenStateOptionAction,
            InitTokenStakeListAction,
        }
    )( withRouter( PackageComponent ) )

}