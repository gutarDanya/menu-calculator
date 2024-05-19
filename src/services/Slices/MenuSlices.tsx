import React from "react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TMenu, TSectionMenu, Tposition } from "../../Utils/Types";
import {
    removePosFromMenu,
    handleChangeCountCurrentMenu,
    handleChangeCountMenu,
    sendOrder
} from "../../Utils/scripts";
import { v4 as uuid4 } from "uuid";

type TinitialState = {
    menu: Array<TMenu>;
    currentPositions: Array<Tposition>;
    shirmOpened: boolean;
    stringOfOrder: string;
    currentMenu: TMenu | null;
    currentSection: TSectionMenu | null;
    selectedPosition: Tposition | null;
}

const initialState: TinitialState = {
    menu: [],
    currentPositions: [],
    shirmOpened: false,
    stringOfOrder: "",
    currentMenu: null,
    currentSection: null,
    selectedPosition: null
}

const MenuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        getAllMenu(state, action: PayloadAction<string>) {
            state.menu = action.payload != null ? JSON.parse(action.payload) : []
        },

        addPosition(state, action: PayloadAction<Tposition>) {
            state.menu = handleChangeCountMenu(state.menu, action.payload, true)
            state.currentPositions = handleChangeCountCurrentMenu(state.currentPositions, action.payload, true)
        },

        addExtraPosition(state, action: PayloadAction<{ name: string, weight: string | number, id: string, count: number, price: number }>) {
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
            state.currentPositions = state.currentPositions.filter((pos) => { return pos.menu === action.payload.menu ? pos.id !== action.payload.id : pos })

            state.menu = removePosFromMenu(state.menu, action.payload)
        },
        decrementPosition(state, action: PayloadAction<Tposition>) {
            state.menu = handleChangeCountMenu(state.menu, action.payload, false);
            state.currentPositions = handleChangeCountCurrentMenu(state.currentPositions, action.payload, false)

        },
        saveOrder(state, action: PayloadAction<any>) {
            const { date, name, description1, description2 } = action.payload;

            const arr = state.currentPositions.map((dish) => { return dish.type != "EXTRA POS" ? { id: dish.id, count: dish.count, menu: dish.menu, type: dish.type } : dish })
            sendOrder(arr, name, date, description1, description2)
        },
        createStringOfOrder(state, action: PayloadAction<any>) {
            const { date, name, description1, description2 } = action.payload

            const arr = state.currentPositions.map((dish) => { return dish.type == "EXTRA POS" ? dish : { id: dish.id, count: dish.count! } })

            state.stringOfOrder = JSON.stringify({ dishes: arr, date: date, name: name, description1: description1, description2: description2, id: uuid4() })
        },
        switchShirm(state) {
            state.shirmOpened = !state.shirmOpened
        },
        getCurrentMenu(state, action: PayloadAction<string>) {
            state.currentMenu = state.menu.find((menu) => { return menu.routing === action.payload })!
        },
        getCurrentSection(state, action: PayloadAction<string>) {
            state.currentSection = state.currentMenu!.menu.find((section) => { return section.id === action.payload })!
        },
        getSelectedPosition(state, action: PayloadAction<string | number>) {
            state.selectedPosition = state.currentSection!.positions.find((pos) => { return JSON.stringify(pos.id) === JSON.stringify(action.payload) })!
        }
    }
})

export const { getAllMenu,
    addPosition,
    saveOrder,
    switchShirm,
    removePosition,
    decrementPosition,
    createStringOfOrder,
    addExtraPosition,
    getCurrentMenu,
    getCurrentSection,
    getSelectedPosition } = MenuSlice.actions
export default MenuSlice.reducer