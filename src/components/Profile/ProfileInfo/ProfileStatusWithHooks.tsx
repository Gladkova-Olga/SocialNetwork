import React, {ChangeEvent, FC, useEffect, useState} from "react";
import s from "./ProfileStatusWithHooks.module.scss"

type PropsType = {
    status: string
    updateUserStatus: (status: string) => any
}

const ProfileStatusWithHooks = (props: PropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => setEditMode(true);
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={s.statusContainer}>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{props.status || "----"}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true} value={status}
                />
            </div>
            }

        </div>
    )


}

export default ProfileStatusWithHooks;