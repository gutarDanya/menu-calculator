import React from "react";
import styles from './SettingsButtonSection.module.css'
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store";
import SettingsButton from "../SetttingsButton/SettingsButton";
import { getCurrentMenu, getCurrentSection, getSelectedPosition, removeSectionFromStorage } from "../../services/Slices/MenuSlices";
import AddButton from "../AddButton/AddButton";

const SettingsButtonsSection = () => {
    const dispatch = useAppDispatch();

    const sections = useAppSelector(state => state.MenuSlices.currentMenu);


    function handleClick(id: string) {
        dispatch(getCurrentSection(id))
    }

    function handleRemove (arg: string) {
        dispatch(removeSectionFromStorage(arg))
    }


    return (
        <div className={styles.container}>
            {sections?.menu && sections.menu.length > 0 && sections.menu.map((section) => {
                return <SettingsButton name={section.name} routing={section.id} handleRemove={handleRemove} hadnleClick={() => { handleClick(section.id) }} />
            })}
            <AddButton routing="add-section" text="добавить секцию"/>
        </div>)

}



export default SettingsButtonsSection