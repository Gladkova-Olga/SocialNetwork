import React from "react";
import styles from "./User.module.scss";
import userPhoto from "../../assets/images/User_icon.png";
import {UserType} from "../../Redux/usersReducer";
import {NavLink} from "react-router-dom";
import styleBtn from '../../styles/common/Btn.module.scss'


export type UserPropsType = {
    user: UserType
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    followingInProgress: Array<number>
}

function User({user, followingInProgress, unfollow, follow}: UserPropsType) {

    return (
        <div className={styles.userContainer}>
            <div className={styles.userBlock}>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small ? user.photos.small : userPhoto} className={styles.userPhoto}/>
                </NavLink>
                <span className={styles.userInfo}>
                    <div className={styles.userName}>{user.name}</div>
                    <div className={styles.userStatus}>{user.status}</div>
                    <div>
                {user.followed
                    ? <button className={styleBtn.btn}
                              disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  unfollow(user.id);
                              }}>Unfollow
                    </button>
                    : <button className={styleBtn.btn}
                              disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  follow(user.id);
                              }}>Follow
                    </button>}
            </div>
                </span>

            </div>


        </div>


    )
}

export default User