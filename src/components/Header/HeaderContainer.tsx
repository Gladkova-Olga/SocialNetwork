import React from "react";
import {AppStateType} from "../../Redux/reduxStore";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, logout, setAuthUserData} from "../../Redux/authReducer";

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
    userId: number | null
    email: string | null
}
type MapDispatchToPropsType = {
    getAuthUserData: (userId: number | null, email: string | null, login:string | null) => any
    logout: () => any
}
export type HeaderAPIComponentPropsType = MapStateToPropsType & MapDispatchToPropsType


class HeaderContainer extends React.Component<HeaderAPIComponentPropsType, AppStateType> {
    componentDidMount() {
        this.props.getAuthUserData(this.props.userId, this.props.email, this.props.login)
    }

    render() {
        return (
            <Header {...this.props}/>
        )
    }}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    email: state.auth.email,
    userId: state.auth.userId


})

export default connect<MapStateToPropsType, MapDispatchToPropsType,{}, AppStateType >
(mapStateToProps, {getAuthUserData, logout}) (HeaderContainer);