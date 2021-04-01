import React from "react";
import userPhoto from "../../assets/images/User_icon.png";
import styles from "./users.module.css";
import axios from "axios";
import {UsersPropsType} from "./UsersContainer";
import {AppStateType} from "../../Redux/reduxStore";

//Не типизированы запросы!!!
class Users  extends React.Component<UsersPropsType, AppStateType>{
    constructor(props: UsersPropsType) {
        super(props);
        if(this.props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {

                this.props.setUsers(response.data.items)
            })
        }


    }
    getUsers = () => {

    }
    render() {
        return (
            <div>
                {
                    this.props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small  ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {this.props.unfollow(u.id)}}>Unfollow</button> :
                                <button onClick={() => {this.props.follow(u.id)}}>Follow</button>}

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

}


export default Users;