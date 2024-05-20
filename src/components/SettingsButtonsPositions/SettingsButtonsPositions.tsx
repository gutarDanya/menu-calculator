import React from "react";
import styles from './SettingsButtonsPositions.module.css';
import { useAppDispatch, useAppSelector } from "../../services/store";
import SettingsButton from "../SetttingsButton/SettingsButton";
import { getSelectedPosition } from "../../services/Slices/MenuSlices";
import AddButton from "../AddButton/AddButton";

const SettingsButtonsPositions = () => {
    const dispatch = useAppDispatch();

    const section = useAppSelector(state => state.MenuSlices.currentSection);

    function handleClick(id: string) {
        dispatch(getSelectedPosition(id))
    }


    return (
        <div className={styles.container}>
            {section?.positions && section.positions.length > 0 && section.positions.map((position) => {
                return <SettingsButton name={position.name} routing={JSON.stringify(position.id)} hadnleClick={() => { handleClick(JSON.stringify(section.id)) }} />
            })}
            <AddButton text="добавить позицию" routing="add-position"/>
        </div>)

}

export default SettingsButtonsPositions