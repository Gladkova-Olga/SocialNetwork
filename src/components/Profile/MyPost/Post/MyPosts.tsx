import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css';
import Post from "./Post";
import {PostType,} from "../../../../Redux/profileReducer";


type MyPostsType = {
    posts: Array<PostType>
    newPostText: string
    updateNewPostText: (newText: string) => void
    addPost: (newText: string) => void
}


function MyPosts(props: MyPostsType) {

    let postsElements = props.posts.map(
        p => <Post message={p.message} likesCount={p.likesCount} id={p.id}/>
    );

    let onAddPost = () => {
        props.addPost(props.newPostText)
    }
    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value);
    }


    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>

            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;