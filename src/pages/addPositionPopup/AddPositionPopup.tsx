import React from "react";
import styles from './AddPositionPopup.module.css';

const AddPositionPopup = () => {

    function addPosition (evt: any) {
        evt.perventDefault();
    }
    return (
        <form className={styles.container}>
            <input className={styles.input} placeholder="наименование"/>
            <input className={styles.input} placeholder="вес/объём 1 позиции"/>
            <input className={styles.input} placeholder="колличество" type="number"/>
            <button className={styles.submitButton} type='submit' onClick={e => addPosition(e)}>Добавить</button>
        </form>
    )
}

export default AddPositionPopup;