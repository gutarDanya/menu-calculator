import React from "react";
import { TLocalDishes, TLocalMenu, TMenu, Torder, Tposition, TsendedOrder } from "../../Utils/Types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
 import { changeLocalCountOfOrder, handleChangeCountMenu, removePosFromOrder } from "../../Utils/scripts";
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
        increment(state, action: PayloadAction<{pos: Tposition, count?: number}>) {
            const {pos, count} = action.payload
            
            if (count || count === 0) {
                state.currentOrder = {...state.currentOrder, dishes: handleChangeCountMenu(state.currentOrder.dishes, pos, true, count)}
                state.currentDishes = state.currentDishes.map((dish: Tposition) => {return dish.id === pos.id && dish.type === pos.type && dish.menu === pos.menu
                    ? {...dish, count: count}
                    :dish
                })
                changeLocalCountOfOrder(state.currentOrder.id, pos, true, count)
            } else {
                state.currentOrder = {...state.currentOrder, dishes: handleChangeCountMenu(state.currentOrder.dishes, pos, true)}
                state.currentDishes = state.currentDishes.map((dish: Tposition) => {return dish.id === pos.id && dish.type === pos.type && dish.menu === pos.menu
                    ? {...dish, count: dish.count + 1}
                    :dish
                })
                changeLocalCountOfOrder(state.currentOrder.id, pos, true)
            }
        },

        decrement(state, action: PayloadAction<Tposition>) {
            const pos = action.payload

            state.currentOrder = {...state.currentOrder, dishes: handleChangeCountMenu(state.currentOrder.dishes, pos, false)}
                state.currentDishes = state.currentDishes.map((dish: Tposition) => {return dish.id === pos.id && dish.type === pos.type && dish.menu === pos.menu
                    ? {...dish, count: dish.count - 1}
                    :dish
                })
                changeLocalCountOfOrder(state.currentOrder.id, pos, false)
        },

        deletePosFromOrder(state, action: PayloadAction<Tposition>) {
            const pos = action.payload
            removePosFromOrder(state.currentOrder.id, action.payload)

            state.currentOrder = {...state.currentOrder!, dishes: state.currentOrder!.dishes.map((menu: TMenu) => {return menu.nameMenu === pos.menu
                ? {...menu, menu: menu.menu.map((section) => {return section.name === pos.type
                    ? {...section, positions: section.positions.map((position) => {return position.id === pos.id
                        ? null
                        : position
                    }).filter(pos => pos !== null)}
                    : section
                }).filter(section => section !== null)}
                : menu
            }).filter((menu:TMenu) => {return menu !== null})}

            state.orders = state.orders.map((order: TsendedOrder) => {return order === state.currentOrder.id
                ? {...order, dishes: order.dishes.map((dish: TLocalDishes) => {return dish.id !== pos.id
                    ? dish
                    :null
                 }).filter((dish) => {return dish !== null})}
                : order
            })
        },

        deleteOrder(state, action: PayloadAction<string>) {
            state.orders = state.orders.filter((order) => { return order.id != action.payload });

            localStorage.setItem("orders", JSON.stringify(JSON.parse(
                localStorage.getItem("orders")!).filter((order: TsendedOrder) => { return order.id != action.payload })
            ))
        },

        addOrder(state, action: PayloadAction<{ data: { date: string, name: string, description1: string, description2: string }, dishes: Array<TLocalDishes>, id: string }>) {

            const { data, dishes, id } = action.payload;

            const arr = dishes.map((dish) => { return dish.type != "EXTRA POS" ? { id: dish.id, count: dish.count, menu: dish.menu, type: dish.type } : dish })

            state.orders = [...state.orders, {
                date: data.date,
                dishes: arr,
                id: id,
                name: data.name,
                description1: data.description1,
                description2: data.description2,
            }]
        },
        addOrderFromString(state, action: PayloadAction<TsendedOrder>) {
            state.orders = [...state.orders, action.payload]
        },
        getAllDishes(state) {
            const menu = state.currentOrder.dishes;
            let arr: any = [];
            const secondArr = menu.forEach((menu: TMenu) => { menu.menu.forEach((section) => { arr.push(section) }) })

            state.currentDishes = arr
        },
        getCurrentOrder(state, action: PayloadAction<{ id: string, menu: Array<TMenu> }>) {
            const { id, menu } = action.payload;

            let allDishes: any = [];

            const currentOrder = state.orders.find((order) => { return order.id === id })!

            const { dishes }: { dishes: Array<TLocalDishes> } = currentOrder

            const currentDishes = menu.map((menu: TMenu) => {
                if (dishes.some((dish) => { return dish.menu === menu.nameMenu })) {
                    const dishesInThisMenu = dishes.filter((dish) => { return dish.menu === menu.nameMenu })

                    return {
                        ...menu, menu: menu.menu.map((section) => {
                            if (dishes.some((dish) => { return dish.menu == menu.nameMenu && dish.type === section.name })) {
                                const dishesInThisSection = dishesInThisMenu.filter((dish) => { return dish.type === section.name })

                                return {
                                    ...section, positions: section.positions.map((pos) => {
                                        if (dishesInThisSection.some((dish) => { return dish.id === pos.id })) {
                                            const needenDish = dishesInThisSection.find((dish) => { return dish.id === pos.id })!
                                            allDishes = [...allDishes, { ...pos, count: needenDish.count }]
                                            return {
                                                ...pos,
                                                count: needenDish.count
                                            }
                                        }

                                        return null
                                    }).filter((pos) => { return pos !== null })
                                }
                            }

                            return null
                        }).filter((section) => { return section !== null })
                    }
                }

                return null
            }).filter((menu) => { return menu !== null })

            if (currentOrder.dishes.some((dish) => { return dish.menu === "EXTRA MENU" })) {
                currentDishes.push({ nameMenu: "Дополнительно", routing: "", menu: [{ name: "дополнительно", id: "", positions: currentOrder.dishes.filter((pos) => { return pos.menu === "EXTRA MENU" }) }] })
                currentOrder.dishes.forEach((dish) => dish.menu === "EXTRA MENU" ? allDishes = [...allDishes, dish] : null)
            }


            state.currentDishes = allDishes;
            state.currentOrder = { ...currentOrder, dishes: currentDishes }
        }
    }
})

export const { getAllOrders, getCurrentOrder, increment, decrement, deleteOrder, addOrder, deletePosFromOrder, getAllDishes, addOrderFromString } = OrdersSlice.actions
export default OrdersSlice.reducer