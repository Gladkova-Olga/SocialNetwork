import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {AppStateType} from "./Redux/reduxStore";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {getAuthUserData} from "./Redux/authReducer";
import {compose} from "redux";


type MapDispatchToPropsType = {
    getAuthUserData: any
}
type MapStateToPropsType = {
        isAuth: boolean
}
type PropsType = MapDispatchToPropsType & MapStateToPropsType

class App extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar
                />
                <div className={'app-wrapper-content'}>
                    <Route path={'/profile/:userId?'}
                           render={() => <ProfileContainer/>}/>
                    <Route path={'/dialogs'}
                           render={() => <DialogsContainer/>}/>
                    <Route path={'/users'}
                           render={() => <UsersContainer/>}/>

                    <Route path={'/login'} render={() => <Login/>}/>

                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>

                </div>
            </div>
        );
    }
}

const mstp = (state: AppStateType): MapStateToPropsType=> {
    return {
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType >(mstp, {getAuthUserData:getAuthUserData})(App)
    )

// export let AppContainer = compose<any>(
//     withRouter,
//     connect({}, {getAuthUserData})(App),
// )
