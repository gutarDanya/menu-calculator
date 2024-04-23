import React, { useState } from "react";
import styles from './Shirm.module.css';
import { NavLink } from "react-router-dom";

const Shirm = () => {

    const [shirmOpened, setShirmOpened] = useState(true);

    return (
        <div className={shirmOpened ? styles.containerOpened : styles.containerClosed}>
            <div className={styles.shirmContainer}>
                <p className={styles.text}>ПИСЯ ПОПА</p>
            </div>
            <button className={styles.switchShirm} onClick={() => {setShirmOpened(!shirmOpened)}} type='button' >{shirmOpened ? '<' : '>'}</button>
        </div>
    )
}

export default Shirm