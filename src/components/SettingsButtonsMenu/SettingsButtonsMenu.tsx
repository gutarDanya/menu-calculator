import React from "react";
import styles from './SettingsButtonsMenu.module.css';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store";
import SettingsButton from "../SetttingsButton/SettingsButton";
import { getCurrentMenu, removeMenuFromStorage } from "../../services/Slices/MenuSlices";
import AddButton from "../AddButton/AddButton";

const SettingsButtonsMenu = () => {
    const dispatch = useAppDispatch();

    const menus = useAppSelector(state => state.MenuSlices.menu);
    function handleClick(id: string) {
        dispatch(getCurrentMenu(id))
    }

    function removeMenu (routing: string) {
        dispatch(removeMenuFromStorage(routing))
    }

    return (
        <div className={styles.container}>
            {menus && menus.length > 0 && menus.map((menu) => {
                return <SettingsButton name={menu.nameMenu} routing={menu.routing} handleRemove={removeMenu} hadnleClick={() => {handleClick(menu.routing)}}/>
            })}
            <AddButton text="Добавить меню" routing="/menu-calculator/settings/add-menu"/>
        </div>
    )
}

export default SettingsButtonsMenu
