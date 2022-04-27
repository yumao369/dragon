import {Component} from "react"
import {connect} from "react-redux"
import {RouteComponentProps,withRouter} from "react-router-dom"
import "./PointList.scss"

interface Iprops extends RouteComponentProps{

}

class PointList extends Component<Iprops>{

    render(){
        return (
            <>
                <div className="mui-content PointListComponent">
                    <div className="mui-row PointListComponentRow">
                        <div className="mui-col-xs-12 PointListComponentRowColTitle">
                            PointList
                        </div>
                        <div className="mui-col-xs-12 PointListComponentRowCol">
                            <div className="scrollbars">
                                <h1>balabala....</h1>
                                <h1>balabala....</h1>
                                <h1>balabala....</h1>
                                <h1>balabala....</h1>
                                <h1>balabala....</h1>
                                <h1>balabala....</h1>
                                <h1>balabala....</h1>
                                <h1>balabala....</h1>
                                <h1>balabala....</h1>
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
)( withRouter( PointList ) )