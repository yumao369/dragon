import {Component} from "react"
import {RouteComponentProps,withRouter} from "react-router-dom"
import {connect} from "react-redux"
import { Box, Stack } from "@mui/material"
import { formatNumber } from "Common/functions"

interface Iprops extends RouteComponentProps{
    icon: string;
    amount: number;
    unit: string;
}

const styles: Styles = {
    currencyItem: {
      border: "1px solid #2E6242",
      borderRadius: "3px",
      width: "231px",
      height: "48px",
      paddingLeft: "12px",
    },
    icon: {
      width: "22px",
      height: "22px",
    },
    amount: {
      color: "#bbbbbb",
      fontSize: "18px",
    },
    unit: {
      color: "white",
      fontWeight: "bold",
      fontSize: "18px",
    },
  
}

class InfoStats extends Component<Iprops>{

    render(){
        const {
            icon,
            amount,
            unit,
        } = this.props;
        return (
            <>
                <Box style={styles.currencyItem}>
                <Stack direction="row" style={{ height: "100%" }} alignItems="center" spacing="8px">
                    <img src={icon} alt="icon" style={styles.icon} />
                    <span style={styles.amount}>{formatNumber(amount)}</span>
                    <span style={styles.unit}>{unit}</span>
                </Stack>
                </Box>
            </>
        )
    }

}

export default connect(
    store => ({

    }),{

    }
)( withRouter( InfoStats ) )