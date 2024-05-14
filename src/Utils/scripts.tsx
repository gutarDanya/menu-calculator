import React from "react";
import { TMenu, TSectionMenu, Tposition } from "./Types";
import Dish from "../components/Dish/Dish";
import { mainPositions, childMenuGraduates } from "./Data";

import {v4 as uuid4} from 'uuid'
import { decrement } from "../services/Slices/OrdersSlice";

export const checkDish = (type: string, data: Tposition, removed: boolean, handleClose: (arg: Tposition) => any, incrementPosition: (arg: Tposition) => any, decrementPosition: (arg: Tposition) => any) => {
    if (data.type == type) {
        return <Dish dish={data} removedPos={removed} handleClick={handleClose} decrementPosition={decrementPosition} incrementPosition={incrementPosition}/>
    } else {
        return null
    }
}

export const sendOrder = (array: Array<{id: string | number; count: number| string, menu: string} | Tposition>, name: string, date: string | number, description1: string, description2: string ) => {

    const newOrder = {dishes: array, name: name, date: date, id: uuid4(), description1, description2};
    if (!localStorage.getItem('orders')) {
        localStorage.setItem("orders", JSON.stringify([]))
    }
    localStorage.setItem("orders", JSON.stringify([...JSON.parse(localStorage.getItem('orders')!), newOrder]))
}

export function checkSotrage () {
    if (localStorage.getItem("orders") == null) {
         localStorage.setItem("orders", JSON.stringify([]))
    }
    if (localStorage.getItem("menu") == null) {
          localStorage.setItem("menu", JSON.stringify([mainPositions, childMenuGraduates]))
    }
}

export function findNeddenMenuToChangePosition (menu: Array<TMenu>, id: string): TMenu {
    return menu.find((menu) => {return menu.nameMenu == id})!
}

export function handleChangeCountMenu (menus: Array<TMenu>, position: Tposition, increment: boolean): Array<TMenu> {
    return menus.map((menui) => {return menui.nameMenu === position.menu ? {...menui, menu: menui.menu.map((section) => {
        return section.name === position.type ? {...section, positions: section.positions.map((pos) => {return pos.id === position.id && pos.menu === position.menu && pos.type === position.type
            ? {...pos, count: increment ? pos.count + 1 : pos.count - 1}
            : pos
        })}
    : section
})}: menui
})
}

export function removePosFromMenu (menus: Array<TMenu>, position: Tposition): Array<TMenu> {
    return menus.map((menui) => {return menui.nameMenu === position.menu ? {...menui, menu: menui.menu.map((section) => {
        return section.name === position.type ? {...section, positions: section.positions.filter((pos) => {return pos.id != position.id})}
    : section
})}: menui
})
}

export function handleChangeCountCurrentMenu (positions: Array<Tposition>, position: Tposition, increment: boolean): Array<Tposition> {
    return positions.some((pos) => {return pos.menu === position.menu && pos.id === position.id})
    ? positions.map((pos) => {return pos.menu === position.menu && pos.id === position.id ? increment ? {...pos, count: pos.count + 1} : {...pos, count: pos.count - 1} : pos})
    : [...positions, position]
}