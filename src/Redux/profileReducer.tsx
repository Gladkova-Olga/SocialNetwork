


const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
export type PostType = {
    id: number
    message: string
    likesCount: number
}


type ActionsTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updateNewPostTextActionCreator>

const initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi! How are you?', likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 15},
    ],
        newPostText: ''
}

// for this reducer state is state.profilePage, we give here only this part of state
const profileReducer = (state= initialState, action:ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: 5,
                // message: this._state.profilePage.newPostText,
                message: action.newPostText,
                likesCount: 0
            }
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);
            stateCopy.newPostText = '';
            return stateCopy;

        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = {...state};
            stateCopy.newPostText = action.newText;
            return stateCopy;
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText: string) => ({
    type: ADD_POST,
    newPostText: newPostText
}as const)
export const updateNewPostTextActionCreator = (newText: string) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: newText
}as const)

export default profileReducer;