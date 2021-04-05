import React from "react";
import userPhoto from "../../assets/images/User_icon.png";
import styles from "./users.module.css";
import axios from "axios";
import {UsersPropsType} from "./UsersContainer";
import {AppStateType} from "../../Redux/reduxStore";

//Не типизированы запросы!!!
class Users  extends React.Component<UsersPropsType, AppStateType>{
    // если конструктор только передает управление родительскому классу, то конструктор можно не писать
    // constructor(props: UsersPropsType) {
    //     super(props);
    // }

componentDidMount() {
    if(this.props.users.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {

            this.props.setUsers(response.data.items)
        })
    }
}

    render() {
        return (
            <div>
                <div>
                   <span className={styles.selectedPage}>1</span>
                   <span>2</span>
                   <span>3</span>
                   <span>4</span>
                   <span>5</span>
                </div>
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