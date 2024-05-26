import React, { ReactNode, useEffect } from "react";
import styles from './Modal.module.css'
import ReactDOM from "react-dom";
import Overlay from "../Overlay/Overlay";
import close from '../../Utils/images/close.png';

const modalRoot = document.getElementById('popup');

const Modal: React.FC<Props> = ({title, handleClose, children}) => {

    function closePopupByKey(evt: KeyboardEvent) {
        if (evt.key === 'Escape') {
            handleClose()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', closePopupByKey)

        return () => {
            document.removeEventListener('keydown', closePopupByKey)
        }
    }, [])

    return ReactDOM.createPortal(
        <Overlay closePopup={handleClose}>
            <div className={styles.popup} onClick={e => e.stopPropagation()}>
                <div className={styles.container}>
                    <h1 className={styles.header}>{title}</h1>
                    <button onClick={handleClose} className={styles.closeButton}><img className={styles.icon} src={close} /></button>
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