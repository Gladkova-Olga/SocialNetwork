import React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {Input} from "../common/FormsControls/FormsControl";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../Redux/authReducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../Redux/reduxStore";
import s from "../common/FormsControls/FormControls.module.scss"
import styles from "./Login.module.scss"
import styleBtn from "../../styles/common/Btn.module.scss"

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: null | string
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => any
}
type MapStateToPropsType = {
    captchaUrl: null | string
    isAuth: boolean
}
type LoginPropsType = MapDispatchToPropsType & MapStateToPropsType
type LoginFormPropsType = {
    captchaUrl: null | string
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormPropsType> & LoginFormPropsType> = //деструктуризация props
    ({handleSubmit, captchaUrl, error}) => {

        return (
            <form onSubmit={handleSubmit} className={styles.formLogin}>

                <Field placeholder={"E-mail"} name={"email"} component={Input} validate={[required]}
                       className={styles.field}/>
                <Field placeholder={"Password"} name={"password"} component={Input} validate={[required]}
                       type={"password"} className={styles.field}/>
                <span className={styles.checkbox}>
                    <Field type={"checkbox"} name={"rememberMe"} component={Input}/></span>
                    <span className={styles.checkbox}>remember me</span>


                {error && <div className={s.summaryError}>
                    {error}
                </div>}
                {captchaUrl && <div><img src={captchaUrl} alt=""/></div>}
                {captchaUrl && <Field placeholder={"Symbols from image"} name={"captcha"}
                                      component={Input} validate={[required]} className={styles.field}/>}
                <div>
                    <button className={styleBtn.btn}>Sign in</button>
                </div>
            </form>
        )
    }

const LoginReduxForm = reduxForm<FormDataType, LoginFormPropsType>({form: 'login'})(LoginForm)


const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div className={styles.loginContainer}>
            <div className={styles.titleLoginPage}>Login</div>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }

}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
(mapStateToProps, {login})(Login)