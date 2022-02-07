import {PhotosType, profileAPI} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./reduxStore";
import {ProfileDataFormType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import {FormAction, stopSubmit} from "redux-form";
import {setAppError, SetAppErrorType, setError} from "./appReducer";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE';
const SET_USER_STATUS = 'profile/SET-USER-STATUS';
const DELETE_POST = 'profile/DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

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
export type ContactsType = {
    facebook: null | string
    website: null | string
    vk: null | string
    twitter: null | string
    instagram: null | string
    youtube: null | string
    github: null | string
    mainLink: null | string
}
export type ProfileUserType = {
    aboutMe: {
        aboutMe: null | string
    }
    contacts: ContactsType
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: null | string
    photos: {
        small: null | string
        large: null | string
    }
    userId: number
}

type ActionsTypes =
    ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof setUserProfile> |
    ReturnType<typeof setUserStatus> |
    ReturnType<typeof deletePost> |
    ReturnType<typeof savePhotoSuccess> |
    SetAppErrorType

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
                // newPostText: '',
            };

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
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            if (state.profile) {
                return {
                    ...state,
                    profile: {...state.profile, photos: action.photos}
                }
            }
            return {...state}
        }

        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText: string) => ({
    type: ADD_POST,
    newPostText
} as const)
export const setUserProfile = (profile: ProfileUserType) => ({
    type: SET_USER_PROFILE,
    profile
} as const)
export const setUserStatus = (status: string) => ({
    type: SET_USER_STATUS,
    status
} as const)
export const deletePost = (postId: number) => ({
    type: DELETE_POST,
    postId
} as const)
export const savePhotoSuccess = (photos: PhotosType) => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
} as const)


export const getUserProfile = (userId: number | null): ThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => { //thunk
        const response = await profileAPI.getUserProfile(userId)
        dispatch(setUserProfile(response))
    }
}

export const getUserStatus = (userId: number | null): ThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => { //thunk
        const response = await profileAPI.getUserStatus(userId)
        dispatch(setUserStatus(response.data))
    }
}

export const updateUserStatus = (status: string): ThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
        try {
            const response = await profileAPI.updateUserStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setUserStatus(status))
            }
        } catch {
            dispatch(setError("some error occurred"))
        }

    }
}

export const savePhoto = (file: File, userId: number | null): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data));
        dispatch(getUserProfile(userId));
    }
}

export const saveProfile = (profile: ProfileDataFormType): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes | FormAction>, getState) => {
        const userId = getState().auth.userId
        const response = await profileAPI.saveProfile(profile);
        if (response.data.resultCode === 0) {
            dispatch(saveProfile(response.data.data));
            dispatch(getUserProfile(userId));
        } else {
            dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
            return Promise.reject(response.data.messages[0]);
        }
    }


export default profileReducer;