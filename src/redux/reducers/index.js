import isLoggedInReducer from "./isLoggedInReducer";
import tenantCreateReducer from "./tenantCreateReducer";
import userCreateReducer from "./userCreateReducer";
import { combineReducers } from "redux";

const allReducer = combineReducers({
    isLoggedInReducer,
    tenantCreateReducer,
    userCreateReducer,
});

export default allReducer;
