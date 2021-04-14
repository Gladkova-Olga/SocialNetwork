import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/reduxStore";
import {ProfileUserType, setUserProfile} from "../../Redux/profileReducer";
import {RouteComponentProps, withRouter } from "react-router-dom";

type PathParamsType = {
    userId: string
}

type MapStateToPropsType = {
    profile: null | ProfileUserType
}
type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileUserType) =>void
}
export type ProfileAPIComponentPropsType = MapStateToPropsType & MapDispatchToPropsType
type PropsType = RouteComponentProps<PathParamsType> & ProfileAPIComponentPropsType


class ProfileContainer extends React.Component<PropsType>{

    componentDidMount() {
        let userId = +this.props.match.params.userId; //change type to number, because from PathParams we get string
        if(!userId) {
            userId = 2
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
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
let WithUrlDataContainerComponent =  withRouter(ProfileContainer);

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType >
(mapStateToProps,  {setUserProfile}) (WithUrlDataContainerComponent);

