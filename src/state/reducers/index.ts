import { combineReducers } from "redux";
import devtechreducers from "./devtechReducer"

const reducers = combineReducers({
    devtech: devtechreducers
})
export default reducers

export type RootState = ReturnType<typeof reducers>