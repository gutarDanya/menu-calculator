import React, { useState } from "react";
import styles from './AddPositionPopup.module.css';
import { useAppDispatch } from "../../services/store";
import { addExtraPosition } from "../../services/Slices/MenuSlices";
import { v4 as uuid4 } from "uuid";

const AddPositionPopup = () => {
    const dispatch = useAppDispatch();
    const [extraPosition, setExtraPosition] = useState({ name: "", weight: "", count: 0, price: 0 });

    function addPosition(evt: any) {
        evt.preventDefault();
        dispatch(addExtraPosition({ ...extraPosition, id: uuid4() }))
    }

    return (
        <form className={styles.container} noValidate={false}>
            <label className={styles.labelContainer}>
                название позиции
                <input className={styles.input} placeholder="наименование" required={true} minLength={3} value={extraPosition.name} onChange={(e) => { setExtraPosition({ ...extraPosition, name: e.target.value }) }} />
            </label>

            <label className={styles.labelContainer}>
                вес
                <input className={styles.input} placeholder="1 позиции" value={extraPosition.weight} onChange={(e) => { setExtraPosition({ ...extraPosition, weight: e.target.value }) }} />
            </label>

            <label className={styles.labelContainer}>
                колличество
                <input className={styles.input} defaultValue={0} type="number" required={true} value={extraPosition.count} onChange={(e) => { setExtraPosition({ ...extraPosition, count: Number(e.target.value) }) }} />
            </label>

            <label className={styles.labelContainer}>
                Цена 1 позиции
                <input className={styles.input} defaultValue={0} type="number" required={true} value={extraPosition.price} onChange={(e) => { setExtraPosition({ ...extraPosition, price: Number(e.target.value) }) }} />
            </label>
            <button className={styles.submitButton} type='submit' onClick={e => addPosition(e)}>Добавить</button>
        </form>
    )
}

export default AddPositionPopup;