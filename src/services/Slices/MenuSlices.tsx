import React from "react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { positions } from "../../Utils/Data";
import { Tposition } from "../../Utils/Types";

type TinitialState = {
    menu: Array<Tposition>;
    currentPositions: Array<Tposition>
}

const initialState: TinitialState = {
    menu: [],
    currentPositions: []
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
        }
    }
})

export const {getAllMenu, addPosition} = MenuSlice.actions
export default MenuSlice.reducer