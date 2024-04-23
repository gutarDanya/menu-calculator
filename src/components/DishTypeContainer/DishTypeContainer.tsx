import React from "react";
import styles from './DishTypeContainer.module.css';

const DishTypeContainer: React.FC<Props> =({title,children}) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.header}>{title}</h2>
            {children}
        </div>
    )
};

type Props = {
    title: string;
    children: any
}
export default DishTypeContainer;