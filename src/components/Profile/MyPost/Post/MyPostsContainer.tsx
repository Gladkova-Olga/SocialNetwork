import React from "react";

import {
    addPostActionCreator, PostType, ProfilePageType,
    updateNewPostTextActionCreator
} from "../../../../Redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../../Redux/reduxStore";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    posts: Array<PostType>
    newPostText: string

}
type MapDispatchToPropsType = {
    updateNewPostText: (newText: string) => void
    addPost: (newText: string) => void
}


let mapStateToProps = (state: AppStateType): MapStateToPropsType  => ({
    newPostText: state.profilePage.newPostText,
    posts: state.profilePage.posts
})

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
    updateNewPostText: (newText: string) => {
        dispatch(updateNewPostTextActionCreator(newText));
    },
    addPost: (newText: string) => {
        dispatch(addPostActionCreator(newText));
    }
})

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;