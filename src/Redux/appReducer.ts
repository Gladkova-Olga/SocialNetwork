import React from "react";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./reduxStore";
import {getAuthUserData} from "./authReducer";

type AppInitializedType = typeof initialState
type SetInitializedActionType = ReturnType<typeof initializedSuccessAC>
export type SetAppErrorType = ReturnType<typeof setAppError>
type ActionsType = SetInitializedActionType | SetAppErrorType

const INITIALIZED_SUCCESS = "APP/INITIALIZED_SUCCESS";
const SET_APP_ERROR = "APP/SET_APP_ERROR"

let initialState = {
    initialized: false,
    error: null as null | string
}
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

const appReducer = (state: AppInitializedType = initialState, action: ActionsType): AppInitializedType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case SET_APP_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state

    }
}


export const initializedSuccessAC = () => ({
    type: INITIALIZED_SUCCESS
} as const)

export const setAppError = (error: null | string) => ({
    type: SET_APP_ERROR,
    error
} as const)

export const initializeApp = (): ThunkType =>
    (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        let promise = dispatch(getAuthUserData())
        promise.then(() => {
            dispatch(initializedSuccessAC())
        })
}
export const setError = (error: null | string):ThunkType =>
    (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>)  => {
        dispatch(setAppError(error));
        alert(error);
        dispatch(setAppError(null));
}
export default appReducer;





