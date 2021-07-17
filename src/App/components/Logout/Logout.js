import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {logout} from '../../redux/actions/auth'

import  React, { Component }from "react"


class Logout extends Component{
    componentDidMount() {
        this.props.logout()
    }
    render() {
        return <Redirect to={'/'}/>
    }
}

function mDTP(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mDTP) (Logout)