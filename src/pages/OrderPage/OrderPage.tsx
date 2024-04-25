import React, {useEffect} from "react";
import styles from './OrderPage.module.css';
import { useAppDispatch, useAppSelector } from "../../services/store";
import { useParams } from "react-router-dom";
import { getCurrentOrder } from "../../services/Slices/OrdersSlice";
import Dish from "../../components/Dish/Dish";

const OrderPage = () => {

    const dispatch = useAppDispatch()

    const {id} = useParams();

    const orders = useAppSelector(state => state.OrdersSlice.orders);

    useEffect(() => {
        dispatch(getCurrentOrder(id!))
    })

    const order = useAppSelector(state => state.OrdersSlice.currentOrder);

    console.log(order)

    return (
        order.name != ""
        ? (
        <div className={styles.dishesContainer}>
            {order.dishes && order.dishes.length > 0 && order.dishes.map((dish) => {
                return <Dish dish={dish}/>
            })}
        </div>
        )
        : null
    )
}

export default OrderPage;