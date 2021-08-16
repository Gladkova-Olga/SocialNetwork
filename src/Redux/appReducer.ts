import React from "react";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./reduxStore";
import {getAuthUserData} from "./authReducer";

type AppInitializedType = typeof initialState
type SetInitializedActionType = ReturnType<typeof initializedSuccessAC>
type ActionsType = SetInitializedActionType

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let initialState = {
    initialized: false
}
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

const appReducer = (state: AppInitializedType = initialState, action: ActionsType): AppInitializedType => {
    switch (action.type) {
        case "INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default:
            return state

    }
}


export const initializedSuccessAC = () => ({
    type: INITIALIZED_SUCCESS
} as const)

export const initializeApp = (): ThunkType =>
    (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
     let promise = dispatch(getAuthUserData())
        promise.then (() => {
            dispatch(initializedSuccessAC())
        })


    }

export default appReducer