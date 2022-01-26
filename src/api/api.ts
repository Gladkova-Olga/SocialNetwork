import axios from "axios";
import {UserType} from "../Redux/usersReducer";
import {ProfileUserType} from "../Redux/profileReducer";
import {ProfileDataFormType} from "../components/Profile/ProfileInfo/ProfileDataForm";

type AuthDataType = {
    email: string
    id: number
    login: string
}

type CommonResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
type UserResponseType = {
    error: null | string
    items: Array<UserType>
    totalCount: number
}
export type PhotosType = {
    small: string
    large: string
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "ac9f8bba-4f9b-409e-bf86-a85be8d0bfe1"
    }

})
export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<UserResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollowUser(userID: number) {
        return instance.delete<CommonResponseType>(`follow/${userID}`)
            .then(response => response.data)
    },
    followUser(userID: number) {
        return instance.post<CommonResponseType>(`follow/${userID}`)
            .then(response => response.data)
    }
}

export const authAPI = {
    authMe() {
        return instance.get<CommonResponseType<AuthDataType>>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: boolean | null = null) {
        return instance.post<CommonResponseType<{ userId: number }>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
    },
    logout() {
        return instance.delete<CommonResponseType>(`auth/login`,)
    }
}

export const profileAPI = {
    getUserProfile(userId: number | null) {
        return instance.get<ProfileUserType>(`profile/${userId}`)
            .then(response => response.data)
    },
    getUserStatus(userId: number | null) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateUserStatus(status: string) {
        return instance.put<CommonResponseType>(`profile/status`, {status})
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put<CommonResponseType<PhotosType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileDataFormType) {
        return instance.put<CommonResponseType<ProfileDataFormType>>('profile', profile)
    }
}



