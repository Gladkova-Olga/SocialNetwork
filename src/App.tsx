import React from 'react';
import './App.scss';
import Navbar from "./components/Navbar/Navbar";
import {HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
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
import Error404 from "./components/common/Error404/Error404";

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
                    <Switch>
                        <Route exact path={'/'} render={ () => <Redirect to={'/profile'}/>}/>
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
                        {/*<Redirect from={'*'} to={<div>404 Not Found</div>}}/>*/}
                        <Route path={'*'} render={() => <Error404/>}/>
                    </Switch>
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
        //here is used HashRouter for gh-pages. In other cases should use BrowserRouter
        <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    )
}
export default SamuraiJSApp



