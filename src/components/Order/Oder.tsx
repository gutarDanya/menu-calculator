import React from "react";
import styles from './Order.module.css';
import { TsendedOrder } from "../../Utils/Types";
import { Link } from "react-router-dom";

const Order: React.FC<Props> = ({order}) => {
    return (
        <Link to={order.id!}className={styles.container}>
            <h2 className={styles.name}>{order.name}</h2>
            <p className={styles.date}>{order.date}</p>
        </Link>
    )
}

type Props = {
    order: TsendedOrder
}

export default Order