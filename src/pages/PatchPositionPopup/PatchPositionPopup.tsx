import React, { useState } from "react";
import styles from './PatchPositionPopup.module.css';
import { useAppDispatch, useAppSelector } from "../../services/store";
import { patchPosition } from "../../services/Slices/MenuSlices";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../Utils/hooks";

const PatchPositionPopup = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const curretPosition = useAppSelector(state => state.MenuSlices.position);

    const nameInput = useInput(curretPosition!.name, {isEmpty: true});
    const weightInput = useInput(curretPosition!.weight, {isEmpty: true});
    const descriptionInput = useInput(curretPosition!.description, {});
    const priceInput = useInput(curretPosition!.price, {isEmpty: true, isNumber: true})
    

    function patchPos (evt: any) {
        navigate(-1)
        evt.preventDefault();
        dispatch(patchPosition({name: nameInput.value, weight: weightInput.value, description: descriptionInput.value, price: Number(priceInput.value), id: curretPosition!.id}))
    }

    return (
        <form className={styles.container} noValidate={false}>
            <label className={styles.labelContainer}>
                название позиции
                <input className={styles.input} placeholder="наименование" onBlur={e => nameInput.onBlur(e)} value={nameInput.value} onChange={e => nameInput.onChange(e)} />
                {(nameInput.isDirty && nameInput.isEmpty) && <p className="errorText">Поле не должно быть пустым</p>}
            </label>

            <label className={styles.labelContainer}>
                описание позиции
                <input className={styles.input} placeholder="описание" onBlur={e => descriptionInput.onBlur(e)} value={descriptionInput.value} onChange={e => descriptionInput.onChange(e)} />
            </label>

            <label className={styles.labelContainer}>
                вес
                <input className={styles.input} placeholder="вес/г" onBlur={e => weightInput.onBlur(e)} value={weightInput.value} onChange={e => weightInput.onChange(e)} />
                {(weightInput.isDirty && weightInput.isEmpty) && <p className="errorText">Поле не должно быть пустым</p>}
            </label>

            <label className={styles.labelContainer}>
                Цена 1 позиции
                <input className={styles.input} placeholder="цена/руб" onBlur={e => priceInput.onBlur(e)} value={priceInput.value} onChange={e => priceInput.onChange(e)} />
                {(priceInput.isDirty && priceInput.isEmpty) && <p className="errorText">Поле не должно быть пустым</p>}
                {(priceInput.isNumberError && priceInput.isDirty) && <p className="errorText">Введите цену числом</p>}
            </label>
            <button className={nameInput.inputValid && weightInput.inputValid && priceInput.inputValid ? "button" : "buttonDisabled"} disabled={!nameInput.inputValid || !weightInput.inputValid || !priceInput.inputValid} type='submit' onClick={e => patchPos(e)}>Добавить</button>
        </form>
    )
}

export default PatchPositionPopup