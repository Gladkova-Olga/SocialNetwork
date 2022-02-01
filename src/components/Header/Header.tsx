import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.scss';
import styles from '../../styles/common/Btn.module.scss'

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logout: () => any


}

function Header(props: HeaderPropsType) {
    return (
        <header className= {s.header}>
            {/*<img src='https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg'/>*/}
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div className={s.loginText}> {props.login} <button className={styles.btn} onClick={props.logout}>Log Out</button></div>
                    : <div className={s.loginText}><NavLink to={'/login'}>Login</NavLink></div> }
            </div>
        </header>
    )
}
export default Header;