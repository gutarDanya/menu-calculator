import React from "react";
import styles from './SettingsButton.module.css';
import { useNavigate } from "react-router-dom";

const SettingsButton: React.FC<Props> = ({name, routing, hadnleClick}) => {
    const navigate = useNavigate();
    function openPage () {
        navigate(routing)
        hadnleClick()
    }

    return (
        <button className={styles.container} onClick={openPage}>
            <p className={styles.header}>{name}</p>
        </button>
    )
}

export default SettingsButton

type Props = {
    name: string;
    routing: string;
    hadnleClick: any
}