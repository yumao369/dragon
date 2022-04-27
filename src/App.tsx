import { Component } from "react"
import { WithInitApp } from "./Containers"
import * as pages from "./Pages"
import { Switch, Route, Redirect } from "react-router-dom"
import { menuConfig, defaultPath } from "Constants/RouterConfig";
import { connect } from "react-redux";
class App extends Component {
  render () {
    //console.log( menus )
    return (
      <>
        <Switch>
          {
            menuConfig.map(elm => {
              return (
                elm.redirect 
                ? (<Redirect key={elm.path} to={elm.redirect} exact path={elm.path}/>)
                : (<Route key={elm.path} exact path={elm.path} component={(pages as any)[elm.component]}/>)
              )
            })
          }
          <Redirect to={defaultPath}/>
        </Switch>
      </>
    );
  }
}

export default WithInitApp(App)