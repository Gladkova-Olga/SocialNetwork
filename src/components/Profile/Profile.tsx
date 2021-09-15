import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPost/Post/MyPostsContainer";
import {ProfileUserType} from "../../Redux/profileReducer";


type ProfilePropsType = {
    profile: null | ProfileUserType
    status: string
    updateUserStatus: (status: string) => any
}


const  Profile = (props: ProfilePropsType) => {
    console.log("profile")

    return (
        <div>
            <ProfileInfo profile = {props.profile} status={props.status} updateUserStatus={props.updateUserStatus}/>
            <MyPostsContainer
            />
        </div>
    )
}

export default Profile;

