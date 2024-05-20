import React, { useState } from "react";
import styles from './addMenuPopup.module.css';
import { v4 as uuid4 } from "uuid";
import { useAppDispatch } from "../../services/store";
import { addMenuToStorage } from "../../services/Slices/MenuSlices";
const AddMenuPopup = () => {
    const dispatch = useAppDispatch();
    const [dataMenu, setDataMenu] = useState({name: "", routing: uuid4()})

    function sendNewMenu(evt: any) {
        evt.preventDefault()
        dispatch(addMenuToStorage(dataMenu))
    }

    return (
        <div className="popupContainer">
            <input type="text" className="input" placeholder="название меню" value={dataMenu.name} onChange={(e) => {setDataMenu({...dataMenu, name: e.target.value})}}/>
            <button className={"button"} type="submit" onClick={(e) => {sendNewMenu(e)}}>Добавить</button>
        </div>
    )
}

export default AddMenuPopup