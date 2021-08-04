
import {DialogsType} from "./dialogsReducer";

export type SidebarType = {
    friends: Array<DialogsType>
}
type ActionsTypes = any


const initialState: SidebarType = {
    friends: [
        {id: 1, name: 'Lisa', avatar: 'https://pets2.me/media/res/1/3/1/9/2/13192.ozimro.300.jpg'},
        {
            id: 2,
            name: 'Bob',
            avatar: 'https://cs4.pikabu.ru/post_img/big/2015/06/27/6/1435397110_577794048.png'
        },
        {id: 3, name: 'Jane', avatar: 'https://sun9-14.userapi.com/c698/u89838553/113490960/x_ff0ef64c.jpg'},
    ]

};

const sidebarReducer= (state: SidebarType = initialState, action: ActionsTypes): SidebarType => {

    return state;
}

export default sidebarReducer;