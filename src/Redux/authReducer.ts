import {authAPI} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./reduxStore";
import {FormAction, stopSubmit} from "redux-form";



const SET_USER_DATA = 'SET_USER_DATA';

type ActionsType = ReturnType<typeof setAuthUserData>

type InitialStateType = {
    userId:  number | null
    email: null | string
    login: null | string
    isAuth: boolean
}
type ThunkType = ThunkAction<any, AppStateType, unknown, ActionsType>

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
}

export const setAuthUserData = (userId: number | null , email: string | null, login: string | null, isAuth: boolean) =>
    ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}} as const)

export const getAuthUserData = (): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
      return   authAPI.authMe()
            .then(data => {
                if (data.resultCode === 0) {
                    let { email, id, login} = data.data;
                    dispatch(setAuthUserData(id, email, login, true));
                }
            })
    }

}
export const login = (email: string, password: string, rememberMe: boolean, captcha: boolean | null): ThunkType => {

    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType | FormAction>) => {
        authAPI.login(email, password, rememberMe, captcha)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUserData());
                } else {
                  let message =  response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                    dispatch(stopSubmit("login", {_error: message}))
                }
            })
    }

}

export const logout = (): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null,null,null, false));
                }
            })
    }

}



