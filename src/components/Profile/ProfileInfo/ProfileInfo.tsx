import React from "react";
import s from './ProfileInfo.module.css';

function ProfileInfo(props: any) {
    return (
        <div>
            <div>
                <img
                    src='https://kids.sandiegozoo.org/sites/default/files/2019-01/animal-hero-arcticfoxe.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
                ava+disk
            </div>
        </div>
    )
}
export default ProfileInfo;