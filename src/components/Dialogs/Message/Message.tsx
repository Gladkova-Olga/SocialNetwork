import React from "react";
import s from "../Dialogs.module.scss";
import {MessageType} from "../../../Redux/dialogsReducer";


function Message(props: MessageType) {
    return (
        <div className={s.message}>
            <div>
                {props.message}
            </div>
        </div>
    )

}

export default Message;