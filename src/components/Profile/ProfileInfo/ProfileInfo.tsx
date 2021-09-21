import React from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import {ProfileUserType} from "../../../Redux/profileReducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type PropsType = {
    profile: null | ProfileUserType
    status: string
    updateUserStatus: (status: string) => any
}

function ProfileInfo(props: PropsType) {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large ? props.profile.photos.large : ''}/>
                {props.profile.fullName}
                {props.profile.aboutMe}
                <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
                {/*With classComponent*/}
                {/*<ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus} />*/}
            </div>
        </div>
    )
}

export default ProfileInfo;