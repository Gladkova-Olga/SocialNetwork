import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPost/Post/MyPostsContainer";
import {ProfileUserType} from "../../Redux/profileReducer";


type ProfilePropsType = {
    profile: null | ProfileUserType
    status: string
    updateUserStatus: (status: string) => any
    isOwner: boolean
    savePhoto: (e: any, userId: number | null) => void
    authorizedUserId: number | null
}


const  Profile = (props: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo profile = {props.profile} status={props.status} updateUserStatus={props.updateUserStatus}
            isOwner = {props.isOwner} savePhoto={props.savePhoto} authorizedUserId={props.authorizedUserId}/>
            <MyPostsContainer
            />
        </div>
    )
}

export default Profile;

