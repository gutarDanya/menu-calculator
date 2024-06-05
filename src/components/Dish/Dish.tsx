import React from "react";
import styles from './Dish.module.css';
import { Tposition } from "../../Utils/Types";
import trash from '../../Utils/images/Trash_font_awesome.svg.png'
import { useInput } from "../../Utils/hooks";

const Dish: React.FC<Props> = ({ dish, removedPos, handleClick, incrementPosition, decrementPosition, removePosition, manyPositions }) => {

    const numberOfInput = useInput(dish.count === 0 ? 1 : dish.count, {isNumber: true, isEmpty: true});

    function blurInput (e: any) {
        numberOfInput.onBlur(e);
        if (numberOfInput.value === 0 || numberOfInput.value === "" ) {
            manyPositions(dish, 0)
        }
        else {
            manyPositions(dish, Number(numberOfInput.value))
        }
    }

    function clickContainer () {
        handleClick(dish);
        numberOfInput.onChange(dish.count === 0 ? 1 : dish.count + 1)
    }

    return (
        <button type='button' className={styles.container} onClick={() => { !removedPos ? clickContainer() : console.log('') }}>
            <div className={styles.infoContainer}>
                <h3 className={styles.name}>{dish.name}</h3>
                <p className={styles.description}>{dish.description}</p>
            </div>
            {
                dish.count && dish.count > 0 ? (<div className={styles.countContainer}>
                    <input value={numberOfInput.value} className={styles.input} onChange={e => numberOfInput.onChange(e)} onBlur={e => blurInput(e)} />
                    <div className={styles.calculationContainer}>
                        <button className={styles.calculation} onClick={(e) => {numberOfInput.onChange(Number(numberOfInput.value) + 1); e.preventDefault(); e.stopPropagation(); incrementPosition(dish) }}>▲</button>
                        <button className={styles.calculation} onClick={(e) => {numberOfInput.onChange(Number(numberOfInput.value) - 1); e.preventDefault(); e.stopPropagation(); decrementPosition(dish) }}>▼</button>
                    </div>
                </div>) : null
            }
            <div className={styles.paramsContainer}>
                <p className={styles.text}>вес: {dish.weight}</p>
                <p className={styles.text}>цена: {dish.price}</p>
                {removedPos ? <img src={trash} onClick={(e) => { e.preventDefault(); e.stopPropagation(); removedPos ? removePosition!(dish) : console.log()}} alt='удалить' className={styles.trash} /> : null}
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
    removePosition?: (arg: Tposition) => any; 
    manyPositions: any
}

export default Dish