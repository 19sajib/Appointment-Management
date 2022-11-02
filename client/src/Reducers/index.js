import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import appointReducer from "./AppointReducer";
import alretReducer from "./AlretReducer";

export const reducers = combineReducers ({alretReducer, authReducer, appointReducer})