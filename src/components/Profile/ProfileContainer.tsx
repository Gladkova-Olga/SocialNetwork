import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/reduxStore";
import {getUserProfile, ProfileUserType} from "../../Redux/profileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


type PathParamsType = {
    userId: string
}
type MapStateToPropsType = {
    profile: null | ProfileUserType
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => any
}
export type ProfileAPIComponentPropsType = MapStateToPropsType & MapDispatchToPropsType
type PropsType = RouteComponentProps<PathParamsType> & ProfileAPIComponentPropsType


class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = +this.props.match.params.userId; //change type to number, because from PathParams we get string
        if (!userId) {
            userId = 2
        }
        this.props.getUserProfile(userId);
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        )
    }

}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile

})
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default withAuthRedirect(connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent));

