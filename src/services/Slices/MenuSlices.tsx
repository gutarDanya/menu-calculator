import React from "react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { positions } from "../../Utils/Data";
import { Tposition } from "../../Utils/Types";
import { sendOrder } from "../../Utils/scripts";
import { v4 as uuid4 } from "uuid";

type TinitialState = {
    menu: Array<Tposition>;
    currentPositions: Array<Tposition>;
    shirmOpened: boolean;
    stringOfOrder: string | null
}

const initialState: TinitialState = {
    menu: [],
    currentPositions: [],
    shirmOpened: false,
    stringOfOrder: null
}
const MenuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        getAllMenu(state, action: PayloadAction<Array<Tposition>>) {
            state.menu = action.payload
        },
        addPosition(state, action: PayloadAction<Tposition>) {
            state.menu = state.menu.map((pos) => {
                return pos.id == action.payload.id ? {...pos, count: pos.count ? pos.count + 1 : 1} : pos
            })

            state.currentPositions = state.menu.filter((pos) => {return pos.count})
        },
        removePosition(state, action: PayloadAction<Tposition>) {
            //unworked
            state.currentPositions = state.currentPositions.filter((pos) => {return pos.id != action.payload.id})

            state.menu = state.menu.map((pos) => {return pos.id == action.payload.id ? {...pos, count: 0} : pos})
        },
        decrementPosition (state, action: PayloadAction<Tposition>) {
            //unworked
            state.menu = state.menu.map((pos) => {
                return pos.id == action.payload.id ? {...pos, count: pos.count! - 1} : pos
            })

            state.currentPositions = state.currentPositions.map((pos) => {
                return pos.id == action.payload.id ? {...pos, count: pos.count! - 1} : pos
            })
        },
        saveOrder(state, action: PayloadAction<any>) {
            const {date, name, description1, description2} = action.payload

            const arr = state.currentPositions.map((dish) => {return {id: dish.id, count: dish.count!}})
            sendOrder(arr, name, date, description1, description2)
        },
        createStringOfOrder(state,action: PayloadAction<any>) {
            const {date, name, description1, description2} = action.payload

            const arr = state.currentPositions.map((dish) => {return {id: dish.id, count: dish.count!}})

            state.stringOfOrder = JSON.stringify({dishes: arr, date: date, name: name, description1: description1, description2:description2, id: uuid4()})
        },
        switchShirm(state) {
            state.shirmOpened = !state.shirmOpened
        }
    }
})

export const {getAllMenu, addPosition, saveOrder, switchShirm, removePosition, decrementPosition, createStringOfOrder} = MenuSlice.actions
export default MenuSlice.reducer