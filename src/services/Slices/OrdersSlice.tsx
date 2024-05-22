import React from "react";
import { TLocalDishes, TLocalMenu, TMenu, Torder, Tposition, TsendedOrder } from "../../Utils/Types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";import { changeLocalCountOfOrder, handleChangeCountMenu, removePosFromOrder } from "../../Utils/scripts";
;

type TinitialState = {
    orders: Array<TsendedOrder>;
    currentOrder: any;
    currentDishes: any
}

const initialState: TinitialState = {
    orders: [],
    currentOrder: null,
    currentDishes: []
}

const OrdersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        getAllOrders(state, action: PayloadAction<string>) {
            state.orders = JSON.parse(action.payload)
        },
        increment(state, action: PayloadAction<Tposition>) {
            const SelectedPosition = action.payload
            state.currentOrder!.dishes = state.currentOrder.dishes.map((menu: TLocalMenu) => {return menu.nameMenu === SelectedPosition.menu
                ? {...menu, sections: menu.sections.map((section) => {return section.name === SelectedPosition.type
                    ? {...section, positions: section.positions.map((position) => {return position.id === SelectedPosition.id
                        ? {...position, count: position.count + 1}
                        : position
                    })}
                    : section
                })}
                : menu
            })
            changeLocalCountOfOrder(state.currentOrder.id, SelectedPosition, true)
        },

        decrement(state, action: PayloadAction<Tposition>) {
            const SelectedPosition = action.payload
            state.currentOrder!.dishes = state.currentOrder.dishes.map((menu: TLocalMenu) => {return menu.nameMenu === SelectedPosition.menu
                ? {...menu, sections: menu.sections.map((section) => {return section.name === SelectedPosition.type
                    ? {...section, positions: section.positions.map((position) => {return position.id === SelectedPosition.id
                        ? position.count === 1 ? null : {...position, count: position.count - 1}
                        : position
                    }).filter((pos) => {return pos !== null})}
                    : section
                })}
                : menu
            })
            changeLocalCountOfOrder(state.currentOrder.id, SelectedPosition, false)
        },

        deletePosFromOrder(state, action: PayloadAction<Tposition>) {
            removePosFromOrder(state.currentOrder.id, action.payload)
        },

        deleteOrder (state, action: PayloadAction<string>) {
            state.orders = state.orders.filter((order) => {return order.id != action.payload});

            localStorage.setItem("orders", JSON.stringify(JSON.parse(
                localStorage.getItem("orders")!).filter((order: TsendedOrder) => {return order.id != action.payload})
            ))
        },

        addOrder(state, action: PayloadAction<{data: {date: string, name: string, description1: string, description2: string}, dishes: Array<TLocalDishes>, id: string}>) {

            const {data, dishes, id} = action.payload;

            state.orders = [...state.orders, {
                date: data.date,
                dishes: dishes,
                id: id,
                name: data.name,
                description1: data.description1,
                description2: data.description2,
            }]
        },
        getAllDishes (state) {
            const menu = state.currentOrder.dishes;
            const arr = [];

            state.currentDishes = menu
        },
        getCurrentOrder(state, action: PayloadAction<{id: string, menu: Array<TMenu>}>) {
            const {id, menu} = action.payload;

            const currentOrder = state.orders.find((order) => {return order.id === id})!
            
            const currentDishes = menu.map((menu) => {
                const arr = currentOrder.dishes.find((dish) => {return dish.menu === menu.nameMenu})

                let newSections = null
                if (arr?.menu === menu.nameMenu) {
                    newSections = menu.menu.map((section) => {
                        const menus = currentOrder.dishes.find((dish) => {return dish.type === section.name})

                        const newPositions = section.positions.map((position) => {
                            const selectedPosition = currentOrder.dishes.find((pos) => {return pos.id === position.id})
                            let currrentPosition = null
                                if (selectedPosition?.id === position.id) {
                                    currrentPosition = {...position, count: selectedPosition.count}
                                }
                                return currrentPosition
                            }).filter((pos) => {return pos !== null})

                        return menus?.type === section.name && menus.menu === menu.nameMenu ? {name: section.name, positions: newPositions} : null
                    }).filter((section) => {return section !== null})
                }

                return arr?.menu === menu.nameMenu ? {nameMenu: menu.nameMenu, sections: newSections} : null
            }).filter((menu) => {return menu != null})

            if (currentOrder.dishes.some((dish) => {return dish.menu === "EXTRA MENU"})) {
                currentDishes.push({nameMenu: "Дополнительно", sections: [{name: "дополнительно", positions: currentOrder.dishes.filter((pos) => {return pos.menu === "EXTRA MENU"})}]})
            }

            state.currentOrder = {...currentOrder, dishes: currentDishes}
        }
    }
})

export const { getAllOrders, getCurrentOrder, increment, decrement, deleteOrder, addOrder, deletePosFromOrder, getAllDishes } = OrdersSlice.actions
export default OrdersSlice.reducer