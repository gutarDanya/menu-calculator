import React from "react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TMenu, Tposition } from "../../Utils/Types";
import { findNeddenMenuToChangePosition, handleChangeCount, sendOrder } from "../../Utils/scripts";
import { v4 as uuid4 } from "uuid";

type TinitialState = {
    menu: Array<TMenu>;
    currentPositions: Array<Tposition>;
    shirmOpened: boolean;
    stringOfOrder: string;
}

const initialState: TinitialState = {
    menu: [],
    currentPositions: [],
    shirmOpened: false,
    stringOfOrder: ""
}
const MenuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        getAllMenu(state, action: PayloadAction<string>) {
            state.menu = action.payload != null ? JSON.parse(action.payload) : []
        },

        addPosition(state, action: PayloadAction<Tposition>) {

            console.log(state.menu)
            
            state.menu = handleChangeCount(state.menu, action.payload, true)




            // state.currentPositions = state.menu.filter((pos) => {return pos.count})
        },

        addExtraPosition(state, action: PayloadAction<{name: string, weight: string | number, id: string, count: number, price: number}>) {
            state.currentPositions = [...state.currentPositions, {
                name: action.payload.name,
                price: action.payload.price,
                id: action.payload.id,
                count: action.payload.count,
                weight: action.payload.weight,
                description: "",
                type: "EXTRA POS",
                menu: "EXTRA MENU"
            }]
        },
        removePosition(state, action: PayloadAction<Tposition>) {
            //unworked
            state.currentPositions = state.currentPositions.filter((pos) => {return pos.id != action.payload.id})
            console.log(state.menu)

            state.menu = handleChangeCount(state.menu, action.payload, false)
        },
        decrementPosition (state, action: PayloadAction<Tposition>) {
            //unworked

            state.menu = handleChangeCount(state.menu, action.payload, false)

        },
        saveOrder(state, action: PayloadAction<any>) {
            const {date, name, description1, description2} = action.payload

            const arr = state.currentPositions.map((dish) => {return dish.type != "EXTRA POS" ? {id: dish.id, count: dish.count!}: dish})
            sendOrder(arr, name, date, description1, description2)
        },
        createStringOfOrder(state,action: PayloadAction<any>) {
            const {date, name, description1, description2} = action.payload

            const arr = state.currentPositions.map((dish) => {return dish.type == "EXTRA POS" ? dish : {id: dish.id, count: dish.count!}})

            state.stringOfOrder = JSON.stringify({dishes: arr, date: date, name: name, description1: description1, description2:description2, id: uuid4()})
        },
        switchShirm(state) {
            state.shirmOpened = !state.shirmOpened
        }
    }
})

export const {getAllMenu, addPosition, saveOrder, switchShirm, removePosition, decrementPosition, createStringOfOrder, addExtraPosition} = MenuSlice.actions
export default MenuSlice.reducer