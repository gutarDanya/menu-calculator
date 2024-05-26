import React from "react";
import styles from './SettingsButtonsPositions.module.css';
import { useAppDispatch, useAppSelector } from "../../services/store";
import SettingsButton from "../SetttingsButton/SettingsButton";
import { getcurentPosition, removePostionFromStorage } from "../../services/Slices/MenuSlices";
import AddButton from "../AddButton/AddButton";
import { useLocation, useNavigate } from "react-router-dom";

const SettingsButtonsPositions = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const location = useLocation();

    const section = useAppSelector(state => state.MenuSlices.currentSection);

    function handleClick(id: string) {
        dispatch(getcurentPosition(id))
        navigate('patch-position', {state: {background: location}})
    }

    function handleRemove (id: string) {
        dispatch(removePostionFromStorage(id))
    }


    return (
        <div className={styles.container}>
            {section?.positions && section.positions.length > 0 && section.positions.map((position) => {
                return <SettingsButton name={position.name} routing={""} handleRemove={() => {handleRemove(position.id)}} hadnleClick={() => { handleClick(position.id) }} thisPosition={true}/>
            })}
            <AddButton text="добавить позицию" routing="add-position"/>
        </div>)

}

export default SettingsButtonsPositions