import React, {ReactNode} from "react";
import styles from './Overlay.module.css';

const Overlay: React.FC<Props> = ({children, closePopup}) => {
    return(
        <div className={styles.container}
        onClick={closePopup}>
            {children}
        </div>
    )
}

type Props = {
    children?: ReactNode,
    closePopup: any;
}

export default Overlay