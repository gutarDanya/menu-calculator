import React from "react";
import styles from './MenuContainer.module.css';
import DishTypeContainer from "../DishTypeContainer/DishTypeContainer";
import Dish from "../Dish/Dish";
import { TLocalMenu, TMenu, Tposition } from "../../Utils/Types";

const MenuContainer: React.FC<Props> = ({menu, removedPos, handleClick, decrementPos, incrementPos, removePosition}) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.menuHeader}>{menu.nameMenu}</h2>
            {menu.sections && menu.sections.length > 0 && menu.sections.map((sections) => {
                return <DishTypeContainer title={sections.name}>
                    {sections.positions && sections.positions.length > 0 && sections.positions.map((position: Tposition) => {
                        return <Dish dish={position} removedPos={removedPos} handleClick={handleClick} incrementPosition={incrementPos} decrementPosition={decrementPos} removePosition={removePosition}/>
                    })}
                </DishTypeContainer>
            })}
        </div>
    )
}

export default MenuContainer

type Props = {
    menu: TLocalMenu;
    removedPos: boolean;
    handleClick: any;
    decrementPos: any;
    incrementPos: any;
    removePosition: any
}