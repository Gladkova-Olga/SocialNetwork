import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import {authReducer} from "./authReducer";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from "redux-form";
import appReducer from "./appReducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,

})


export type AppStateType = ReturnType<typeof rootReducer> //typeof - return type of function,
// ReturnType<typeof rootReducer> return type of function return

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers( applyMiddleware(thunkMiddleware)
));

// let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
//@ts-ignore
window.store = store

export default store;