import React, { useState } from "react";
import styles from './addMenuPopup.module.css';
import { v4 as uuid4 } from "uuid";
import { useAppDispatch } from "../../services/store";
import { addMenuToStorage } from "../../services/Slices/MenuSlices";
import { useInput } from "../../Utils/hooks";
const AddMenuPopup = () => {
    const dispatch = useAppDispatch();

    const menuInput = useInput("", {isEmpty: true})

    function sendNewMenu(evt: any) {
        evt.preventDefault()
        dispatch(addMenuToStorage({name: menuInput.value, routing: uuid4()}))
    }

    return (
        <div className="popupContainer">
            <input type="text" className="input" placeholder="название меню" onBlur={e => menuInput.onBlur(e)} value={menuInput.value} onChange={e => menuInput.onChange(e)}/>
            {(menuInput.isDirty && menuInput.isEmpty) && <p className="errorText">Поле не должно быть пустым</p>}
            <button className={menuInput.inputValid ? "button" : "buttonDisabled"} type="submit" disabled={!menuInput.inputValid} onClick={(e) => {sendNewMenu(e)}}>Добавить</button>
        </div>
    )
}

export default AddMenuPopup