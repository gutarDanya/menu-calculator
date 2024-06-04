import React from "react";
import styles from './MenuContainer.module.css';
import DishTypeContainer from "../DishTypeContainer/DishTypeContainer";
import Dish from "../Dish/Dish";
import { TLocalMenu, TMenu, Tposition } from "../../Utils/Types";

const MenuContainer: React.FC<Props> = ({menu, removedPos, handleClick, decrementPos, incrementPos, removePosition, manyPositions}) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.menuHeader}>{menu.nameMenu}</h2>
            {menu.menu && menu.menu.length > 0 && menu.menu.map((sections) => {
                return <DishTypeContainer title={sections.name}>
                    {sections.positions && sections.positions.length > 0 && sections.positions.map((position: Tposition) => {
                        return <Dish dish={position} removedPos={removedPos} handleClick={handleClick} incrementPosition={incrementPos} decrementPosition={decrementPos} removePosition={removePosition} manyPositions={manyPositions}/>
                    })}
                </DishTypeContainer>
            })}
        </div>
    )
}

export default MenuContainer

type Props = {
    menu: TMenu;
    removedPos: boolean;
    handleClick: any;
    decrementPos: any;
    incrementPos: any;
    removePosition: any;
    manyPositions: any
}