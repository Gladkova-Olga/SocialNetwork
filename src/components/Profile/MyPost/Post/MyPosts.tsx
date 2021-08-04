import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css';
import Post from "./Post";
import {PostType,} from "../../../../Redux/profileReducer";
import {reduxForm, InjectedFormProps, Field} from "redux-form";


type MyPostsType = {
    posts: Array<PostType>
    newPostText: string
    // updateNewPostText: (newText: string) => void
    addPost: (newText: string) => void
}
type MyPostFormDataType = {
    newPostText: string
}


function MyPosts(props: MyPostsType) {

    let postsElements = props.posts.map(
        p => <Post message={p.message} likesCount={p.likesCount} id={p.id}/>
    );

    let onAddPost = (formData: MyPostFormDataType) => {
        props.addPost(formData.newPostText)
    }



    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <AddNewPostReduxForm onSubmit={onAddPost}/>

            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

 const AddNewPostForm: React.FC<InjectedFormProps<MyPostFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder="New post" name={'newPostText'} component={'textarea'}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

 const AddNewPostReduxForm = reduxForm<MyPostFormDataType>({form: "ProfileAddNewPostForm"})(AddNewPostForm)

export default MyPosts;