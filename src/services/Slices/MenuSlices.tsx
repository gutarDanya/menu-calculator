import React from "react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TMenu, TSectionMenu, Tposition } from "../../Utils/Types";
import {
    removePosFromMenu,
    handleChangeCountCurrentMenu,
    handleChangeCountMenu,
    sendOrder,
    addNewMenuToStorage,
    addNewSectionToStorage,
    addNewPositionToStorage,
    setNewMenu
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
        addMenuToStorage(state, action: PayloadAction<{name: string, routing: string}>) {
            state.menu = [...state.menu, {nameMenu: action.payload.name, routing: action.payload.routing, menu: []}]

            addNewMenuToStorage(action.payload.name, action.payload.routing)
        },
        removeMenuFromStorage(state, action: PayloadAction<string>) {
            state.menu = state.menu.filter((menu) => {return menu.routing !== action.payload});
            
            setNewMenu(state.menu)
        },
        getCurrentSection(state, action: PayloadAction<string>) {
            state.currentSection = state.currentMenu!.menu.find((section) => { return section.id === action.payload })!
        },

        addSectionToStorage(state, action: PayloadAction<{name: string, id: string}>) {
            state.currentMenu = {...state.currentMenu!, menu: [...state.currentMenu!.menu, {name: action.payload.name, id: action.payload.id, positions: []}]}

            state.menu = state.menu.map((menu) => {return menu.nameMenu === state.currentMenu!.nameMenu
                ?   {...menu, menu: [...menu.menu, {name: action.payload.name, id: action.payload.id, positions: []}]}
                : menu
            })

            // addNewSectionToStorage(action.payload.name, state.currentMenu.nameMenu, action.payload.id)
            setNewMenu(state.menu)
        },
        removeSectionFromStorage (state, action: PayloadAction<string>) {
            state.menu = state.menu.map((menu) => {return menu.nameMenu === state.currentMenu!.nameMenu
                ? {...menu, menu: menu.menu.filter((section) => {return section.id !== action.payload})}
                : menu
            })

            console.log(state.menu)

            state.currentMenu = {...state.currentMenu!, menu: state.currentMenu!.menu.filter((section) => {return section.id !== action.payload})!}

            setNewMenu(state.menu)
        },
        getSelectedPosition(state, action: PayloadAction<string | number>) {
            state.selectedPosition = state.currentSection!.positions.find((pos) => { return pos.id === action.payload })!
        },
        patchPosition(state, action: PayloadAction<{name: string, description: string, price: number, weight: string | number, id: string | number}>) {
            state.menu = state.menu.map((menu:TMenu) => {return menu.routing === state.currentMenu!.routing
                ?  {...menu, menu: menu.menu.map((section) => {return section.id === state.currentSection!.id
                    ? {...section, positions: section.positions.map((pos) => { return pos.id === action.payload.id 
                        ? {...pos,
                            name: action.payload.name,
                            description: action.payload.description,
                            price: action.payload.price,
                            weight: action.payload.weight
                        }
                        : pos
                    })}
                    : section
                })}
                : menu
            })
            state.currentSection = {...state.currentSection!, positions: state.currentSection!.positions.map((pos) => { return pos.id === action.payload.id
                ? {...pos,
                    name: action.payload.name,
                    description: action.payload.description,
                    price: action.payload.price,
                    weight: action.payload.weight
                }
                : pos
            })}
        },
        addPositionToStorage(state, action: PayloadAction<{name: string, description: string, price: number, weigth: string, id: string}>) {

            const newPos = {
                name: action.payload.name,
                price: action.payload.price,
                id: action.payload.id,
                weight: action.payload.weigth,
                description: action.payload.description,
                count: 0,
                type: state.currentSection!.name,
                menu: state.currentMenu!.nameMenu
            }

            state.currentSection = {...state.currentSection!, positions: [...state.currentSection!.positions, newPos]}

            state.menu = state.menu.map((menu) => {return menu.nameMenu === state.currentMenu!.nameMenu
                ? {...menu, menu: menu.menu.map((section) => {return section.name === state.currentSection!.name
                    ? {...section, positions: [...section.positions, newPos]}
                    : section
                })}
                : menu
            })
            setNewMenu(state.menu)
            // addNewPositionToStorage(state.currentMenu!.nameMenu, state.currentSection!.name, newPos)
        },
        removePostionFromStorage(state, action: PayloadAction<string>) {
            state.menu = state.menu.map((menu) => {return menu.nameMenu === state.currentMenu!.nameMenu
                ? {...menu, menu: menu.menu.map((section) => {return section.id === state.currentSection!.id
                    ? {...section, positions: section.positions.filter((pos) => {return JSON.stringify(pos.id) != action.payload})}
                    : section
                })}
                : menu
            })

            state.currentSection = {...state.currentSection!, positions: state.currentSection!.positions.filter((pos) => {
                return JSON.stringify(pos.id) !== action.payload
            })}

            setNewMenu(state.menu)
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
    addMenuToStorage,
    removeMenuFromStorage,
    getCurrentSection,
    addSectionToStorage,
    removeSectionFromStorage,
    getSelectedPosition,
    addPositionToStorage,
    removePostionFromStorage,
    patchPosition } = MenuSlice.actions
export default MenuSlice.reducer