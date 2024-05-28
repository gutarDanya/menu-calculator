import React, { useState } from "react";
import styles from './Shirm.module.css';
import { NavLink, useNavigate, Link } from "react-router-dom";
import { deleteCookie, getCookie } from "../../Utils/Cookie";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { closeShirm, switchShirm } from "../../services/Slices/MenuSlices";

const Shirm = () => {
    const dispatch = useAppDispatch();
    const menus = useAppSelector(state => state.MenuSlices.menu);
    const navigate = useNavigate();
    const handleLogin = () => {
        if (getCookie("logined") != "logined") {
        navigate('/menu-calculator/login')
        } else {
            deleteCookie("logined")
        }
    }

    function swithShirm () {
        dispatch(switchShirm())
    }
    
    function handleClosePopup () {
        dispatch(closeShirm())
    }

    const shirmOpened = useAppSelector(state => state.MenuSlices.shirmOpened);

    return (
        <div className={shirmOpened ? styles.containerOpened : styles.containerClosed}>
            <div className={styles.shirmContainer}>
                <nav className={styles.navContainer}>
                    {menus && menus.length > 0 && menus.map((menu) => {
                        return <NavLink onClick={handleClosePopup} className={({ isActive }) => isActive ? styles.activeLink : styles.inactiveLink} to={`/menu-calculator/${menu.routing}`}>{menu.nameMenu}</NavLink>
                    })}
                    {getCookie("logined") == "logined" ? <NavLink onClick={handleClosePopup} className={({ isActive }) => isActive ? styles.activeLink : styles.inactiveLink} to={'/menu-calculator/orders'}>Заказы</NavLink> : null}
                </nav>
                {getCookie("logined") == "logined" ? <Link onClick={handleClosePopup} to="menu-calculator/settings" className={styles.settingsButton}>Настройки</Link> : null}
                <button className={styles.autohorization} onClick={handleLogin}>{getCookie("logined") == "logined" ? "выйти" : "войти"}</button>
            </div>
            <button className={styles.switchShirm} onClick={swithShirm} type='button' >{shirmOpened ? '<' : '>'}</button>
        </div>
    )
}

export default Shirm