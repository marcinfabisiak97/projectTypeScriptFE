import { ActionType } from "../action-types"
interface ShowAction {
    type: ActionType.SHOW,
    payload: number | string
}
export type Action = ShowAction;