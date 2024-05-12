import React, { useEffect, useState } from "react";
import styles from './OrderPage.module.css';
import { useAppDispatch, useAppSelector } from "../../services/store";
import { useParams } from "react-router-dom";
import { decrement, getAllOrders, getCurrentOrder, increment } from "../../services/Slices/OrdersSlice";
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
    }, []);

    const incrementPosition = async (pos: Tposition) => {
        await dispatch(increment(pos))
    }

    const decrementPosition = async (pos: Tposition) => {
        await dispatch(decrement(pos))
    }

    const order = useAppSelector(state => state.OrdersSlice.currentOrder);

    const totalPrice = order?.dishes.reduce((acc: any, item: Tposition) => {
        return acc + item.price * item.count!
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

                        return <Dish dish={dish} removedPos={true} handleClick={removePosition} incrementPosition={incrementPosition} decrementPosition={decrementPosition} />
                    })}
                    <div className={styles.descriptions}>
                        <div className={styles.descriptionContainer}>
                            <h3 className={styles.secondHeader}>Описание 1</h3>
                            <p className={styles.description}>{order.description1}</p>
                        </div>
                        <div className={styles.descriptionContainer}>
                            <h3 className={styles.secondHeader}>Описание 2</h3>
                            <p className={styles.description}>{order.description2}</p>
                        </div>
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