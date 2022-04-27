import React from "react"

export default class Spacer extends React.Component<{
    width?: string; 
    height?: string;
}> {
    render() {
        return (
            <div style={{
                width: this.props?.width ?? "auto",
                height: this.props?.height ?? "auto",
            }}></div>
        )
    }
}