import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "ac9f8bba-4f9b-409e-bf86-a85be8d0bfe1"
    }

})
export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10 )  {
        return  instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
}
}

export const followAPI = {
    unfollowUser(id: number)  {
        return  instance.delete(`follow/${id}`)
            .then(response => response.data)
    },
    followUser(id:number) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    }
}

