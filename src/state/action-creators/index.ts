import { Dispatch } from "redux"
import { ActionType } from "../action-types"
import { Action } from "../actions/index"

export const show = (amount: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SHOW,
            payload: amount
        })
    }
}
export const hide = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.HIDE,
            
        })
    }
}

