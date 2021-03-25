import React from "react";
import s from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import {DialogsType} from "../../../Redux/dialogsReducer";


// export type DialogsType = {
//     name: string
//     id: number
// }


function DialogItem(props: DialogsType) {
    let path = '/dialogs/' + props.id;
    return (
        <div className={s.dialog + ' ' + s.active}>
            <span><img src={props.avatar} alt=""/></span>
            <span><NavLink to={path}>{props.name}</NavLink></span>

        </div>
    )
}

export default DialogItem;