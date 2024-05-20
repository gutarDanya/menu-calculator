import React, { useState } from "react";
import styles from './AddSectionPopup.module.css'
import { v4 as uuid4 } from "uuid";
import { useAppDispatch } from "../../services/store";
import { addPositionToStorage } from "../../services/Slices/MenuSlices";

const AddPositionToStoragePopup = () => {
    const dispatch = useAppDispatch();
    const [dataSection, setDataMenu] = useState({name: "", description: "", price: 0, weigth: "", id: uuid4()})

    function addPosition(evt: any) {
        evt.preventDefault();
        dispatch(addPositionToStorage(dataSection))
    }

    return (
        <div className="popupContainer">
            <input type="text" className="input" placeholder="название позиции" value={dataSection.name} onChange={(e) => {setDataMenu({...dataSection, name: e.target.value})}}/>
            <input type="text" className="input" placeholder="описание позиции" value={dataSection.description} onChange={(e) => {setDataMenu({...dataSection, description: e.target.value})}}/>
            <input type="number" className="input" placeholder="Цена" value={dataSection.price} onChange={(e) => {setDataMenu({...dataSection, price: Number(e.target.value)})}}/>
            <input type="text" className="input" placeholder="вес" value={dataSection.weigth} onChange={(e) => {setDataMenu({...dataSection, weigth: e.target.value})}}/>
            <button className={"button"} onClick={(e) => {addPosition(e)}}>Добавить</button>
        </div>
    )
}

export default AddPositionToStoragePopup