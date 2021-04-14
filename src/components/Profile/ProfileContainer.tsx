import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/reduxStore";
import {ProfileUserType, setUserProfile} from "../../Redux/profileReducer";
import { withRouter } from "react-router-dom";

type MapStateToPropsType = {
    profile: null | ProfileUserType
}
type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileUserType) =>void
}
export type ProfileAPIComponentPropsType = MapStateToPropsType & MapDispatchToPropsType


class ProfileContainer extends React.Component<ProfileAPIComponentPropsType>{
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        )
    }

}
let mapStateToProps = (state: AppStateType): MapStateToPropsType  =>({
    profile: state.profilePage.profile

})


export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType >
(mapStateToProps,  {setUserProfile}) (ProfileContainer);

