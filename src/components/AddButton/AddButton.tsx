import React from "react";
import styles from './AddButton.module.css';
import { useLocation, useNavigate } from "react-router-dom";

const AddButton: React.FC<Props> = ({routing, text}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const openPopup = (route: string) => {
        navigate(route, {state: {background: location}})
    }

    return (
        <button className={styles.container} type="button" onClick={() => {openPopup(routing)}}>
            <p className={styles.text}>{text}</p>
        </button>
    )
}

export default AddButton;

type Props = {
    routing: string,
    text: string
}