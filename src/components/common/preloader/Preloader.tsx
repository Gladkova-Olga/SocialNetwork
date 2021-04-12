import loader from "../../../assets/images/loader.gif";
import React from "react";

type PreloaderPropsType = {

}

function Preloader(props: PreloaderPropsType) {
    return (
        <div>
            <img src={loader}/>
        </div>
    )
}

export default Preloader;