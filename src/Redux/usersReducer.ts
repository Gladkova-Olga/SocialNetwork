 const FOLLOW = 'FOLLOW';
 const UNFOLLOW = 'UNFOLLOW';
 const SET_USERS = 'SET_USERS';

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
     ReturnType<typeof setUsersAC>


let initialState = {
    users: [

    ]as Array<UserType>
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
            users: [...state.users, ...action.users]}
    }
    default:
        return state;
}

}


export const followAC = (userID: number) => ({
    type: FOLLOW, userID} as const);
export const unfollowAC = (userID: number) => ({type: UNFOLLOW, userID} as const);
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users}as const);

export default usersReducer;