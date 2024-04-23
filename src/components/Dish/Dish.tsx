import React from "react";
import styles from './Dish.module.css';
import { Tposition } from "../../Utils/Types";

const Dish: React.FC<Props> = ({ dish }) => {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <h3 className={styles.name}>{dish.name}</h3>
                <p className={styles.description}>{dish.description}</p>
            </div>
            <p className={styles.text}>вес:{dish.weight}</p>
            <p className={styles.text}>цена:{dish.price}</p>
        </div>
    )
}

type Props = {
    dish: Tposition
}

export default Dish