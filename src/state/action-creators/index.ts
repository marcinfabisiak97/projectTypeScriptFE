import { Dispatch } from "redux"
import { ActionType } from "../action-types"
import { Action } from "../actions/index"
export const show = (amount: number | string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SHOW,
            payload: amount
        })
    }
}


