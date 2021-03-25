import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPost/Post/MyPostsContainer";


type ProfileType = {
}


function Profile(props: ProfileType) {

    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer
            />
        </div>
    )
}

export default Profile;

