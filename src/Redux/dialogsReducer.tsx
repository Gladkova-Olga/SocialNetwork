


const SEND_MESSAGE = 'SEND-MESSAGE';

type ActionsTypes =
 ReturnType<typeof sendMessageCreator>

export type DialogsPageType = {
    messages: Array<MessageType>
    dialogs: Array<DialogsType>
    newMessageBody: string
}
export type DialogsType = {
    name: string
    id: number
    avatar: string
}
export type MessageType = {
    id: number
    message: string}

const initialState: DialogsPageType = {
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
    };

// for this reducer state is state.dialogsPage, we give here only this part of state.
// It's important to give a type oe return of function
const dialogsReducer = (state:DialogsPageType = initialState, action: ActionsTypes): DialogsPageType => {

    switch (action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody
            return {
                ...state,
                messages:  [...state.messages, {id: 6, message: body}],
            };
        }

        default:
            return state;
    }


}

export const sendMessageCreator = (newMessageBody:string) => ({
    type: SEND_MESSAGE,
    newMessageBody
}) as const

export default dialogsReducer;