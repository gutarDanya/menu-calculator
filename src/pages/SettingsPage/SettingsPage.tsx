import React from "react";
import styles from "./SettingPage.module.css";
import { useAppSelector } from "../../services/store";
import { useNavigate } from "react-router-dom";

const SettingPage: React.FC<Props> = ({children}) => {
    return (
        <div className={styles.page}>
            <h1 className={styles.header}>Настройки</h1>
            <div className={styles.settingsContainer}>
                {children}
            </div>
        </div>
    )
}

type Props = {
    children: any
}

export default SettingPage;