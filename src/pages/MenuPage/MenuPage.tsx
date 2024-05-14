import React from "react";
import styles from './MenuPage.module.css';

import DishTypeContainer from "../../components/DishTypeContainer/DishTypeContainer";
import { checkDish } from "../../Utils/scripts";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { TMenu, Tposition } from "../../Utils/Types";
import { addPosition } from "../../services/Slices/MenuSlices";
import { decrementPosition as decrement } from "../../services/Slices/MenuSlices";
import Dish from "../../components/Dish/Dish";

const MenuPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const menus = useAppSelector((state) => state.MenuSlices.menu);

    console.log(menus)
    const menu = menus.find((menu) => menu.routing == id);
    const positionsInBusket = useAppSelector(state => state.MenuSlices.currentPositions);

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
            <h1 className={styles.headers}>{menu?.nameMenu}</h1>
            <div className={styles.menuContainer}>
            {menu?.menu && menu?.menu.length > 0 && menu?.menu.map((section) => {
                return <DishTypeContainer title={section.name}>
                {section.positions && section.positions.length > 0 && section.positions.map((dish) => {
                    return <Dish dish={dish} removedPos={false} handleClick={CheckPos} incrementPosition={incrementPosition} decrementPosition={decrementPosition} />
                })}
            </DishTypeContainer>
            })}

            </div>
            <button className={styles.basketButton} type="button" onClick={chekOrder}>{positionsInBusket.length > 0 ? <p className={styles.count}>{positionsInBusket.length}</p> : null}Корзина</button>
        </div>
    )
}

type Props = {
    menu: TMenu
}

export default MenuPage