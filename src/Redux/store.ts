import profileReducer, {addPostActionCreator, updateNewPostTextActionCreator} from "./profileReducer";
import dialogsReducer, {sendMessageCreator, updateNewMessageBodyCreator} from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";

let rerenderEntireTree = (state: RootStateType) => {
    console.log('State was changed')
}

 type PostType = {
    id: number
    message: string
    likesCount: number
}
 type DialogsType = {
    name: string
    id: number
    avatar: string
}
 type MessageType = {
    id: number
    message: string
}

 type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}

 type DialogsPageType = {
    messages: Array<MessageType>
    dialogs: Array<DialogsType>
    newMessageBody: string
}
 type SidebarType = {
    friends: Array<DialogsType>
}
 type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}
type StoreType = {
    _state: RootStateType
    _callSubscriber: () => void
    // addPost: (postMessage: string) => void
    // updateNewPostText: (newText: string) => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionsTypes) => void

}

// уточнить, в каком файле организовать хранение ActionsTypes
 type ActionsTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updateNewPostTextActionCreator>
    | ReturnType<typeof updateNewMessageBodyCreator>
    | ReturnType<typeof sendMessageCreator>



let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi! How are you?', likesCount: 12},
                {id: 2, message: "It's my first post", likesCount: 15},
            ],
            newPostText: ''

        },
        dialogsPage: {
            messages: [
                {id: 1, message: 'Hi!'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'Yo!'},
            ],
            newMessageBody: '',
            dialogs: [
                {id: 1, name: 'Lisa', avatar: 'https://pets2.me/media/res/1/3/1/9/2/13192.ozimro.300.jpg'},
                {
                    id: 2,
                    name: 'Bob',
                    avatar: 'https://cs4.pikabu.ru/post_img/big/2015/06/27/6/1435397110_577794048.png'
                },
                {id: 3, name: 'Jane', avatar: 'https://sun9-14.userapi.com/c698/u89838553/113490960/x_ff0ef64c.jpg'},
                {
                    id: 4,
                    name: 'Mary',
                    avatar: 'https://images11.esquire.ru/upload/custom/c41/c41ba98ac9188061e2b0952cdcab9b71.jpg'
                },
                {id: 5, name: 'Jack', avatar: 'https://img.gazeta.ru/files3/837/5731837/bat-pic668-668x444-36724.jpg'},
            ],
        },
        sidebar: {
            friends: [
                {id: 1, name: 'Lisa', avatar: 'https://pets2.me/media/res/1/3/1/9/2/13192.ozimro.300.jpg'},
                {
                    id: 2,
                    name: 'Bob',
                    avatar: 'https://cs4.pikabu.ru/post_img/big/2015/06/27/6/1435397110_577794048.png'
                },
                {id: 3, name: 'Jane', avatar: 'https://sun9-14.userapi.com/c698/u89838553/113490960/x_ff0ef64c.jpg'},
            ]

        }
    },
    _callSubscriber() {
        console.log('State changed')
    },

    subscribe(observer: () => void) {
        this._callSubscriber = observer; //pattern observer
    },
    getState() {
        return this._state;
    },
    dispatch(action) { ///type is required!!!

        // this._state.profilePage = profileReducer(this._state.profilePage, action);
        // this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        // this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        // this._callSubscriber();


        // if (action.type === ADD_POST) {
        //     const newPost: PostType = {
        //         id: 5,
        //         // message: this._state.profilePage.newPostText,
        //         message: action.newPostText,
        //         likesCount: 0
        //     };
        //     this._state.profilePage.posts.push(newPost)
        //     this._state.profilePage.newPostText = ''
        //     this._callSubscriber()
        // } else if (action.type === UPDATE_NEW_POST_TEXT) {
        //     this._state.profilePage.newPostText = action.newText;
        //     this._callSubscriber();
        // } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
        //     this._state.dialogsPage.newMessageBody = action.body;
        //     this._callSubscriber();
        // } else if (action.type === SEND_MESSAGE) {
        //     let body = this._state.dialogsPage.newMessageBody
        //     this._state.dialogsPage.newMessageBody = '';
        //     this._state.dialogsPage.messages.push({id: 6, message: body})
        //
        //     this._callSubscriber();
        // }

    }


}




export default store;



