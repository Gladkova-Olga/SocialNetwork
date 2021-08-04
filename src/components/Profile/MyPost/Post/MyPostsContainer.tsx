import React from "react";

import {addPostActionCreator, PostType,
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

    addPost: (newText: string) => void
}


let mapStateToProps = (state: AppStateType): MapStateToPropsType  => ({
    newPostText: state.profilePage.newPostText,
    posts: state.profilePage.posts
})

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
    addPost: (newPostText: string) => {
        dispatch(addPostActionCreator(newPostText));
    }
})

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;