import React from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import {ProfileUserType} from "../../../Redux/profileReducer";
type PropsType = {
    profile: null | ProfileUserType
}
function ProfileInfo(props: PropsType) {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img
                    src='https://kids.sandiegozoo.org/sites/default/files/2019-01/animal-hero-arcticfoxe.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large ? props.profile.photos.large: ''}/>
                {props.profile.fullName}
                {props.profile.aboutMe}
            </div>
        </div>
    )
}
export default ProfileInfo;