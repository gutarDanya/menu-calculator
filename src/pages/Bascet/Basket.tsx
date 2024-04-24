import React, { useState } from "react";
import styles from './Basket.module.css';
import { useAppSelector } from "../../services/store";
import Dish from "../../components/Dish/Dish";

const Basket = () => {
    const positions = useAppSelector(state => state.MenuSlices.currentPositions);

    const [dataOfOrder, setDataOfOrder] = useState({ date: "27.04.08", name: "" })

    return (
        <div className={styles.page}>
            <h1 className={styles.header}>Корзина</h1>
            <div className={styles.positionsContainer}>
                {positions && positions.length > 0 && positions.map((dish) => {
                    return (
                        <Dish dish={dish} />
                    )
                })}
                <div className={styles.inputs}>
                    <input className={styles.input} value={dataOfOrder.name} onChange={(e) => { setDataOfOrder({ ...dataOfOrder, name: e.target.value }); console.log(dataOfOrder.name)}} type='text' placeholder="ваше имя" />
                    <input className={styles.input} type='date' onChange={(e) => { setDataOfOrder({ ...dataOfOrder, date: e.target.value }); console.log(dataOfOrder.date)}}/>
                </div>
            </div>
        </div>
    )
}

export default Basket;