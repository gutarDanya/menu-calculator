import React, { useState } from "react";
import styles from './AddSectionPopup.module.css'
import { v4 as uuid4 } from "uuid";
import { useAppDispatch } from "../../services/store";
import { addSectionToStorage } from "../../services/Slices/MenuSlices";
import { useInput } from "../../Utils/hooks";

const AddSectionPopup = () => {
    const dispatch = useAppDispatch();
    const inputSection = useInput("", {isEmpty: true})

    function addSection (evt: any) {
        evt.preventDefault()
        dispatch(addSectionToStorage({name: inputSection.value, id: uuid4()}))
    }

    return (
        <div className="popupContainer">
            <input type="text" className="input" placeholder="название секции" onBlur={e => inputSection.onBlur(e)} value={inputSection.value} onChange={e => inputSection.onChange(e)}/>
            {(inputSection.isDirty && inputSection.isEmpty) && <p className="errorText">Поле не должно быть пустым</p>}
            <button className={inputSection.inputValid ? "button" : "buttonDisabled"} type="submit" onClick={addSection}>Добавить</button>
        </div>
    )
}

export default AddSectionPopup