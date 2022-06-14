import {ActionType}  from "../action-types"
import  {Action} from "../actions/index"

const initialState = 1;

const reducer = (devtechshow: number = initialState, action: Action): number => {
    switch (action.type){
        case ActionType.SHOW:
            return action.payload;
        case ActionType.HIDE:
            return initialState;
        default:
            return devtechshow
    }
}

export default reducer