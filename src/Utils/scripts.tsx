import React from "react";
import { Tposition } from "./Types";
import Dish from "../components/Dish/Dish";
import {v4 as uuid4} from 'uuid'

export const checkDish = (type: string, data: Tposition) => {
    if (data.type == type) {
        return <Dish dish={data} />
    } else {
        return null
    }
}

export const sendOrder = (array: Array<string | number>, name: string, date: string | number ) => {

    const newOrder = {dishes: array, name: name, date: date, id: uuid4()};
    if (!localStorage.getItem('orders')) {
        localStorage.setItem("orders", JSON.stringify([]))
    }
    localStorage.setItem("orders", JSON.stringify([...JSON.parse(localStorage.getItem('orders')!), newOrder]))
}