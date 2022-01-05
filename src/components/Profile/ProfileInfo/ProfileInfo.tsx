import React, {ChangeEvent} from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import {ProfileUserType} from "../../../Redux/profileReducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/User_icon.png";

type PropsType = {
    profile: null | ProfileUserType
    status: string
    updateUserStatus: (status: string) => any
    isOwner: boolean
    savePhoto: (e: any, userId: number | null) => void
    authorizedUserId: number | null
}

function ProfileInfo(props: PropsType) {
    if (!props.profile) {
        return <Preloader/>
    }
    const onMainPhotoSelector = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0], props.authorizedUserId)
        }
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large ? props.profile.photos.large : userPhoto} className={s.mainPhoto}/>
                <div>
                    {props.isOwner && <input type={"file"} onChange={onMainPhotoSelector}/>}
                </div>
                <div>
                    {props.profile.fullName}
                    {props.profile.aboutMe}
                </div>

                <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;