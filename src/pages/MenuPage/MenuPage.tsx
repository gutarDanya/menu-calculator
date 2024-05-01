import React from "react";
import styles from './MenuPage.module.css';

import DishTypeContainer from "../../components/DishTypeContainer/DishTypeContainer";
import { checkDish } from "../../Utils/scripts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { Tposition } from "../../Utils/Types";
import { addPosition } from "../../services/Slices/MenuSlices";
import { decrementPosition as decrement } from "../../services/Slices/MenuSlices";

const MenuPage = () => {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const CheckPos = (pos: Tposition) => {
        dispatch(addPosition(pos))
    }

    const incrementPosition = (pos: Tposition) => {
        dispatch(addPosition(pos))
    }

    const decrementPosition = (pos: Tposition) => {
        dispatch(decrement(pos))
    }

    const positions = useAppSelector(state => state.MenuSlices.menu)
    const chekOrder = () => {
        navigate("/bascket");
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.headers}>Меню</h1>
            <div className={styles.menuContainer}>

                <DishTypeContainer title="Холодные закуски">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("ХОЛОДНЫЕ ЗАКУСКИ", dish, false, CheckPos, incrementPosition, decrementPosition)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="САЛАТЫ">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("САЛАТЫ", dish, false, CheckPos, incrementPosition, decrementPosition)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="ГОРЯЧИЕ ЗАКУСКИ">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("ГОРЯЧИЕ ЗАКУСКИ", dish, false, CheckPos, incrementPosition, decrementPosition)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="Супы">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("СУПЫ", dish, false, CheckPos, incrementPosition, decrementPosition)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="ГОРЯЧИЕ ЗАКУСКИ">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("ГОРЯЧИЕ ЗАКУСКИ", dish, false, CheckPos, incrementPosition, decrementPosition)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="ГОРЯЧИЕ БЛЮДА">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("ГОРЯЧИЕ БЛЮДА", dish, false, CheckPos, incrementPosition, decrementPosition)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="ГРИЛЬ-МЕНЮ">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("ГРИЛЬ-МЕНЮ", dish, false, CheckPos, incrementPosition, decrementPosition)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="ГАРНИРЫ">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("ГАРНИРЫ", dish, false, CheckPos, incrementPosition, decrementPosition)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="ХЛЕБ И ВЫПЕЧКА">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("ХЛЕБ И ВЫПЕЧКА", dish, false, CheckPos, incrementPosition, decrementPosition)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="НАПИТКИ">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("НАПИТКИ", dish, false, CheckPos, incrementPosition, decrementPosition)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="ФУРШЕТНОЕ МЕНЮ">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("ФУРШЕТНОЕ МЕНЮ", dish, false, CheckPos, incrementPosition, decrementPosition)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="НОВИНКИ">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("НОВИНКИ", dish, false, CheckPos, incrementPosition, decrementPosition)
                    })}
                </DishTypeContainer>
            </div>
            <button className={styles.basketButton} type="button" onClick={chekOrder}>Корзина</button>
        </div>
    )
}

export default MenuPage