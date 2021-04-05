 const FOLLOW = 'FOLLOW';
 const UNFOLLOW = 'UNFOLLOW';
 const SET_USERS = 'SET_USERS';
 const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
 const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"

 export type UserType = {
     id: number
     followed: boolean
     name: string
     status: string
     // location: {
     //     city: string
     //     country: string
     // }
     // photoURL: string
     photos: {
         small: string | null
         large: string | null
     }
 }
 export type UsersPageType = typeof initialState

 type ActionsType = ReturnType<typeof followAC> |
     ReturnType<typeof unfollowAC> |
     ReturnType<typeof setUsersAC> |
     ReturnType<typeof setUCurrentPageAC> |
     ReturnType<typeof setUsersTotalCountAC>



let initialState = {
    users: []as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
}

const usersReducer = (state: UsersPageType = initialState, action: ActionsType): UsersPageType => {
switch (action.type) {
    case FOLLOW:
        return  {
            ...state,
            users: state.users.map(u => {
                if(u.id === action.userID) {
                    return {...u, followed: true}
                }
                return u;
            })
        }
    case UNFOLLOW:
        return  {
            ...state,
            users: state.users.map(u => {
                if(u.id === action.userID) {
                    return {...u, followed: false}
                }
                return u;
            })
        }
    case SET_USERS: {
        return {
            ...state,
            users: action.users}
    }
    case SET_CURRENT_PAGE: {
        return {
            ...state,
            currentPage: action.currentPage
        }
    }
    case "SET_TOTAL_USERS_COUNT": {
        return {
            ...state,
            totalUsersCount: action.totalCount
        }
    }
    default:
        return state;
}

}


export const followAC = (userID: number)  => ({
    type: FOLLOW, userID} as const);
export const unfollowAC = (userID: number) => ({type: UNFOLLOW, userID} as const);
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users}as const);
export const setUCurrentPageAC = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}as const);
export const setUsersTotalCountAC = (totalCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalCount}as const);

export default usersReducer;