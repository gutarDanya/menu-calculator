import React, {ReactNode} from "react";
import styles from './Overlay.module.css';

const Overlay: React.FC<Props> = ({children}) => {
    return(
        <div className={styles.container}>
            {children}
        </div>
    )
}

type Props = {
    children?: ReactNode
}

export default Overlay