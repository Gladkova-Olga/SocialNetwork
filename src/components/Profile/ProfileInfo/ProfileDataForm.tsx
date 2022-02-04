import {ProfileUserType} from "../../../Redux/profileReducer";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, Textarea} from "../../common/FormsControls/FormsControl";
import s from "../../common/FormsControls/FormControls.module.css";
import styleBtn from "../../../styles/common/Btn.module.scss"
import styles from "./ProfileDataForm.module.scss"

export type ProfileDataFormType = ProfileUserType

type PropsType = {
    profile: ProfileUserType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataFormType, PropsType> & PropsType> =
    ({handleSubmit, profile, error}) => {
        return (
            <form onSubmit={handleSubmit} className={styles.profileDataFormContainer}>
                <div>
                    {error && <div className={s.summaryError}>{error}</div>}
                </div>
                <div>My name is {
                    <span className={styles.field}> <Field placeholder={"full name"} name={"fullName"} component={Input}
                                                           validate={[]}/></span>
                }</div>
                <div>About me:
                    <span className={styles.field}>
                    <Field placeholder={"About me"} name={"aboutMe"} component={Textarea} validate={[]}/>
                </span>
                </div>
                <div>Looking for a job:
                    <span className={styles.field}>
                    <Field placeholder={""} name={"lookingForAJob"} component={Input} validate={[]} type="checkbox"/>
                </span></div>

                <div>My professional skills:
                    <span className={styles.field}>
                <Field placeholder={"My professional skills"} name={"lookingForAJobDescription"} component={Textarea}
                       validate={[]}/>
                </span>
                </div>
                <div>{Object.keys(profile.contacts).map(key => {
                    const name = "contacts." + key
                    return <div key={key}>
                    <span> {key}: <span className={styles.field}>
                        <Field placeholder={key} name={name} component={Input} validate={[]}/>
                    </span>
                    </span>
                    </div>
                })}</div>
                <button className={styleBtn.btnSecondVariant} onClick={() => {
                }}>save
                </button>
            </form>
        )

    }
const ProfileDataReduxForm = reduxForm<ProfileDataFormType, PropsType>({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataReduxForm;