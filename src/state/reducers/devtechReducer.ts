import {ActionType}  from "../action-types"
import  {Action} from "../actions/index"
const initialState = "";
const reducer = (filterVal: string = initialState, action: Action): number | string => {
    switch (action.type){
        case ActionType.SHOW:
            return action.payload;
        default:
            return filterVal
    }
}
export default reducer