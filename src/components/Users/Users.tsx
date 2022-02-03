import React from "react";
import {UserType} from "../../Redux/usersReducer";
import Paginator from "../common/paginator/Paginators";
import User from "./User";
import s from "./Users.module.scss"



export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    followingInProgress: Array<number>
}

function Users(props: UsersPropsType) {

    return (
        <div className={s.usersContainer}>
            <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                       currentPage={props.currentPage} onPageChanged={props.onPageChanged} portionSize = {10}/>
            {props.users.map(u => <User key={u.id}
                                        user={u}
                                        follow={props.follow}
                                        unfollow={props.unfollow}
                                        followingInProgress={props.followingInProgress}
                                        />)}

        </div>
    )
}

export default Users