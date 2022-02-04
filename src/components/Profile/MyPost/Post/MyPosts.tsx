import React from "react";
import s from './MyPosts.module.scss';
import Post from "./Post";
import {PostType,} from "../../../../Redux/profileReducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {Textarea} from "../../../common/FormsControls/FormsControl";
import styleBtn from "../../../../styles/common/Btn.module.scss"


type MyPostsType = {
    posts: Array<PostType>
    newPostText: string
    addPost: (newText: string) => void
}
type MyPostFormDataType = {
    newPostText: string
}


function MyPosts(props: MyPostsType) {
    let postsElements = props.posts.map(
        p => <Post key={p.id} message={p.message} likesCount={p.likesCount} id={p.id}/>
    );

    let onAddPost = (formData: MyPostFormDataType) => {
        props.addPost(formData.newPostText)
    }


    return (
        <div className={s.latestPostsBlock}>
            <div className={s.blockTitle}>Latest posts</div>
            <AddNewPostReduxForm onSubmit={onAddPost}/>

            <div className={s.postsBlock}>
                {postsElements}
            </div>
        </div>
    )
}

const maxLength10 = maxLengthCreator(10)
 const AddNewPostForm: React.FC<InjectedFormProps<MyPostFormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={s.postFormContainer}>
            <div>
                <Field placeholder="New post" name={'newPostText'} component={Textarea}
                       validate = {[required, maxLength10]} />
            </div>
            <div>
                <button className={styleBtn.btnSecondVariant}>Add post</button>
            </div>
        </form>
    )
}

 const AddNewPostReduxForm = reduxForm<MyPostFormDataType>({form: "ProfileAddNewPostForm"})(AddNewPostForm)

export default MyPosts;