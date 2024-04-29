import React from "react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { positions } from "../../Utils/Data";
import { Tposition } from "../../Utils/Types";
import { sendOrder } from "../../Utils/scripts";

type TinitialState = {
    menu: Array<Tposition>;
    currentPositions: Array<Tposition>;
    shirmOpened: boolean
}

const initialState: TinitialState = {
    menu: [],
    currentPositions: [],
    shirmOpened: false
}
const MenuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        getAllMenu(state, action: PayloadAction<Array<Tposition>>) {
            state.menu = action.payload
        },
        addPosition(state, action: PayloadAction<Tposition>) {
            state.currentPositions.push(action.payload)
        },
        removePosition(state, action: PayloadAction<Tposition>) {
            state.currentPositions = state.currentPositions.filter((pos) => {return pos.id != action.payload.id})
        },
        saveOrder(state, action: PayloadAction<any>) {
            const {date, name, description1, description2} = action.payload

            const arr = state.currentPositions.map((dish) => {return dish.id})
            sendOrder(arr, name, date, description1, description2)
        },
        switchShirm(state) {
            state.shirmOpened = !state.shirmOpened
        }
    }
})

export const {getAllMenu, addPosition, saveOrder, switchShirm, removePosition} = MenuSlice.actions
export default MenuSlice.reducer