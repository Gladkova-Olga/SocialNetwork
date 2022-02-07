import React from 'react'
import style from './Error404.module.scss'


function Error404() {
    return (
        <div className={style.error404Page}>
            <div className={style.numbers}>404</div>
            <div>Page Not Found</div>
        </div>
    )
}

export default Error404