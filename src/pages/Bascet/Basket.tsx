import React, { useState } from "react";
import styles from './Basket.module.css';
import { useAppDispatch, useAppSelector } from "../../services/store";
import Dish from "../../components/Dish/Dish";
import { saveOrder } from "../../services/Slices/MenuSlices";

const Basket = () => {

    const dispatch = useAppDispatch();
    const positions = useAppSelector(state => state.MenuSlices.currentPositions);

    const [dataOfOrder, setDataOfOrder] = useState({ date: "27.04.08", name: "" })

    const submitForm = (evt: any) => {
        evt.preventDefault();

        dispatch(saveOrder(dataOfOrder))
    }

    const testFunc = () => {
        console.log(JSON.parse(localStorage.getItem('orders') || '{}'))
    }


    return (
        <div className={styles.page}>
            <h1 className={styles.header}>Корзина</h1>
            <form className={styles.positionsContainer}>
                {positions && positions.length > 0 && positions.map((dish) => {
                    return (
                        <Dish dish={dish} />
                    )
                })}
                <div className={styles.inputs}>
                    <input className={styles.input} value={dataOfOrder.name} onChange={(e) => { setDataOfOrder({ ...dataOfOrder, name: e.target.value }); console.log(dataOfOrder.name)}} type='text' placeholder="ваше имя" />
                    <input className={styles.input} type='date' onChange={(e) => { setDataOfOrder({ ...dataOfOrder, date: e.target.value }); console.log(dataOfOrder.date)}}/>
                </div>
                <button className={styles.submitButton} type="submit" onClick={submitForm}>Сохранить</button>
                <button onClick={testFunc} type="button">Тест</button>
            </form>
        </div>
    )
}

export default Basket;