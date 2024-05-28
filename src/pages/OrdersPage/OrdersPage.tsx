import React, { useState } from "react";
import styles from './OrdersPage.module.css';
import Order from "../../components/Order/Oder";
import { Torder, TsendedOrder } from "../../Utils/Types";
import { useAppDispatch } from "../../services/store";
import { addOrderFromString } from "../../services/Slices/OrdersSlice";
import {  mainPositions } from "../../Utils/Data";
import { useInput } from "../../Utils/hooks";

const OrdersPage: React.FC<Props> = ({orders}) => {

    const dispatch = useAppDispatch();

    const order = useInput("", {isEmpty: true})

    function AddOrder (str: string) {
        localStorage.setItem("orders", JSON.stringify([...JSON.parse(localStorage.getItem("orders")!), JSON.parse(str)]));
        dispatch(addOrderFromString(JSON.parse(order.value)))
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
                <input className={styles.input} placeholder="строка с данными" onBlur={e => order.onBlur(e)} value={order.value} onChange={e => order.onChange(e)} />
                {(order.isEmpty && order.isDirty) && <p className="errorText">Поле не должно быть пустым</p>}
                <button type="submit" className={order.inputValid ? styles.buttonInactive: styles.button} disabled={!order.inputValid} onClick={(e) => {
                    e.preventDefault()
                     AddOrder(order.value)}}>Добавить заказ</button>
            </form>
        </div>
    )
}

type Props = {
    orders: Array<TsendedOrder>
}

export default OrdersPage;