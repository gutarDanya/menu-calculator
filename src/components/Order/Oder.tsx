import React from "react";
import styles from './Order.module.css';
import { Torder, TsendedOrder } from "../../Utils/Types";
import { Link, useNavigate } from "react-router-dom";
import copy from '../../Utils/images/copy.svg';
import trash from '../../Utils/images/Trash_font_awesome.svg.png'
import { useAppDispatch, useAppSelector } from "../../services/store";
import { deleteOrder, getCurrentOrder } from "../../services/Slices/OrdersSlice";
import CopyToClipboard from "react-copy-to-clipboard";

const Order: React.FC<Props> = ({order}) => {
    const menus = useAppSelector(state => state.MenuSlices.menu)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleDelete = (evt: any) => {
        evt.stopPropagation()
        evt.preventDefault()
        dispatch(deleteOrder(order.id!))
    }

    async function handleNavigate (evt: any) {
        evt.preventDefault();
        await dispatch(getCurrentOrder({id: order.id, menu: menus}));
        navigate(`/menu-calculator/orders/${order.id}`);
    }

    return (
        <button onClick={handleNavigate} type="button" className={styles.container}>
            <h2 className={styles.name}>{order.name}</h2>
            <p className={styles.date}>{order.date}</p>
            <div onClick={(e) => {e.preventDefault(); e.stopPropagation()}}>
            <CopyToClipboard text={JSON.stringify(order)}>
            <img className={styles.copy} src={copy} />
            </CopyToClipboard>
            </div>
            <img className={styles.trash} src={trash} onClick={(e) => {handleDelete(e)}}/>
        </button>
    )
}

type Props = {
    order: Torder
}

export default Order
