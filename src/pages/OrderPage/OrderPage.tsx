import React, { useEffect, useState } from "react";
import styles from './OrderPage.module.css';
import { useAppDispatch, useAppSelector } from "../../services/store";
import { decrement, deletePosFromOrder, increment } from "../../services/Slices/OrdersSlice";
import { TLocalMenu, TMenu, Torder, Tposition } from "../../Utils/Types";
import MenuContainer from "../../components/MenuContainer/MenuContainer";
import { jsPDF } from 'jspdf';
import '../../Utils/fonts/Roboto-Regular-normal'

const OrderPage = () => {

    const dispatch = useAppDispatch()

    const header = useAppSelector(state => state.OrdersSlice.currentOrder);


    const incrementPosition = async (pos: Tposition) => {
        await dispatch(increment(pos))
    }

    const decrementPosition = async (pos: Tposition) => {
        await dispatch(decrement(pos))
    }

    const order = useAppSelector(state => state.OrdersSlice.currentOrder);

    const totalPrice = order?.dishes.reduce((acc: any, item: TLocalMenu) => {
        return acc + item.sections.reduce((acc, menu) => {
            return acc + menu.positions.reduce((acc, pos) => {
                return acc + pos.price * pos.count
            }, 0)
        }, 0)
    }, 0)

    function createAndSavePdf() {
        var doc = new jsPDF();
        doc.setFont("Roboto-Regular")
        doc.text("снова попробую русский", 70, 30);
        doc.save("a4.pdf")
    }

    const removePositionFromOrder = (pos: Tposition) => {
        dispatch(deletePosFromOrder(pos))
    }

    return (
        order
            ? (<div className={styles.page}>
                <h1 className={styles.header}>Заказ: {order.name}</h1>
                <div className={styles.dishesContainer}>
                    {order.dishes && order.dishes.length > 0 && order.dishes.map((menu: any) => {
                        return <MenuContainer menu={menu} removedPos={true} incrementPos={incrementPosition} decrementPos={decrementPosition} handleClick={incrementPosition} removePosition={removePositionFromOrder} />
                    })}
                    <div className={styles.descriptions}>
                        <div className={styles.descriptionContainer}>
                            <h3 className={styles.secondHeader}>Описание 1</h3>
                            <p className={styles.description}>{order.description1}</p>
                        </div>
                        <div className={styles.descriptionContainer}>
                            <h3 className={styles.secondHeader}>Описание 2</h3>
                            <p className={styles.description}>{order.description2}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.info}>
                    <p className={styles.totalPrice}>итоговая цена: {totalPrice}</p>
                </div>
                <button type="button" onClick={createAndSavePdf}>Сохранить документ</button>
            </div>
            )
            : null
    )
}

export default OrderPage;