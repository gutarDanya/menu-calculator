import React, { useState } from "react";
import styles from './AddSectionPopup.module.css'
import { v4 as uuid4 } from "uuid";
import { useAppDispatch } from "../../services/store";
import { addSectionToStorage } from "../../services/Slices/MenuSlices";

const AddSectionPopup = () => {
    const dispatch = useAppDispatch();
    const [dataSection, setDataMenu] = useState({name: ""})

    function addSection (evt: any) {
        evt.preventDefault()
        dispatch(addSectionToStorage({...dataSection, id: uuid4()}))
    }

    return (
        <div className="popupContainer">
            <input type="text" className="input" placeholder="название секции" value={dataSection.name} onChange={(e) => {setDataMenu({...dataSection, name: e.target.value})}}/>
            <button className={"button"} type="submit" onClick={addSection}>Добавить</button>
        </div>
    )
}

export default AddSectionPopup