import {Component,ComponentType} from "react"
import {RouteComponentProps,withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {
    InitTokenStakeListAction,
} from "Redux/Actions"
import CircularProgress from '@mui/material/CircularProgress';

interface SonIprops{
    TokenStakeListStore: any[],
}

interface Iprops extends RouteComponentProps,SonIprops{
    InitTokenStakeListAction: ()=>Promise<boolean>,
}

export const TreasuryPageParent = (SonComponent:ComponentType<SonIprops>)=>{

    class PackageComponent extends Component<Iprops>{

        state = {
            InitTokenStakeListActionStatus: false,
        }

        async UNSAFE_componentWillMount(){
            const InitTokenStakeListActionStatus = await this.props.InitTokenStakeListAction();
            this.setState({
                InitTokenStakeListActionStatus,
            })
        }

        render(){
            const {
                InitTokenStakeListActionStatus,
            } = this.state;
            const loading = InitTokenStakeListActionStatus ? true : false;
            return (
                <>
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
                            <div style={{
                                height:"100%",
                                width:"100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <CircularProgress />
                            </div>
                            
                        )
                    }
                </>
            )
        }

    }

    return connect(
        (store:any) => ({
            TokenStakeListStore: store.TokenStakeListStore,
        }),{
            InitTokenStakeListAction,
        }
    )( withRouter( PackageComponent ) )

}