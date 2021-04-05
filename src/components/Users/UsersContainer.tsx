import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../Redux/reduxStore";
import {
    followAC,
    setUCurrentPageAC,
    setUsersAC,
    setUsersTotalCountAC,
    unfollowAC,
    UsersPageType,
    UserType
} from "../../Redux/usersReducer";
import Users from "./Users";

type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
}
type MapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: any) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
}
export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => { //state of all application
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => { //dispatch: Dispatch(from Redux)
    return {
        follow: (userID: number) => {
            dispatch(followAC(userID));
        },
       unfollow: (userID: number) => {
            dispatch(unfollowAC(userID));
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setUCurrentPageAC(pageNumber));
    },
        setTotalUsersCount: (totalCount:number) => {
            dispatch(setUsersTotalCountAC(totalCount));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Users)