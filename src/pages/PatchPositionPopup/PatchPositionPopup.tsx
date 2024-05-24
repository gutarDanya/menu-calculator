import React, { useState } from "react";
import styles from './PatchPositionPopup.module.css';
import { useAppDispatch, useAppSelector } from "../../services/store";
import { patchPosition } from "../../services/Slices/MenuSlices";
import { useNavigate } from "react-router-dom";

const PatchPositionPopup = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const curretPosition = useAppSelector(state => state.MenuSlices.position);
    const [namePosition, setNamePosition] = useState(curretPosition!.name);
    const [weightPosition, setWeightPosition] = useState(curretPosition!.weight);
    const [descriptionPosition, setDescriptionPosition] = useState(curretPosition!.description);
    const [pricePosition, setPricePosition] = useState(curretPosition!.price);
    

    function patchPos (evt: any) {
        navigate(-1)
        evt.preventDefault();
        dispatch(patchPosition({name: namePosition, weight: weightPosition, description: descriptionPosition, price: pricePosition, id: curretPosition!.id}))
    }

    return (
        <form className={styles.container} noValidate={false}>
            <label className={styles.labelContainer}>
                название позиции
                <input className={styles.input} placeholder="наименование" required={true} minLength={3} value={namePosition} onChange={(e) => { setNamePosition(e.target.value) }} />
            </label>

            <label className={styles.labelContainer}>
                описание позиции
                <input className={styles.input} placeholder="описание" required={true} minLength={3} value={descriptionPosition} onChange={(e) => { setDescriptionPosition(e.target.value) }} />
            </label>

            <label className={styles.labelContainer}>
                вес
                <input className={styles.input} placeholder="1 позиции" value={weightPosition} onChange={(e) => { setWeightPosition(e.target.value) }} />
            </label>

            <label className={styles.labelContainer}>
                Цена 1 позиции
                <input className={styles.input} defaultValue={0} type="number" required={true} value={pricePosition} onChange={(e) => { setPricePosition(Number(e.target.value)) }} />
            </label>
            <button className={styles.submitButton} type='submit' onClick={e => patchPos(e)}>Добавить</button>
        </form>
    )
}

export default PatchPositionPopup