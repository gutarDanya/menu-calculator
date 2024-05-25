import React, { useEffect, useState } from "react";
import styles from './AddPositionPopup.module.css';
import { useAppDispatch } from "../../services/store";
import { addExtraPosition } from "../../services/Slices/MenuSlices";
import { v4 as uuid4 } from "uuid";

const AddPositionPopup = () => {
    const dispatch = useAppDispatch();

    const [namePosition, setNamePosition] = useState("");
    const [weightPosition, setWeightPosition] = useState("");
    const [countPosition, setCountPosition] = useState(0);
    const [pricePosition, setPricePosition] = useState(0);


    function addPosition(evt: any) {
        evt.preventDefault();
        dispatch(addExtraPosition({ name: namePosition, weight: weightPosition, count: countPosition, price: pricePosition, id: uuid4() }))
    }

    return (
        <form className={styles.container} noValidate={false}>
            <label className={styles.labelContainer}>
                название позиции
                <input className={styles.input} name="name" placeholder="наименование" required={true} minLength={3} value={namePosition} onChange={(e) => { setNamePosition(e.target.value)}} />
            </label>

            <label className={styles.labelContainer}>
                вес
                <input className={styles.input} name="weigth" placeholder="1 позиции" value={weightPosition} onChange={(e) => { setWeightPosition(e.target.value)}} />
            </label>

            <label className={styles.labelContainer}>
                колличество
                <input className={styles.input} name="count" defaultValue={0} type="number" required={true} value={countPosition} onChange={(e) => { setCountPosition(Number(e.target.value)) }} />
            </label>

            <label className={styles.labelContainer}>
                Цена 1 позиции
                <input className={styles.input} name="price" defaultValue={0} type="number" required={true} value={pricePosition} onChange={(e) => { setPricePosition(Number(e.target.value)) }} />
            </label>
            <button className={styles.submitButton} type='submit' onClick={e => addPosition(e)}>Добавить</button>
        </form>
    )
}

export default AddPositionPopup;