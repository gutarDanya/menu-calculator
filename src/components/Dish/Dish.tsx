import React from "react";
import styles from './Dish.module.css';
import { Tposition } from "../../Utils/Types";
import { useAppDispatch } from "../../services/store";
import { addPosition } from "../../services/Slices/MenuSlices";

const Dish: React.FC<Props> = ({ dish, removed, handleClick }) => {
    const dispatch = useAppDispatch();
    
    return (
        <button type='button' className={styles.container} onClick={() => {handleClick(dish)}}>
            <div className={styles.infoContainer}>
                <h3 className={styles.name}>{dish.name}</h3>
                <p className={styles.description}>{dish.description}</p>
            </div>
            <p className={styles.text}>вес:{dish.weight}</p>
            <p className={styles.text}>цена:{dish.price}</p>
            {removed ? <img src='https://uxwing.com/wp-content/themes/uxwing/download/user-interface/red-trash-can-icon.png' alt='удалить' className={styles.trash}/> : null}
        </button>
    )
}

type Props = {
    dish: Tposition;
    removed: boolean;
    handleClick: (arg: Tposition) => any
}

export default Dish