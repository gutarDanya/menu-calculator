import React from "react";
import styles from './MenuPage.module.css';
import { positions } from "../../Utils/Data";
import DishTypeContainer from "../../components/DishTypeContainer/DishTypeContainer";
import Dish from "../../components/Dish/Dish";
import { checkDish } from "../../Utils/scripts";

const MenuPage = () => {

    return (
        <div className={styles.page}>
            <h1 className={styles.headers}>Меню</h1>
            <div className={styles.menuContainer}>

                <DishTypeContainer title="Холодные закуски">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("ХОЛОДНЫЕ ЗАКУСКИ", dish)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="САЛАТЫ">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("САЛАТЫ", dish)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="ГОРЯЧИЕ ЗАКУСКИ">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("ГОРЯЧИЕ ЗАКУСКИ", dish)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="Супы">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("СУПЫ", dish)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="ГОРЯЧИЕ ЗАКУСКИ">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("ГОРЯЧИЕ ЗАКУСКИ", dish)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="ГОРЯЧИЕ БЛЮДА">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("ГОРЯЧИЕ БЛЮДА", dish)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="ГРИЛЬ-МЕНЮ">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("ГРИЛЬ-МЕНЮ", dish)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="ГАРНИРЫ">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("ГАРНИРЫ", dish)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="ХЛЕБ И ВЫПЕЧКА">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("ХЛЕБ И ВЫПЕЧКА", dish)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="НАПИТКИ">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("НАПИТКИ", dish)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="ФУРШЕТНОЕ МЕНЮ">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("ФУРШЕТНОЕ МЕНЮ", dish)
                    })}
                </DishTypeContainer>

                <DishTypeContainer title="НОВИНКИ">
                    {positions && positions.length > 0 && positions.map((dish) => {
                        return checkDish("НОВИНКИ", dish)
                    })}
                </DishTypeContainer>
            </div>
        </div>
    )
}

export default MenuPage