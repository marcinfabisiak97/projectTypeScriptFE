import { ActionType } from "../action-types"

interface ShowAction {
    type: ActionType.SHOW,
    payload: number
}
interface HideAction {
    type: ActionType.HIDE,
    
}

export type Action = ShowAction | HideAction;