import React, {Suspense} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, HashRouter, Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import store, {AppStateType} from "./Redux/reduxStore";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/appReducer";
import Preloader from "./components/common/preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
// import ProfileContainer from "./components/Profile/ProfileContainer";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer")); //not included in the bundle
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer")); //not included in the bundle


type MapDispatchToPropsType = {
    initializeApp: () => void
}
type  MapStateToPropsType = {
    initialized: boolean
}

type PropsType = MapDispatchToPropsType & MapStateToPropsType

class App extends React.Component<PropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar
                />
                <div className={'app-wrapper-content'}>
                    <Route path={'/profile/:userId?'}
                           render={withSuspense(ProfileContainer)}/>
                    <Route path={'/dialogs'}
                           render={withSuspense(DialogsContainer)}/>
                    <Route path={'/users'}
                           render={withSuspense(UsersContainer)}/>

                    <Route path={'/login'} render={withSuspense(Login)}/>

                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
    (mapStateToProps, {initializeApp}))(App)

const SamuraiJSApp = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    )
}
export default SamuraiJSApp



