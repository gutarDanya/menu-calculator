import React, { useEffect, useState } from "react";
import styles from './AddPositionPopup.module.css';
import { useAppDispatch } from "../../services/store";
import { addExtraPosition } from "../../services/Slices/MenuSlices";
import { v4 as uuid4 } from "uuid";
import { useInput } from "../../Utils/hooks";

const AddPositionPopup = () => {
    const dispatch = useAppDispatch();

    const name = useInput("", {isEmpty: true})
    const weight = useInput("", {isEmpty: false})
    const count = useInput("", {isEmpty: true, isNumber: true})
    const price = useInput("", {isEmpty: true, isNumber: true})


    function addPosition(evt: any) {
        evt.preventDefault();
        dispatch(addExtraPosition({ name: name.value, weight: weight.value, count: Number(count.value), price: Number(price.value), id: uuid4() }))
    }

    return (
        <form className={styles.container} noValidate={false}>
            <label className={styles.labelContainer}>
                название позиции
                <input className={styles.input} name="name" placeholder="наименование" onBlur={e => name.onBlur(e)} value={name.value} onChange={e => name.onChange(e)} />
                {(name.isDirty && name.isEmpty) && <p className="errorText">Поле не должно быть пустым</p>}
            </label>

            <label className={styles.labelContainer}>
                вес
                <input className={styles.input} name="weigth" placeholder="1 позиции" onBlur={e => weight.onBlur(e)} value={weight.value} onChange={e => weight.onChange(e)} />
            </label>

            <label className={styles.labelContainer}>
                колличество
                <input className={styles.input} name="count" placeholder="количество/шт" onBlur={e => count.onBlur(e)} value={count.value} onChange={e => count.onChange(e)} />
                {(count.isDirty && count.isEmpty) && <p className="errorText" >Поле не должно быть пустым</p>}
                {(count.isDirty && count.isNumberError) && <p className="errorText">ведите колличество в цифрах</p>}
            </label>

            <label className={styles.labelContainer}>
                Цена 1 позиции
                <input className={styles.input} name="price" placeholder="цена/руб" onBlur={e => price.onBlur(e)} value={price.value} onChange={e => price.onChange(e)} />
                {(price.isDirty && price.isEmpty) && <p className="errorText">Поле не должно быть пустым</p>}
                {(price.isNumberError && price.isDirty) && <p className="errorText">ведите колличество в цифрах</p>}
            </label>
            <button className={styles.submitButton} type='submit' disabled={!name.inputValid || !count.inputValid || !price.inputValid} onClick={e => addPosition(e)}>Добавить</button>
        </form>
    )
}

export default AddPositionPopup;