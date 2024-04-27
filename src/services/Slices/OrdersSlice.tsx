import React from "react";
import { Torder, Tposition, TsendedOrder } from "../../Utils/Types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";;

type TinitialState = {
    orders: Array<Torder>;
    currentOrder: Torder | null
}

const initialState: TinitialState = {
    orders: [],
    currentOrder: null
}

const OrdersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        getAllOrders(state, action: PayloadAction<Array<Tposition>>) {
            state.orders = JSON.parse(localStorage.getItem("orders")!).map((order: TsendedOrder) => {
                return { ...order, dishes: order.dishes.map((id) => { return action.payload.find((dish) => { return dish.id == id }) }) }
            })
        },
        getCurrentOrder(state, action: PayloadAction<string>) {
            state.currentOrder = state.orders.find((order) => { return order.id == action.payload }) || state.currentOrder
        }
    }
})

export const { getAllOrders, getCurrentOrder } = OrdersSlice.actions
export default OrdersSlice.reducer