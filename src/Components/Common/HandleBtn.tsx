import {Component} from "react"
import {connect} from "react-redux"
import {RouteComponentProps,withRouter} from "react-router-dom"

interface Iprops extends RouteComponentProps{
    title: string,
    toHandle: ()=>void
}

class HandleBtn extends Component<Iprops>{

    render(){
        const {
            title = "stake",
            toHandle = ()=>{
                console.log("提交成功")
            }
        } = this.props;
        return (
            <>
                <div className="mui-content" style={{
                    height: "60px",
                    width: "100%",
                }}>
                    <div className="mui-row">
                        <div className="mui-col-xs-12" style={{
                            height:"60px",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <button type="button" className="mui-btn" style={{
                                width:"185px",
                                background:"linear-gradient(90deg, rgb(255, 182, 49), rgb(216, 139, 39))",
                                fontSize:"16px",
                                fontWeight:"800",
                                color:"#FFF"
                            }} onClick={()=>{
                                toHandle();
                            }}>{title}</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default connect()( withRouter( HandleBtn ) )