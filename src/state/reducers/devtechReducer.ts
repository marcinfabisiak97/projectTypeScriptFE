import {ActionType}  from "../action-types"
import  {Action} from "../actions/index"
const initialState = "";
const reducer = (devtechshow: string = initialState, action: Action): number | string => {
    switch (action.type){
        case ActionType.SHOW:
            return action.payload;
        default:
            return devtechshow
    }
}
export default reducer