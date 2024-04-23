import React from "react";
import { Tposition } from "./Types";
import Dish from "../components/Dish/Dish";

export const checkDish = (type: string, data: Tposition) => {
    if (data.type == type) {
        return <Dish dish={data} />
    } else {
        return null
    }
}