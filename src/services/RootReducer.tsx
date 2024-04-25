import { combineReducers } from "redux";
import MenuSlices from "./Slices/MenuSlices";
import OrdersSlice from "./Slices/OrdersSlice";


export const rootReducer = combineReducers({
    MenuSlices,
    OrdersSlice
})