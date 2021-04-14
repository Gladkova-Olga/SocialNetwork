import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Route} from "react-router-dom";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {RootStateType} from "./Redux/reduxStore";
import UsersContainer from "./components/Users/UsersContainer";


type AppPropsType = {
     state: RootStateType
}

function App(props: AppPropsType) {

    return (
            <div className='app-wrapper'>
                <Header/>
                <Navbar
                     state = {props.state.sidebar.friends}
                />
                <div className={'app-wrapper-content'}>
                    <Route path={'/profile'}
                           render={ () => <ProfileContainer />}/>
                    <Route path ={'/dialogs'}
                           render={() =>  <DialogsContainer/>}/>
                    <Route path ={'/users'}
                           render={() =>  <UsersContainer/>}/>

                    <Route path ={'/news'} render={() =>  <News />}/>
                    <Route path ={'/music'} render={() =>  <Music />}/>
                    <Route path ={'/settings'} render={() =>  <Settings />}/>

                </div>
            </div>
    );
}

export default App;
