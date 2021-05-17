import React from "react";
import {AppStateType} from "../../Redux/reduxStore";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, setAuthUserData} from "../../Redux/authReducer";

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
    userId: number | null
    email: string | null
}
type MapDispatchToPropsType = {
    // setAuthUserData: (userId: number | null, email: string | null, login:string | null) => void
    getAuthUserData: (userId: number | null, email: string | null, login:string | null) => any
}
export type HeaderAPIComponentPropsType = MapStateToPropsType & MapDispatchToPropsType


class HeaderContainer extends React.Component<HeaderAPIComponentPropsType, AppStateType> {
    componentDidMount() {
        this.props.getAuthUserData(this.props.userId, this.props.email, this.props.login)
        // authAPI.authMe()
        // axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        //     withCredentials: true
        // })
        //     .then(data => {
        //         if(data.resultCode === 0) {
        //             let {id, email, login} = data.data;
        //             this.props.setAuthUserData(id, email, login);
        //         }
        //     })
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
(mapStateToProps, {getAuthUserData}) (HeaderContainer);