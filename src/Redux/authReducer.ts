import {toggleFollowingProgress, unfollowSuccess, UsersPageType} from "./usersReducer";
import {PostType} from "./profileReducer";
import {Dispatch} from "redux";
import {authAPI, usersAPI} from "../api/api";


const SET_USER_DATA = 'SET_USER_DATA';

type ActionsType = ReturnType<typeof setAuthUserData>

type InitialStateType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
}

let initialState: InitialStateType= {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

export const authReducer = (state:InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            };

        default:
            return state;
    }
}

export const setAuthUserData = (userId: number | null, email: string | null , login:string | null) =>
    ({type: SET_USER_DATA, data: {userId, email, login}} as const)

export const setAuth = () => {
    return     (dispatch: Dispatch) => {
        authAPI.authMe()
            .then(data => {
                if(data.resultCode === 0) {
                    let {userId, email, login} = data.data;
                    dispatch(setAuthUserData(userId, email, login)) ;
                }
            })
    }

}





