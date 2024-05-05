import React from "react";
import styles from './Order.module.css';
import { TsendedOrder } from "../../Utils/Types";
import { Link, useNavigate } from "react-router-dom";
import copy from '../../Utils/images/copy.svg';
import trash from '../../Utils/images/Trash_font_awesome.svg.png'
import { useAppDispatch } from "../../services/store";
import { deleteOrder, getCurrentOrder } from "../../services/Slices/OrdersSlice";

const Order: React.FC<Props> = ({order}) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const copyOrder = (evt: any) => {
        evt.stopPropagation()
        evt.preventDefault()
        navigator.clipboard.writeText(JSON.stringify(JSON.parse(localStorage.getItem("orders")!).find((localOrder: TsendedOrder) => {return localOrder.id == order.id})))
    }

    const handleDelete = (evt: any) => {
        evt.stopPropagation()
        evt.preventDefault()
        dispatch(deleteOrder(order.id!))
    }

    async function handleNavigate () {
        await dispatch(getCurrentOrder(order.id!))
        navigate(`/orders/${order.id}`)
    }

    return (
        <button onClick={handleNavigate} type="button" className={styles.container}>
            <h2 className={styles.name}>{order.name}</h2>
            <p className={styles.date}>{order.date}</p>
            <img className={styles.copy} src={copy} onClick={(e) => {copyOrder(e)}}/>
            <img className={styles.trash} src={trash} onClick={(e) => {handleDelete(e)}}/>
        </button>
    )
}

type Props = {
    order: TsendedOrder
}

export default Order