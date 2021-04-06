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
    UserType
} from "../../Redux/usersReducer";
import axios from "axios";
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
export type UsersAPIComponentPropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersContainer extends React.Component<UsersAPIComponentPropsType, AppStateType> {
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

        return (
            <Users
                totalUsersCount ={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
            />
        )
    }

}

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
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)