import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, { InitialStateType} from "./profileReducer";
import dialogsReducer, {DialogsPageType} from "./dialogsReducer";
import sidebarReducer, {SidebarType} from "./sidebarReducer";
import usersReducer from "./usersReducer";
import {authReducer} from "./authReducer";
import thunkMiddleware from "redux-thunk"

//
export type RootStateType = {
    profilePage: InitialStateType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer
})


export type AppStateType = ReturnType<typeof rootReducer> //typeof - return type of function,
// ReturnType<typeof rootReducer> return type of function return

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));



export default store;