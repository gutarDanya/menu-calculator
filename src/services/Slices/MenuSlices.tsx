import React from "react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { positions } from "../../Utils/Data";
import { Tposition } from "../../Utils/Types";

type TinitialState = {
    menu: Array<Tposition>;
}

const initialState: TinitialState = {
    menu: []
}
const MenuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        getAllMenu(state, action: PayloadAction<Array<Tposition>>) {
            state.menu = action.payload
        }
    }
})

export default MenuSlice.reducer