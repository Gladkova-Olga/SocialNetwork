import React from "react";
import userPhoto from "../../assets/images/User_icon.png";
import styles from "./users.module.css";
import axios from "axios";
import {UsersPropsType} from "./UsersContainer";
import {AppStateType} from "../../Redux/reduxStore";

//Не типизированы запросы!!!
class Users extends React.Component<UsersPropsType, AppStateType> {
    // если конструктор только передает управление родительскому классу, то конструктор можно не писать
    // constructor(props: UsersPropsType) {
    //     super(props);
    // }

    componentDidMount() {
        if (this.props.users.length === 0) {
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
                .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
                   
            })
        }
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {

            this.props.setUsers(response.data.items)
        })
    }

    render() {
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        const pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        return (
            <div>
                <div>
                    {pages.map(p => {
                        return (
                            <span className={(p === this.props.currentPage) ? styles.selectedPage : ''}
                                  onClick={(e) => {
                                      this.onPageChanged(p)
                                  }}
                            > {p}</span>
                        )
                    })}

                </div>
                {
                    this.props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    this.props.unfollow(u.id)
                                }}>Unfollow</button> :
                                <button onClick={() => {
                                    this.props.follow(u.id)
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

}


export default Users;