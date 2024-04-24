import React, { useState } from "react";
import styles from './Shirm.module.css';
import { NavLink } from "react-router-dom";

const Shirm = () => {

    const [shirmOpened, setShirmOpened] = useState(true);

    return (
        <div className={shirmOpened ? styles.containerOpened : styles.containerClosed}>
            <div className={styles.shirmContainer}>
                <nav className={styles.navContainer}>
                    <NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.inactiveLink} to={'/'}>Меню</NavLink>
                    <NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.inactiveLink} to={'/orders'}>Заказы</NavLink>
                </nav>
            </div>
            <button className={styles.switchShirm} onClick={() => { setShirmOpened(!shirmOpened) }} type='button' >{shirmOpened ? '<' : '>'}</button>
        </div>
    )
}

export default Shirm