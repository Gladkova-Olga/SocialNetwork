import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/User_icon.png";
import {UserType} from "../../Redux/usersReducer";
import {NavLink} from "react-router-dom";
import Paginator from "../common/paginator/Paginators";


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
        <div>
            <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}
                       currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>
            {props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.unfollow(u.id);
                                }}>Unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.follow(u.id);
                                }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                         <span>
                             <div>{u.name}</div><div>{u.status}</div>
                         </span>
                           <span>
                             <div>{"u.location.country"}</div>
                               <div>{"u.location.city"}</div>
                         </span>
                    </span>
                </div>
            )
            }
        </div>
    )
}

export default Users