import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "ac9f8bba-4f9b-409e-bf86-a85be8d0bfe1"
    }

})
export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10 )  {
        return  instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
},
    unfollowUser(userID: number)  {
        return  instance.delete(`follow/${userID}`)
            .then(response => response.data)
    },
    followUser(userID:number) {
        return instance.post(`follow/${userID}`)
            .then(response => response.data)
    }
}

export const authAPI = {
    authMe() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    }
}

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get(`profile/${userId}` )
            .then(response => response.data)

    }
}



