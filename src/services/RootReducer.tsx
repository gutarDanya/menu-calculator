import { combineReducers } from "redux";
import MenuSlices from "./Slices/MenuSlices";
import OrdersSlice from "./Slices/OrdersSlice";
import LoginSlice from "./Slices/LoginSlice";


export const rootReducer = combineReducers({
    MenuSlices,
    OrdersSlice,
    LoginSlice
})