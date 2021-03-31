import React from "react";
import {UsersPropsType} from "./UsersContainer";
import styles from './users.module.css'
import  axios from "axios";
import userPhoto from '../../assets/images/User_icon.png'



function Users(props: UsersPropsType) {
    if(props.users.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {

            props.setUsers(response.data.items)
        })
        // props.setUsers([
        //     {id: 1, followed: false, fullName: "Dmitry", status: "I'm big Muzzy", location: {city: "Minsk", country: "Belarus" },photoURL:'https://s3-eu-west-1.amazonaws.com/melik-pashaev/books/covers/000/000/378/medium/IOHIM_LIS_cover.jpg' },
        //     {id: 2, followed: true, fullName: "Lisa", status: "I'm big boss", location: {city: "London", country: "UK" }, photoURL:'https://s3-eu-west-1.amazonaws.com/melik-pashaev/books/covers/000/000/378/medium/IOHIM_LIS_cover.jpg'},
        //     {id: 3, followed: false, fullName: "Alexandra", status: "I'm little fox", location: {city: "Vilnius", country: "Lithuania" }, photoURL:'https://s3-eu-west-1.amazonaws.com/melik-pashaev/books/covers/000/000/378/medium/IOHIM_LIS_cover.jpg'},
        // ])
    }

    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small && u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button> :
                                <button onClick={() => {props.follow(u.id)}}>Follow</button>}

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

export default Users;