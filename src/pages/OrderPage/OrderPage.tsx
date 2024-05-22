import React, { useEffect, useState } from "react";
import styles from './OrderPage.module.css';
import { useAppDispatch, useAppSelector } from "../../services/store";
import { decrement, deletePosFromOrder, getAllDishes, increment } from "../../services/Slices/OrdersSlice";
import { TLocalMenu, TMenu, Torder, Tposition } from "../../Utils/Types";
import MenuContainer from "../../components/MenuContainer/MenuContainer";
import { jsPDF } from 'jspdf';
import '../../Utils/fonts/Roboto-Regular-normal';
import logo from '../../Utils/images/logo.jpg'

const OrderPage = () => {

    const dispatch = useAppDispatch()

    const incrementPosition = async (pos: Tposition) => {
        await dispatch(increment(pos))
    }

    const decrementPosition = async (pos: Tposition) => {
        await dispatch(decrement(pos))
    }

    const allDishes: Array<Tposition> = useAppSelector(state => state.OrdersSlice.currentDishes);

    const order = useAppSelector(state => state.OrdersSlice.currentOrder);

    const totalPrice = order?.dishes.reduce((acc: any, item: TLocalMenu) => {
        return acc + item.sections.reduce((acc, menu) => {
            return acc + menu.positions.reduce((acc, pos) => {
                return acc + pos.price * pos.count
            }, 0)
        }, 0)
    }, 0);


    function createAndSavePdf() {
        var doc = new jsPDF();
        doc.setFont("Roboto-Regular");
        doc.setFontSize(20);
        var img = new Image();
        img.src = logo;
        doc.addImage(img, "jpg", 80, 0, 50, 50);
        doc.text("все позиции:", 85, 50);
        doc.setFontSize(9);
        for (let i = 0; i < allDishes.length; i++) {
            doc.text(`${allDishes[i].name}    ${JSON.stringify(allDishes[i].price)} * ${JSON.stringify(allDishes[i].count)} = ${JSON.stringify(allDishes[i].price * allDishes[i].count)}`, 25, 60 + 4 * i);
        }
        doc.setFontSize(20);
        doc.text(`Итого: ${JSON.stringify(totalPrice)}`, 120, 70 + 4 * allDishes.length);
        doc.setFontSize(12)
        doc.text("Исполнитель________", 10, 290);
        doc.text("Заказчик________", 130, 290);
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