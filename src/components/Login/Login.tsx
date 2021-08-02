import React from "react";

type PropsType = {
}


export const Login = (props: PropsType) => {
    return (
        <div>
            <h1>LOGIN</h1>
            <form>
                <div>
                    <input placeholder={"login"}/>
                </div>
                <div>
                    <input placeholder={"password"}/>
                </div>
                <div>
                    <input type={"checkbox"}/> remember me
                </div>
                <div><button>sign in</button></div>
            </form>
        </div>

    )
}