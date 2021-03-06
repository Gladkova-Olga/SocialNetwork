import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControl";
import {maxLengthCreator, required} from "../../utils/validators/validators";

type MessageFormDataType = {
    newMessageBody: string
}

function Dialogs(props: DialogsPropsType) {
    let state = props.dialogsPage;


    let dialogsElements = state.dialogs.map(
        d => <DialogItem key={d.id} name={d.name} id={d.id} avatar={d.avatar}/>
    );

    let messagesElements = state.messages.map(
        m => <Message key={m.id} message={m.message} id={m.id}/>
    );

    const AddNewMessage = (formData: MessageFormDataType) => {
        console.log(formData.newMessageBody)
        props.onSendMessage(formData.newMessageBody)
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>

                <AddMessageReduxForm onSubmit={AddNewMessage}/>

            </div>
        </div>
    )
}
const maxLength50 = maxLengthCreator(50)
export const AddMessageForm: React.FC<InjectedFormProps<MessageFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"newMessageBody"} component={Textarea} placeholder='Enter your message'
                validate = {[required, maxLength50]} >
                </Field>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export const AddMessageReduxForm = reduxForm<MessageFormDataType>({form: "dialogAddMessageForm"})(AddMessageForm)
export default Dialogs;



