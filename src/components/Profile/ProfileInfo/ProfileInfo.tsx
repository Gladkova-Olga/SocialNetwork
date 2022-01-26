import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import {ProfileUserType} from "../../../Redux/profileReducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/User_icon.png";
import ProfileDataForm, {ProfileDataFormType} from "./ProfileDataForm";

type PropsType = {
    profile: null | ProfileUserType
    status: string
    updateUserStatus: (status: string) => any
    isOwner: boolean
    savePhoto: (e: any, userId: number | null) => void
    authorizedUserId: number | null
    saveProfile: (formData: ProfileDataFormType) => void
}

function ProfileInfo(props: PropsType) {
    const [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }
    const onMainPhotoSelector = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0], props.authorizedUserId)
        }
    }
    const goToEditMode = () => setEditMode(true);
    const onSubmit = (formData: ProfileDataFormType) => {
        props.saveProfile(formData)
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large ? props.profile.photos.large : userPhoto} className={s.mainPhoto}/>
                <div>
                    {props.isOwner && <input type={"file"} onChange={onMainPhotoSelector}/>}
                </div>
                <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
                {editMode ? <ProfileDataForm onSubmit={onSubmit} profile={props.profile} isOwner = {props.isOwner}
                    initialValues={props.profile}/> :
                    <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode = {goToEditMode}/>}

            </div>
        </div>
    )
}

type ContactsType = {
    contactTitle: string
    contactValue: string | null
}
export const Contacts = ({contactTitle, contactValue}: ContactsType) => {
    return (
        <div>
            <b>{contactTitle}:</b> {contactValue}
        </div>
    )
}
type ProfileDataType = {
    profile: ProfileUserType
    isOwner: boolean
    goToEditMode: () => void
}



export const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataType) => {
    return (
        <div>
            {isOwner && <div>
                <button onClick={goToEditMode}>edit</button>
            </div>}
            <div>My name is {profile.fullName}</div>
            <div>About me: {profile.aboutMe}</div>
            <div>Looking for a job: {profile.lookingForAJob ? "yes" : "no"}</div>
            {profile.lookingForAJob &&
            <div>My professional skills: {profile.lookingForAJobDescription}</div>}
            {/*<div>Contacts: {Object.keys(profile.contacts).map(key => {*/}
            {/*    return <Contacts contactTitle={key} key={key}*/}
            {/*              contactValue={profile.contacts[key]}/>*/}
            {/*})}</div>*/}
        </div>
    )

}



export default ProfileInfo;