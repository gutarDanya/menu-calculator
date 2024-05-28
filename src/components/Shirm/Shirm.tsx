import React, { useState } from "react";
import styles from './Shirm.module.css';
import { NavLink, useNavigate, Link } from "react-router-dom";
import { deleteCookie, getCookie } from "../../Utils/Cookie";
import { useAppSelector } from "../../services/store";

const Shirm = () => {

    const menus = useAppSelector(state => state.MenuSlices.menu);

    const navigate = useNavigate();

    const handleLogin = () => {
        if (getCookie("logined") != "logined") {
        navigate('/menu-calculator/login')
        } else {
            deleteCookie("logined")
        }
    }


    const [shirmOpened, setShirmOpened] = useState(false);

    return (
        <div className={shirmOpened ? styles.containerOpened : styles.containerClosed}>
            <div className={styles.shirmContainer}>
                <nav className={styles.navContainer}>
                    {menus && menus.length > 0 && menus.map((menu) => {
                        return <NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.inactiveLink} to={`/menu-calculator/${menu.routing}`}>{menu.nameMenu}</NavLink>
                    })}
                    {getCookie("logined") == "logined" ? <NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.inactiveLink} to={'/menu-calculator/orders'}>Заказы</NavLink> : null}
                </nav>
                {getCookie("logined") == "logined" ? <Link to="menu-calculator/settings" className={styles.settingsButton}>Настройки</Link> : null}
                <button className={styles.autohorization} onClick={handleLogin}>{getCookie("logined") == "logined" ? "выйти" : "войти"}</button>
            </div>
            <button className={styles.switchShirm} onClick={() => { setShirmOpened(!shirmOpened) }} type='button' >{shirmOpened ? '<' : '>'}</button>
        </div>
    )
}

export default Shirm