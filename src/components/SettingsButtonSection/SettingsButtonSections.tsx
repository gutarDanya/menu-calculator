import React from "react";
import styles from './SettingsButtonSection.module.css'
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store";
import SettingsButton from "../SetttingsButton/SettingsButton";
import { getCurrentMenu, getCurrentSection, getSelectedPosition } from "../../services/Slices/MenuSlices";
import AddButton from "../AddButton/AddButton";

const SettingsButtonsSection = () => {
    const dispatch = useAppDispatch();

    const sections = useAppSelector(state => state.MenuSlices.currentMenu);

    console.log(sections)

    function handleClick(id: string) {
        dispatch(getCurrentSection(id))
        console.log(id)
    }


    return (
        <div className={styles.container}>
            {sections?.menu && sections.menu.length > 0 && sections.menu.map((section) => {
                return <SettingsButton name={section.name} routing={JSON.stringify(section.id)} hadnleClick={() => { handleClick(section.id) }} />
            })}
            <AddButton routing="add-section" text="добавить секцию"/>
        </div>)

}



export default SettingsButtonsSection