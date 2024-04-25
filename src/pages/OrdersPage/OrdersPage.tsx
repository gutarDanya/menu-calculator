import React from "react";
import styles from './OrdersPage.module.css';
import Order from "../../components/Order/Oder";
import { TsendedOrder } from "../../Utils/Types";

const OrdersPage = () => {
    const orders = JSON.stringify("orders") ? JSON.parse(localStorage.getItem("orders")!) : []

    return (
        <div className={styles.page}>
            <h1 className={styles.header}>Заказы</h1>
            <div className={styles.ordersContainer}>
                {orders && orders.length > 0 && orders.map((order: TsendedOrder) => {
                    return <Order order={order} />
                })}
            </div>
        </div>
    )
}

export default OrdersPage;