

// common function for reducers
import {UserType} from "../Redux/usersReducer";

export const updateObjectInArray = (items: Array<UserType>, itemId: number, objPropertyName: string, newObjProp: {}  ) => {
    return items.map(u => {
            // @ts-ignore
        if (u[objPropertyName] === itemId) {
                return {...u, ...newObjProp}
            }
            return u;
        })
}
