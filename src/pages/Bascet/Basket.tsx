import React, { useRef, useState } from "react";
import styles from './Basket.module.css';
import { useAppDispatch, useAppSelector } from "../../services/store";
import Dish from "../../components/Dish/Dish";
import { createStringOfOrder, removePosition, saveOrder } from "../../services/Slices/MenuSlices";
import { Tposition } from "../../Utils/Types";
import { addPosition } from "../../services/Slices/MenuSlices";
import { decrementPosition } from "../../services/Slices/MenuSlices";
import { getCookie } from "../../Utils/Cookie";
import { v4 as uuid4 } from 'uuid';
import { useLocation, useNavigate } from "react-router-dom";
import copy from '../../Utils/images/copy.svg';
import { addOrder } from "../../services/Slices/OrdersSlice";

const Basket = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const positions = useAppSelector(state => state.MenuSlices.currentPositions);


    const totalPrice = positions.reduce((acc: any, item: Tposition) => {
        return acc + item.price * item.count!
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

    const [newPosition, setNewPosition] = useState({
        name: "0",
        description: "",
        price: 0,
        id: 0,
        weight: 0,
        type: "ДОПОЛНИТЕЛЬНЫЕ"
    })
    
    function navigateAddPosition () {
        navigate("/basket/add-position", {state: {background: location}})
    }

    const submitForm = (evt: any) => {
        evt.preventDefault();
        if (getCookie("logined") == "logined") {
            dispatch(saveOrder(dataOfOrder))
            dispatch(addOrder({data: dataOfOrder, dishes: positions}))
            navigate('/')
        } else {
            dispatch(createStringOfOrder(dataOfOrder))
            navigate("/basket/shifr", {state: {background: location}})
        }
    }

    // const testFunc = () => {
    //     console.log(JSON.parse(localStorage.getItem('orders') || '{}'))
    // }

    return (
        <div className={styles.page}>
            <h1 className={styles.header}>Корзина</h1>
            <form className={styles.positionsContainer}>
                {positions && positions.length > 0 && positions.map((dish) => {
                    return dish.count! > 0 ? <Dish removedPos={true} dish={dish} handleClick={removeFromOrder} incrementPosition={increment} decrementPosition={decrement} /> : null
                })}
                <button type="button" className={styles.addPositionButton} onClick={navigateAddPosition}>Добавить позицию в заказ</button>
                <div className={styles.inputs}>
                    <div className={styles.inputsContainer}>
                        <input className={styles.input} value={dataOfOrder.name} onChange={(e) => { setDataOfOrder({ ...dataOfOrder, name: e.target.value }) }} type='text' placeholder="ваше имя" />
                        <input className={styles.input} type='date' onChange={(e) => { setDataOfOrder({ ...dataOfOrder, date: e.target.value }); console.log(dataOfOrder.date) }} />
                    </div>
                    <div className={styles.textareaContainer}>
                        <textarea className={styles.textarea} placeholder="описание 1" value={dataOfOrder.description1} onChange={(e) => { setDataOfOrder({ ...dataOfOrder, description1: e.target.value }) }} />
                        <textarea className={styles.textarea} placeholder="описание 2" value={dataOfOrder.description2} onChange={(e) => { setDataOfOrder({ ...dataOfOrder, description2: e.target.value }) }} />
                    </div>
                </div>
                <p className={styles.totalKPI}>Общая стоимость: {totalPrice}₽</p>
                <button className={styles.submitButton} type="submit" onClick={(e) => { submitForm(e) }}>Сохранить</button>
            </form>
        </div>
    )
}

export default Basket;