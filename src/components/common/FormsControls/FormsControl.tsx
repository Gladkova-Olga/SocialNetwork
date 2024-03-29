import s from "./FormControls.module.scss"


const FormControl = ({input, meta, child, ...props}: any) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={s.formControl}>
            <div>
                {props.children}
                {hasError && <div>{meta.error}</div>}
            </div>


        </div>
    )
}


export const Textarea = (props: any) => {
    const {input, meta, children, ...restProps} = props
    return (
        <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
    )
}

export const Input = (props: any) => {
    const {input, meta, children, ...restProps} = props
    return (
        <FormControl {...props}><input {...input} {...restProps}/></FormControl>
    )
}
