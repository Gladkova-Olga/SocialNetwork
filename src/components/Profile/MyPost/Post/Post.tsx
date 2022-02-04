import React from "react";
import s from './Post.module.scss';
import {PostType} from "../../../../Redux/profileReducer";



function Post(props: PostType) {
    return (
        <div className={s.postContainer}>
            {props.message}
            <div>
                <span className={s.likes}>like {props.likesCount}</span>
            </div>

        </div>
    )
}

export default Post;