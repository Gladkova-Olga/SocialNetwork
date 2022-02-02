import React from "react";
import Dialogs from "./Dialogs";
import {DialogsPageType, sendMessageCreator} from "../../Redux/dialogsReducer";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/reduxStore";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type MapStateToPropsType = {
    dialogsPage: DialogsPageType
}
type MapDispatchToPropsType = {
    onSendMessage: (newMessageBody: string) => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => { //state of all application
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => { //dispatch: Dispatch(from Redux)
    return {

        onSendMessage: (newMessageBody: string) => dispatch(sendMessageCreator(newMessageBody)),
    }
}
export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)
(Dialogs)

