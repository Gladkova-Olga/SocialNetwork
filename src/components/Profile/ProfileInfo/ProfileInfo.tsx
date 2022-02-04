import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.scss';
import Preloader from "../../common/preloader/Preloader";
import {ContactsType, ProfileUserType} from "../../../Redux/profileReducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/User_icon.png";
import ProfileDataForm, {ProfileDataFormType} from "./ProfileDataForm";
import styleBtn from "../../../styles/common/Btn.module.scss"

type PropsType = {
    profile: null | ProfileUserType
    status: string
    updateUserStatus: (status: string) => any
    isOwner: boolean
    savePhoto: (e: any, userId: number | null) => void
    authorizedUserId: number | null
    saveProfile: (formData: ProfileDataFormType) => Promise<any>
}

function ProfileInfo(props: PropsType) {
    const [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }
    const onMainPhotoSelector = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0], props.authorizedUserId)
        }
    }
    const goToEditMode = () => setEditMode(true);
    const onSubmit = (formData: ProfileDataFormType) => {
        props.saveProfile(formData).then(
            () => setEditMode(false)
        )
    }

    return (
        <div className={s.profileInfoContainer}>
            <div>
                <img className={s.mainPhoto} src={props.profile.photos.large ? props.profile.photos.large : userPhoto}/>
                <div>
                    {props.isOwner &&
                    <div className={s.editImage}>
                        <input type={"file"} name={"file"} id={"file"} onChange={onMainPhotoSelector} className={s.editImageInput}/>
                        <label htmlFor="file" className={styleBtn.btnSecondVariant}>Change Image</label>
                    </div>
                    }
                </div>
            </div>
            <div>
                <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
                {editMode ?
                    <span> <ProfileDataForm onSubmit={onSubmit} profile={props.profile}
                                            initialValues={props.profile}/> </span> :
                    <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={goToEditMode}/>}
            </div>
        </div>

    )
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string | null
}
export const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return (
        <div className={s.contacts}>
            <span className={s.profileData}>{contactTitle}:</span> {contactValue}
        </div>
    )
}
type ProfileDataType = {
    profile: ProfileUserType
    isOwner: boolean
    goToEditMode: () => void
}


export const ProfileData: React.FC<ProfileDataType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <div className={s.profileDataContainer}>
            <div>Hi! My name is <span className={s.profileData}>{profile.fullName}</span></div>
            <div>About me: <span className={s.profileData}> {profile.aboutMe}</span></div>
            <div>Looking for a job: <span className={s.profileData}>{profile.lookingForAJob ? "yes" : "no"}</span></div>
            {profile.lookingForAJob &&
            <div>My professional skills: <span className={s.profileData}>{profile.lookingForAJobDescription}</span>
            </div>}
            <div className={s.contactsContainer}> {Object
                .keys(profile.contacts)
                .map((key) => {
                    return <Contact contactTitle={key} key={key}
                                    contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}</div>
            {isOwner && <div>
                <button onClick={goToEditMode} className={styleBtn.btnSecondVariant}>Edit Profile</button>
            </div>}
        </div>
    )

}


export default ProfileInfo;