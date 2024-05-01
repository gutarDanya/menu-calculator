import React, { useState } from "react";
import styles from './Basket.module.css';
import { useAppDispatch, useAppSelector } from "../../services/store";
import Dish from "../../components/Dish/Dish";
import { removePosition, saveOrder } from "../../services/Slices/MenuSlices";
import { Tposition } from "../../Utils/Types";
import { addPosition } from "../../services/Slices/MenuSlices";
import { decrementPosition } from "../../services/Slices/MenuSlices";

const Basket = () => {

    const dispatch = useAppDispatch();
    const positions = useAppSelector(state => state.MenuSlices.currentPositions);

    const totalPrice = positions.reduce((acc: any, item:Tposition) => {
        return acc + item.price
    }, 0);

    const removeFromOrder = (pos: Tposition) => {
        dispatch(removePosition(pos))
    }

    const decrement = (pos: Tposition) => {
        dispatch(decrementPosition(pos))
    }

    const increment = (pos: Tposition) => {
        dispatch(addPosition(pos))
        debugger
    }

    const [dataOfOrder, setDataOfOrder] = useState({ date: "27.04.08", name: "", description1: "", description2: "" })

    const [newPosition, setNewPosition] = useState({name: "0",
     description: "",
    price: 0,
    id: 0,
    weight: 0,
    type: "ДОПОЛНИТЕЛЬНЫЕ"})

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
                        <Dish dish={dish} handleClick={removeFromOrder} incrementPosition={increment} decrementPosition={decrement}/>
                    )
                })}
                <button type="button" className={styles.addPositionButton}>Добавить заказ</button>
                <div className={styles.inputs}>
                    <div className={styles.inputsContainer}>
                        <input className={styles.input} value={dataOfOrder.name} onChange={(e) => { setDataOfOrder({ ...dataOfOrder, name: e.target.value })}} type='text' placeholder="ваше имя" />
                        <input className={styles.input} type='date' onChange={(e) => { setDataOfOrder({ ...dataOfOrder, date: e.target.value }); console.log(dataOfOrder.date) }} />
                    </div>
                    <div className={styles.textareaContainer}>
                        <textarea className={styles.textarea} placeholder="описание 1" value={dataOfOrder.description1} onChange={(e) => { setDataOfOrder({ ...dataOfOrder, description1: e.target.value })}}/>
                        <textarea className={styles.textarea} placeholder="описание 2" value={dataOfOrder.description2} onChange={(e) => { setDataOfOrder({ ...dataOfOrder, description2: e.target.value })}}/>
                    </div>
                </div>
                <p className={styles.totalKPI}>{totalPrice}</p>
                <button className={styles.submitButton} type="submit" onClick={(e) => {submitForm(e)}}>Сохранить</button>
                <button onClick={testFunc} type="button">Тест</button>
            </form>
        </div>
    )
}

export default Basket;