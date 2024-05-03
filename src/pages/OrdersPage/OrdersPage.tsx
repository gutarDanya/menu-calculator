import React, { useState } from "react";
import styles from './OrdersPage.module.css';
import Order from "../../components/Order/Oder";
import { TsendedOrder } from "../../Utils/Types";
import { useAppDispatch } from "../../services/store";

const OrdersPage = () => {

    const dispatch = useAppDispatch();

    const [order, setOrder] = useState("");

    const orders = JSON.stringify("orders") ? JSON.parse(localStorage.getItem("orders")!) : [];

    function AddOrder (str: string) {
        localStorage.setItem("orders", JSON.stringify([...JSON.parse(localStorage.getItem("orders")!), JSON.parse(str)]))
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.header}>Заказы</h1>
            <div className={styles.ordersContainer}>
                {orders && orders.length > 0 && orders.map((order: TsendedOrder) => {
                    return <Order order={order} />
                })}
            </div>
            <form className={styles.formContainer}>
                <input className={styles.input} placeholder="строка" value={order} onChange={(e) => {setOrder(e.target.value)}} />
                <button type="submit" className={styles.button} onClick={() => {AddOrder(order)}}>Добавить заказ</button>
            </form>
        </div>
    )
}

export default OrdersPage;