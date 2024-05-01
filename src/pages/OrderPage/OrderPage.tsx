import React, { useEffect, useState } from "react";
import styles from './OrderPage.module.css';
import { useAppDispatch, useAppSelector } from "../../services/store";
import { useParams } from "react-router-dom";
import { getCurrentOrder } from "../../services/Slices/OrdersSlice";
import Dish from "../../components/Dish/Dish";
import { Tposition } from "../../Utils/Types";
import { removePosition } from "../../services/Slices/MenuSlices";

const OrderPage = () => {

    const [pageLoading, setPageLoading] = useState(false)

    const dispatch = useAppDispatch()

    const { id } = useParams();

    const orders = useAppSelector(state => state.OrdersSlice.orders);

    useEffect(() => {
        dispatch(getCurrentOrder(id!))
    }, [orders]);

    const incrementPosition = (pos: Tposition) => {
        console.log("написать функцию добавки в localStorage")
    }

    const decrementPosition = (pos: Tposition) => {
        console.log("написать уменьшение счётчика в localStorage")
    }

    const order = useAppSelector(state => state.OrdersSlice.currentOrder);

    const totalPrice = order?.dishes.reduce((acc: any, item:Tposition) => {
        return acc + item.price
    }, 0)

    const removePositionFromOrder = (pos: any) => {
        dispatch(removePosition(pos))
    }

    return (
        order
            ? (<div className={styles.page}>
                <h1 className={styles.header}>Заказ: {order.name}</h1>
                <div className={styles.dishesContainer}>
                    {order.dishes && order.dishes.length > 0 && order.dishes.map((dish) => {
                        return <Dish dish={dish} removedPos={true} handleClick={removePosition} incrementPosition={incrementPosition} decrementPosition={decrementPosition}/>
                    })}
                    <div className={styles.descriptions}>
                        <p className={styles.description}>{order.description1}</p>
                        <p className={styles.description}>{order.description2}</p>
                    </div>
                </div>
                <div className={styles.info}>
                    <p className={styles.totalPrice}>итоговая цена: {totalPrice}</p>
                </div>
            </div>
            )
            : null
    )
}

export default OrderPage;