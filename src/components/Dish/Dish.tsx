import React from "react";
import styles from './Dish.module.css';
import { Tposition } from "../../Utils/Types";
import { useAppDispatch } from "../../services/store";
import { addPosition } from "../../services/Slices/MenuSlices";

const Dish: React.FC<Props> = ({ dish }) => {
    const dispatch = useAppDispatch();

    const sendPosition = () => {
        dispatch(addPosition(dish))
    }

    return (
        <button type='button' className={styles.container} onClick={sendPosition}>
            <div className={styles.infoContainer}>
                <h3 className={styles.name}>{dish.name}</h3>
                <p className={styles.description}>{dish.description}</p>
            </div>
            <p className={styles.text}>вес:{dish.weight}</p>
            <p className={styles.text}>цена:{dish.price}</p>
        </button>
    )
}

type Props = {
    dish: Tposition
}

export default Dish