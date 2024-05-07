import React, { ReactNode } from "react";
import styles from './Modal.module.css'
import ReactDOM from "react-dom";
import Overlay from "../Overlay/Overlay";

const modalRoot = document.getElementById('popup');

const Modal: React.FC<Props> = ({title, handleClose, children}) => {
    return ReactDOM.createPortal(
        <Overlay>
            <div className={styles.popup}>
                <div className={styles.container}>
                    <h1 className={styles.header}>{title}</h1>
                    <button onClick={handleClose} className={styles.closeButton}>+</button>
                </div>
                {children}
            </div>
        </Overlay>, modalRoot as HTMLDivElement
    )
}

type Props = {
    title?: string;
    handleClose: () => void;
    children?: ReactNode;
}

export default Modal