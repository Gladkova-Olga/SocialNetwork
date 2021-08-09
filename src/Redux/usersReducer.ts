import {usersAPI} from "../api/api";
import {Dispatch} from "redux";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"


export type UserType = {
    id: number
    followed: boolean
    name: string
    status: string
    photos: {
        small: string | null
        large: string | null
    }
}
export type UsersPageType = typeof initialState

type ActionsType = ReturnType<typeof followSuccess> |
    ReturnType<typeof unfollowSuccess> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setTotalUsersCount> |
    ReturnType<typeof toggleIsFetching> |
    ReturnType<typeof toggleFollowingProgress>


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
}

const usersReducer = (state: UsersPageType = initialState, action: ActionsType): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)


            }
        }
        default:
            return state;
    }

}


export const followSuccess = (userID: number) => ({
    type: FOLLOW, userID
} as const);
export const unfollowSuccess = (userID: number) => ({type: UNFOLLOW, userID} as const);
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users} as const);
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const);
export const setTotalUsersCount = (totalCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalCount} as const);
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const);
export const toggleFollowingProgress = (isFetching: boolean, userID: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID,
} as const);

export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => { //thunk
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));

        })
    }
}

export const follow = (userID: number) => {
    return (dispatch: Dispatch) => { //thunk
       dispatch(toggleFollowingProgress(true, userID))
        usersAPI.followUser(userID)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(followSuccess(userID))
                }
               dispatch(toggleFollowingProgress(false, userID))
            })
    }
}

export const unfollow = (userID: number) => {
    return (dispatch: Dispatch) => { //thunk
        dispatch(toggleFollowingProgress(true, userID));
        usersAPI.unfollowUser(userID)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(unfollowSuccess(userID))
                }
                dispatch(toggleFollowingProgress(false, userID))
            })
    }
}


export default usersReducer;