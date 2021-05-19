import React from "react";
import { NavLink } from "react-router-dom";
import s from './Navbar.module.css';
import DialogItem from "../Dialogs/DialogItem/DialogItem";
import {DialogsType} from "../../Redux/dialogsReducer";


type NavbarType = {
    // state: Array<DialogsType>
}

function Navbar(props: NavbarType) {
    // let friendsElements = props.state.map(
    //     d => <DialogItem name={d.name} id={d.id} avatar={d.avatar}/>
    // );
    return (
        <nav className = {s.nav}>
            <div className = {`${s.item}`}>
                <NavLink to="/profile" activeClassName ={s.activeLink}>Profile</NavLink>
            </div>
            <div className = {s.item}>
                <NavLink  to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
            </div>
            <div className = {s.item}>
                <NavLink  to="/users" activeClassName={s.activeLink}>Users</NavLink>
            </div>
            <div className = {s.item}>
                <NavLink  to={"/news"} activeClassName={s.activeLink}>News</NavLink>
            </div>
            <div className = {s.item}>
                <NavLink to={"/music"} activeClassName={s.activeLink}>Music</NavLink>
            </div>
            <div className = {s.item}>
                <NavLink to={"/settings"} activeClassName={s.activeLink}>Settings</NavLink>
            </div>

            {/*<div className={s.item}>*/}
            {/*    <h3>Friends</h3>*/}
            {/*    {friendsElements}*/}

            {/*</div>*/}
        </nav>
    )
}
//console.log(s); show what in s

export default Navbar;


