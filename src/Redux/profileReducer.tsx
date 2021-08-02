import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";
import {toggleFollowingProgress, unfollowSuccess} from "./usersReducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'SET-USER-STATUS'

export type InitialStateType = {
    posts: Array<PostType>
    newPostText: string
    profile: null | ProfileUserType
    status: string

}
export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type ProfileUserType = {
    aboutMe: string
    fullName: string
    userID: number
    photos: {
        small: string | null
        large: string | null
    }
}


type ActionsTypes =
    ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof updateNewPostTextActionCreator> |
    ReturnType<typeof setUserProfile> |
    ReturnType<typeof setUserStatus>

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

const initialState: InitialStateType = {
    posts: [
        {id: 1, message: 'Hi! How are you?', likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 15},
    ],
    newPostText: '',
    profile: null,
    status: ""
}

// for this reducer state is state.profilePage, we give here only this part of state
const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: '',
            };

        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }


        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText: string) => ({
    type: ADD_POST,
    newPostText
} as const)
export const updateNewPostTextActionCreator = (newText: string) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText
} as const)
export const setUserProfile = (profile: ProfileUserType) => ({
    type: SET_USER_PROFILE,
    profile
} as const)
export const setUserStatus = (status: string) => ({
    type: SET_USER_STATUS,
    status
} as const)

export const getUserProfile = (userId: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => { //thunk
        profileAPI.getUserProfile(userId)
            .then(data => {
                dispatch(setUserProfile(data))
            })
    }
}

export const getUserStatus = (userId: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => { //thunk
        profileAPI.getUserStatus(userId)
            .then(response => {
                dispatch(setUserStatus(response.data))
            })
    }
}
export const updateUserStatus = (status: string): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) =>
    profileAPI.updateUserStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserStatus(status))
            }
        })
}

export default profileReducer;