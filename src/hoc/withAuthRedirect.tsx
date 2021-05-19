import React, {ComponentType} from "react";
import { Redirect } from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/reduxStore";

type mapStateToPropType = {
    isAuth: boolean
}
const mapStateToProps = (state: AppStateType ): mapStateToPropType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: mapStateToPropType) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) {
            return <Redirect to={ "/login"}/>
        }
        return <Component {...restProps as T}/>
    }

    let ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)
    return ConnectedRedirectComponent
}