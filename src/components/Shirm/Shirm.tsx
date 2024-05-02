import React, { useState } from "react";
import styles from './Shirm.module.css';
import { NavLink, useNavigate } from "react-router-dom";
import { getCookie } from "../../Utils/Cookie";

const Shirm = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')
    }


    const [shirmOpened, setShirmOpened] = useState(true);

    return (
        <div className={shirmOpened ? styles.containerOpened : styles.containerClosed}>
            <div className={styles.shirmContainer}>
                <nav className={styles.navContainer}>
                    <NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.inactiveLink} to={'/'}>Меню</NavLink>
                    {getCookie("logined") == "logined" ? <NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.inactiveLink} to={'/orders'}>Заказы</NavLink> : null}
                </nav>
                <button className={styles.autohorization} onClick={handleLogin}>{getCookie("logined") == "logined" ? "выйти" : "войти"}</button>
            </div>
            <button className={styles.switchShirm} onClick={() => { setShirmOpened(!shirmOpened) }} type='button' >{shirmOpened ? '<' : '>'}</button>
        </div>
    )
}

export default Shirm