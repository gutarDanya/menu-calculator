import React from "react";
import styles from './Dish.module.css';
import { Tposition } from "../../Utils/Types";
import { useAppDispatch } from "../../services/store";
import { addPosition } from "../../services/Slices/MenuSlices";
import trash from '../../Utils/images/Trash_font_awesome.svg.png'

const Dish: React.FC<Props> = ({ dish, removedPos, handleClick, incrementPosition, decrementPosition, counterWork = true }) => {
    const dispatch = useAppDispatch();

    return (
        <button type='button' className={styles.container} onClick={() => { !removedPos ? handleClick(dish) : console.log('') }}>
            <div className={styles.infoContainer}>
                <h3 className={styles.name}>{dish.name}</h3>
                <p className={styles.description}>{dish.description}</p>
            </div>
            {
                dish.count && dish.count > 0 ? (<div className={styles.countContainer}>
                    <p className={styles.count}>{dish.count}</p>
                    (<div className={styles.calculationContainer}>
                        <button className={styles.calculation} onClick={(e) => { e.preventDefault(); e.stopPropagation(); incrementPosition(dish) }}>▲</button>
                        <button className={styles.calculation} onClick={(e) => { e.preventDefault(); e.stopPropagation(); decrementPosition(dish) }}>▼</button>
                    </div>)
                </div>) : null
            }
            <div className={styles.paramsContainer}>
                <p className={styles.text}>вес: {dish.weight}</p>
                <p className={styles.text}>цена: {dish.price}</p>
                {removedPos ? <img src={trash} onClick={(e) => { e.preventDefault(); e.stopPropagation(); removedPos ? handleClick(dish) : console.log('') }} alt='удалить' className={styles.trash} /> : null}
            </div>
        </button>
    )
}

type Props = {
    dish: Tposition;
    removedPos: boolean;
    handleClick: (arg: Tposition) => any;
    incrementPosition: (arg: Tposition) => any;
    decrementPosition: (arg: Tposition) => any;
    counterWork?: boolean;
}

export default Dish