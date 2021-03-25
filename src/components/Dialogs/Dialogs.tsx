import React, {ChangeEvent} from "react";
import DialogItem from "./DialogItem/DialogItem";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";



function Dialogs(props: DialogsPropsType) {
    let state = props.dialogsPage;


    let dialogsElements = state.dialogs.map(
        d => <DialogItem name={d.name} id={d.id} avatar={d.avatar}/>
    );

    let messagesElements = state.messages.map(
        m => <Message message={m.message} id={m.id}/>
    );
    const newMessageBody = state.newMessageBody;
    const onSendMessageClick = () => {
        props.onSendMessage()
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value;
        props.updateNewMessageBody(body);

    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea value={newMessageBody}
                                   placeholder='Enter your message'
                                   onChange={onNewMessageChange}
                    >
                    </textarea></div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;
