import {ProfileUserType} from "../../../Redux/profileReducer";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, Textarea} from "../../common/FormsControls/FormsControl";

export type ProfileDataFormType = ProfileUserType

type PropsType = {
    profile: ProfileUserType
    isOwner: boolean
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataFormType, PropsType> & PropsType> =
    ({handleSubmit, profile,error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button onClick={() => {
                }}>save
                </button>
            </div>
            <div>My name is {
                <div>
                    <Field placeholder={"full name"} name={"fullName"} component={Input} validate={[]}/>
                </div>
            }</div>
            <div>About me:
                <Field placeholder={"About me"} name={"aboutMe"} component={Textarea} validate={[]}/></div>
            <div>Looking for a job:
                <div>
                    <Field placeholder={""} name={"lookingForAJob"} component={Input} validate={[]} type="checkbox"/>
                </div></div>

            <div>My professional skills:
                <Field placeholder={"My professional skills"} name={"lookingForAJobDescription"} component={Textarea}
                       validate={[]}/>
            </div>
            {/*<div>Contacts: {Object.keys(profile.contacts).map(key => {*/}
            {/*    return <Contacts contactTitle={key} key={key}*/}
            {/*              contactValue={profile.contacts[key]}/>*/}
            {/*})}</div>*/}
        </form>
    )

}
const ProfileDataReduxForm = reduxForm<ProfileDataFormType, PropsType>({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataReduxForm;