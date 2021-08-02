import React, {ChangeEvent} from "react";
import s from './ProfileInfo.module.css';


type PropsType = {
    status: string
    updateUserStatus: (status: string) => any
}

class ProfileStatus extends React.Component<PropsType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () =>  {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        })
        this.props.updateUserStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })

}

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || "----"}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input  onChange={this.onStatusChange} autoFocus={true} value={this.state.status} onBlur={this.deactivateEditMode }/>
                </div>
                }

            </div>
        )
    }


}

export default ProfileStatus;