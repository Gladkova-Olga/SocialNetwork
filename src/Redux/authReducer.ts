import {UsersPageType} from "./usersReducer";
import {PostType} from "./profileReducer";


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

export const setAuthUserData = (userId: number, email: string, login:string) =>
    ({type: SET_USER_DATA, data: {userId, email, login}} as const)

