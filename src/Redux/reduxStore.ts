import {combineReducers, createStore, Store} from "redux";
import profileReducer, { InitialStateType} from "./profileReducer";
import dialogsReducer, {DialogsPageType} from "./dialogsReducer";
import sidebarReducer, {SidebarType} from "./sidebarReducer";
import usersReducer from "./usersReducer";


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
    usersPage: usersReducer
})


export type AppStateType = ReturnType<typeof rootReducer> //typeof - return type of function,
// ReturnType<typeof rootReducer> return type of function return

let store = createStore(rootReducer);


//let store : Store= createStore(rootReducer);

export default store;