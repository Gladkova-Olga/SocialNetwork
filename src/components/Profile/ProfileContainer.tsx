import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/reduxStore";
import {
    getUserProfile,
    getUserStatus,
    ProfileUserType,
    savePhoto,
    saveProfile,
    updateUserStatus
} from "../../Redux/profileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileDataFormType} from "./ProfileInfo/ProfileDataForm";


type PathParamsType = {
    userId: string
}
type MapStateToPropsType = {
    profile: null | ProfileUserType
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: number | null) => any
    getUserStatus: (userId: number | null) => any
    updateUserStatus: (status: string) => any
    savePhoto: (e: File, userId: number | null) => void
    saveProfile: (formData: ProfileDataFormType) => any
}
export type ProfileAPIComponentPropsType = MapStateToPropsType & MapDispatchToPropsType
type PropsType = RouteComponentProps<PathParamsType> & ProfileAPIComponentPropsType


class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId; //change type to number, because from PathParams we get string
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {

        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }

    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}
                     isOwner = {!this.props.match.params.userId}
                     savePhoto={this.props.savePhoto}
                     authorizedUserId = {this.props.authorizedUserId}
                     saveProfile = {this.props.saveProfile}
            />
        )
    }

}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
    (mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)


