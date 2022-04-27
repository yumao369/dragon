import {Component} from "react"
import {connect} from "react-redux"
import {RouteComponentProps,withRouter} from "react-router-dom"
import {TextField} from '@mui/material';
import "./InputComponent.scss"
import { withStyles, WithStyles } from '@mui/styles';

const styles = {
    root: {
        "& textField": {
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',            
            paddingBottom: 0,
            marginTop: 0,
            fontWeight: 500,
        },
        "& input": {
            fontSize:"16px",
            background:"#1F392B",
            color: '#FFF',
            fontWeight:"600",
            borderColor:"rgba(118, 118, 118)",
        },
    },
};

type PropDataType = {
    title: string,
    name: string,
    value: string,
}

interface Iprops extends RouteComponentProps,PropDataType,WithStyles<typeof styles>{
    handleChange: (Obj:PropDataType)=>void
}


class InputComponent extends Component<Iprops>{

    render(){
        const {
            classes,
            title = "title",
            name = "name",
            value = "",
            handleChange = (Obj:PropDataType)=>{
                console.log( Obj )
            }
        } = this.props;
        return (
            <>
                <div className="mui-content InputComponent">
                    <div className="mui-row InputComponentRow">
                        <div className="mui-col-xs-12 InputComponentRowCol" style={{
                            height:"70px",
                            width:"185px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <TextField 
                                className={classes.root}
                                label={title}
                                size="small"
                                color="info"
                                fullWidth
                                name={name} 
                                value={value} 
                                onChange={(event)=>{
                                    const Obj:PropDataType = {
                                        title,
                                        name,
                                        value: event.target.value
                                    } 
                                    handleChange(Obj);
                                }} 
                                variant="outlined" 
                            />
                        </div>
                    </div>
                </div>

            </>
        )
    }

}

export default connect(
    (store) => ({

    }),{

    }
)( withStyles(styles)( withRouter( InputComponent ) ) )