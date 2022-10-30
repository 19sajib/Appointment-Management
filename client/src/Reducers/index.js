import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import appointReducer from "./AppointReducer";

export const reducers = combineReducers ({authReducer, appointReducer})