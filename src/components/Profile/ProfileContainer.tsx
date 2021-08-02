import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/reduxStore";
import {getUserProfile, getUserStatus, ProfileUserType, updateUserStatus} from "../../Redux/profileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


type PathParamsType = {
    userId: string
}
type MapStateToPropsType = {
    profile: null | ProfileUserType
    status: string
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => any
    getUserStatus: (userId: number) => any
    updateUserStatus: (status: string) => any
}
export type ProfileAPIComponentPropsType = MapStateToPropsType & MapDispatchToPropsType
type PropsType = RouteComponentProps<PathParamsType> & ProfileAPIComponentPropsType


class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = +this.props.match.params.userId; //change type to number, because from PathParams we get string
        if (!userId) {
            userId = 16018
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);

    }

    render() {
        return (
            <Profile profile={this.props.profile}
                     status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}/>
        )
    }

}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status

})

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
    (mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)


