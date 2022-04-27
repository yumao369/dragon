import {Component} from "react"
import {withRouter,RouteComponentProps} from "react-router-dom"
import {connect} from "react-redux"
import "./Comment.scss"
import Typist from "react-typist"

interface Iprops extends RouteComponentProps{

}

class Comment extends Component<Iprops>{

    render(){
        return (
            <>
                <div className="mui-content TreasuryCommentPage" style={{
                    width:"90%",
                    marginLeft:"5%",
                }}>
                    <div className="mui-row">
                        <div className="mui-col-xs-12" style={{
                            height:"60px",
                            paddingTop:"20px",
                            lineHeight:"40px",
                            fontSize:"16px",
                            fontWeight:"600"
                        }}>
                            COMMENT
                        </div>
                    </div>
                    <Typist startDelay={500} cursor={{
                      show: false,
                    }}>
                        <ul>
                            <li>The pledge determines the daily point output according to the time;</li>
                            <li>After the pledge period ends, the tokens will be returned in full, and the pledge certificate will disappear.</li>
                            <li>After the pledge is successful, the governance points will be obtained at one time;</li>
                            <li>Governance points are used for community governance voting;</li>
                            <li>Governance points decay with this realization and eventually return to zero;</li>
                            <li>The governance points can only be released when the governance points are reset to zero.</li>
                        </ul>
                    </Typist>
                </div>
            </>
        )
    }

}

export default connect(
    (store:any)=>({

    }),{

    }
)( withRouter( Comment ) )