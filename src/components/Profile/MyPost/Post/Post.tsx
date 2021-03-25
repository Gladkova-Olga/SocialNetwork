import React from "react";
import s from './Post.module.css';
import {PostType} from "../../../../Redux/profileReducer";



function Post(props: PostType) {
    return (
        <div className={s.item}>
            <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCgPWBtcWfGpFd3n6ma11amy6vQwYYZ8oj9A&usqp=CAU'/>
            {props.message}
            <div>
                <span>like </span> {props.likesCount}
            </div>

        </div>
    )
}

export default Post;