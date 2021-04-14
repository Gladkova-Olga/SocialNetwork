import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPost/Post/MyPostsContainer";
import {ProfileUserType} from "../../Redux/profileReducer";

type ProfilePropsType = {
    profile: null | ProfileUserType
}


const  Profile = (props: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo profile = {props.profile}/>
            <MyPostsContainer
            />
        </div>
    )
}

export default Profile;

