import React from "react";
import s from "./DialogItem.module.scss";
import {NavLink} from "react-router-dom";
import {DialogsType} from "../../../Redux/dialogsReducer";


function DialogItem(props: DialogsType) {
    let path = '/dialogs/' + props.id;
    return (
        <div className={s.dialogsItem}>
            <span className={s.dialogsItemImg}><img className={s.dialogsItemImg} src={props.avatar}
                                                    alt={props.name}/></span>
            <span><NavLink to={path} className={s.dialogsItemName}>{props.name}</NavLink></span>

        </div>
    )
}

export default DialogItem;