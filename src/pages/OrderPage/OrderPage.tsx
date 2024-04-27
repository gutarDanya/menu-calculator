import React, { useEffect } from "react";
import styles from './OrderPage.module.css';
import { useAppDispatch, useAppSelector } from "../../services/store";
import { useParams } from "react-router-dom";
import { getCurrentOrder } from "../../services/Slices/OrdersSlice";
import Dish from "../../components/Dish/Dish";
import { Tposition } from "../../Utils/Types";

const OrderPage = () => {

    const dispatch = useAppDispatch()

    const { id } = useParams();

    const orders = useAppSelector(state => state.OrdersSlice.orders);

    useEffect(() => {
        dispatch(getCurrentOrder(id!))
    }, [orders])

    const order = useAppSelector(state => state.OrdersSlice.currentOrder);

    const totalPrice = order.dishes.reduce((acc: any, item:Tposition) => {
        return acc + item.price
    }, 0)


    return (
        order.name != ""
            ? (<div className={styles.page}>
                <h1 className={styles.header}>Заказ: {order.name}</h1>
                <div className={styles.dishesContainer}>
                    {order.dishes && order.dishes.length > 0 && order.dishes.map((dish) => {
                        return <Dish dish={dish} />
                    })}
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