import {AppStateType} from "./reduxStore";
import {UserType} from "./usersReducer";
import {createSelector} from "reselect";


const getUsers = (state: AppStateType): Array<UserType> => {
    return state.usersPage.users
}

export const getUsersSelector = createSelector(getUsers,
    (users: Array<UserType>) =>{
    return users // here we can do something complex thing, but without changing of dependencies, there aren't rendering
    })



export const getPageSize = (state: AppStateType): number => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType): number => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType): number => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType): boolean => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppStateType): Array<number> => {
    return state.usersPage.followingInProgress
}