import React, { useEffect, useState } from "react";
import styles from './AddSectionPopup.module.css'
import { v4 as uuid4 } from "uuid";
import { useAppDispatch } from "../../services/store";
import { addPositionToStorage } from "../../services/Slices/MenuSlices";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../Utils/hooks";

const AddPositionToStoragePopup = () => {

    const dispatch = useAppDispatch();

    const namePosition = useInput("", {isEmpty: true});
    const description = useInput("", {});
    const price = useInput("", {isEmpty: true, isNumber: true});
    const weigth = useInput("", {isEmpty: true});

    function addPosition(evt: any) {
        evt.preventDefault();
        dispatch(addPositionToStorage({name: namePosition.value, description: description.value, price: Number(price.value), weigth: weigth.value, id: uuid4()}))
    }

    return (
        <div className="popupContainer">
            <input type="text" className="input" required minLength={4} placeholder="название позиции" onBlur={e => namePosition.onBlur(e)} value={namePosition.value} onChange={e => namePosition.onChange(e)}/>
            {(namePosition.isDirty && namePosition.isEmpty) && <p className="errorText">Поле не должно быть пустым</p>}
            <input type="text" className="input" placeholder="описание позиции" onBlur={e => description.onBlur(e)} value={description.value} onChange={e => description.onChange(e)}/>
            <input type="number" className="input" placeholder="Цена" onBlur={e => price.onBlur(e)} value={price.value} onChange={e => price.onChange(e)}/>
            {(price.isDirty && price.isEmpty) && <p className="errorText">Поле не должно быть пустым</p>}
            {(price.isNumberError && price.isDirty) && <p className="errorText">Введите цену числом</p>}
            <input type="text" className="input" placeholder="вес" onBlur={e => weigth.onBlur(e)} value={weigth.value} onChange={e => weigth.onChange(e)}/>
            {(weigth.isDirty && weigth.isEmpty) && <p className="errorText">Поле не должно быть пустым</p>}
            <button className={namePosition.inputValid  && price.inputValid && weigth.inputValid ? "button" : "buttonDisabled"} disabled={!namePosition.inputValid  || !price.inputValid || !weigth.inputValid} onClick={(e) => {addPosition(e)}}>Добавить</button>
        </div>
    )
}

export default AddPositionToStoragePopup