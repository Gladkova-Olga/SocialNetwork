import React from "react";
import s from "../Dialogs.module.css";
import {MessageType} from "../../../Redux/dialogsReducer";


function Message(props: MessageType) {
    let newMessageElement = React.createRef<HTMLTextAreaElement>();
    let addMessage = () => {
       let text =  newMessageElement.current?.value;
    }
    return (

        <div className={s.message}>
            <div>
                {props.message+"zzzzzz"}
            </div>
            {/*<div>*/}
            {/*<textarea ref = {addMessage}></textarea>*/}
            {/*<button onClick={addMessage}>Add</button>*/}
            {/*</div>*/}
        </div>
    )

}

export default Message;