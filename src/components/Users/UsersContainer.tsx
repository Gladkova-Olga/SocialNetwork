import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/reduxStore";
import {

    setCurrentPage,

    UserType, toggleFollowingProgress, getUsers, unfollow, follow
} from "../../Redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";


type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
type MapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    // setUsers: (users: any) => void
    setCurrentPage: (pageNumber: number) => void
    // setTotalUsersCount: (totalCount: number) => void
    // toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching: boolean, userID: number) => void
    getUsers: (currentPage: number, pageSize: number) => any
}
export type UsersAPIComponentPropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersContainer extends React.Component<UsersAPIComponentPropsType, AppStateType> {
    // если конструктор только передает управление родительскому классу, то конструктор можно не писать
    // constructor(props: UsersPropsType) {
    //     super(props);
    // }

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
        // this.props.toggleIsFetching(true);
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data=> {
        //     this.props.toggleIsFetching(false)
        //     this.props.setUsers(data.items)
        //     this.props.setTotalUsersCount(data.totalCount)
        //
        // })

    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize);

        // this.props.setCurrentPage(pageNumber);
        // this.props.toggleIsFetching(true)
        // usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
        //     this.props.toggleIsFetching(false)
        //     this.props.setUsers(data.items)
        // });
    }

    render() {

        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    // toggleFollowingProgress={this.props.toggleFollowingProgress}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }

}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => { //state of all application
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}
// let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => { //dispatch: Dispatch(from Redux)
//     return {
//         follow: (userID: number) => {
//             dispatch(follow(userID));
//         },
//         unfollow: (userID: number) => {
//             dispatch(unfollow(userID));
//         },
//         setUsers: (users: Array<UserType>) => {
//             dispatch(setUsers(users));
//         },
//         setCurrentPage: (pageNumber: number) => {
//             dispatch(setCurrentPage(pageNumber));
//         },
//         setTotalUsersCount: (totalCount: number) => {
//             dispatch(setTotalUsersCount(totalCount));
//         },
//         toggleIsFetching: (isFetching: boolean) => {
//             dispatch(toggleIsFetching(isFetching));
//         }
//
//     }
// }

export default connect(mapStateToProps,
    {
        follow,
        unfollow,
        // setUsers,
        setCurrentPage,
        // setTotalUsersCount,
        // toggleIsFetching,
        toggleFollowingProgress,
        getUsers
    }
)(UsersContainer)