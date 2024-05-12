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
            
        },
        increment(state, action: PayloadAction<Tposition>) {
            state.currentOrder!.dishes = state.currentOrder!.dishes.map((pos) => {
                return pos.id == action.payload.id ? { ...pos, count: pos.count! + 1 } : pos
            })

            localStorage.setItem("orders", JSON.stringify(JSON.parse(
                localStorage.getItem("orders")!).map((order: TsendedOrder) => {
                     return order.id == state.currentOrder!.id ? order.dishes.map((dish) => {
                         return dish.id == action.payload.id ? { ...dish, count: dish.count! + 1 } : dish 
                        }) : order 
                    }
            )))
        },
        decrement(state, action: PayloadAction<Tposition>) {
            state.currentOrder!.dishes = state.currentOrder!.dishes.map((pos) => {
                return pos.id == action.payload.id ? { ...pos, count: pos.count! - 1 } : pos
            })

            localStorage.setItem("orders", JSON.stringify(JSON.parse(
                localStorage.getItem("orders")!).map((order: TsendedOrder) => {
                     return order.id == state.currentOrder!.id ? order.dishes.map((dish) => {
                         return dish.id == action.payload.id ? { ...dish, count: dish.count! -1 } : dish 
                        }) : order 
                    }
            )))
        },
        deleteOrder (state, action: PayloadAction<string>) {
            state.orders = state.orders.filter((order) => {return order.id != action.payload});

            localStorage.setItem("orders", JSON.stringify(JSON.parse(
                localStorage.getItem("orders")!).filter((order: TsendedOrder) => {return order.id != action.payload})
            ))
        },
        addOrder(state, action: PayloadAction<any>) {

            const {data, dishes} = action.payload;

            state.orders = [...state.orders, {
                date: data.date,
                dishes: dishes,
                id: "1852701",
                name: data.name,
                description1: data.description1,
                description2: data.description2,
            }]
        },
        getCurrentOrder(state, action: PayloadAction<string>) {
            state.currentOrder = state.orders.find((order) => { return order.id == action.payload }) || state.currentOrder
        }
    }
})

// order.dishes.map((id) => { return action.payload.find((dish) => { return dish.id == id.id }) })

export const { getAllOrders, getCurrentOrder, increment, decrement, deleteOrder, addOrder } = OrdersSlice.actions
export default OrdersSlice.reducer