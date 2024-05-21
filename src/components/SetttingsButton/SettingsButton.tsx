import React from "react";
import styles from './SettingsButton.module.css';
import { useNavigate } from "react-router-dom";
import trash from '../../Utils/images/Trash_font_awesome.svg.png'

const SettingsButton: React.FC<Props> = ({name, routing, hadnleClick, handleRemove}) => {
    const navigate = useNavigate();
    function openPage () {
        navigate(routing)
        hadnleClick()
    }

    function deleteSome () {
        handleRemove(routing)
    }

    return (
        <button className={styles.container} onClick={openPage}>
            <p className={styles.header}>{name}</p>
            <img src={trash} alt="корзина" className={styles.image} onClick={(e) => {e.stopPropagation();deleteSome()}}/>
        </button>
    )
}

export default SettingsButton

type Props = {
    name: string;
    routing: string;
    hadnleClick: any;
    handleRemove: any;
}