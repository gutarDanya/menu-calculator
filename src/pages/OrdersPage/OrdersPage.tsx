import React, { useState } from "react";
import styles from './OrdersPage.module.css';
import Order from "../../components/Order/Oder";
import { Torder, TsendedOrder } from "../../Utils/Types";
import { useAppDispatch } from "../../services/store";
import { getAllOrders } from "../../services/Slices/OrdersSlice";
import {  mainPositions } from "../../Utils/Data";

const OrdersPage: React.FC<Props> = ({orders}) => {

    const dispatch = useAppDispatch();

    const [order, setOrder] = useState("");

    function AddOrder (str: string) {
        localStorage.setItem("orders", JSON.stringify([...JSON.parse(localStorage.getItem("orders")!), JSON.parse(str)]));
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.header}>Заказы</h1>
            <div className={styles.ordersContainer}>
                {orders && orders.length > 0 && orders.map((order: any) => {
                    return <Order order={order} />
                })}
            </div>
            <form className={styles.formContainer}>
                <input className={styles.input} placeholder="строка с данными" value={order} onChange={(e) => {setOrder(e.target.value)}} />
                <button type="submit" className={styles.button} onClick={(e) => {
                    e.preventDefault()
                     AddOrder(order)}}>Добавить заказ</button>
            </form>
        </div>
    )
}

type Props = {
    orders: Array<TsendedOrder>
}

export default OrdersPage;