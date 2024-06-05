import React, { useEffect, useState } from "react";
import styles from './OrderPage.module.css';
import { useAppDispatch, useAppSelector } from "../../services/store";
import { decrement, deletePosFromOrder, getAllDishes, increment } from "../../services/Slices/OrdersSlice";
import { TLocalMenu, TMenu, Torder, Tposition } from "../../Utils/Types";
import MenuContainer from "../../components/MenuContainer/MenuContainer";
import { jsPDF } from 'jspdf';
import '../../Utils/fonts/Roboto-Regular-normal';
import logo from '../../Utils/images/logo.jpg'
import { useInput } from "../../Utils/hooks";

const OrderPage = () => {

    const dispatch = useAppDispatch();
    const incrementPosition = async (pos: Tposition) => {
        await dispatch(increment({pos}))
    }

    const decrementPosition = async (pos: Tposition) => {
        await dispatch(decrement(pos))
    }

    const allDishes: Array<Tposition> = useAppSelector(state => state.OrdersSlice.currentDishes).map((pos: Tposition) => {return pos.name.length > 55
        ? {...pos, name: `${pos.name.substring(0, 50)}...`}
        : pos
    });


    const order = useAppSelector(state => state.OrdersSlice.currentOrder);
    const namePdf = useInput(`${order.name} ${order.date}`, { isEmpty: true })
    const extraTextPdf = useInput(null, {})

    const totalPrice = allDishes.reduce((acc, item) => {
        console.log(item.name, acc, item.price, item.count)
        return acc + item.price * item.count!
    }, 0)



    function createAndSavePdf() {
        var doc = new jsPDF();
        doc.setFont("Roboto-Regular");
        doc.setFontSize(20);
        var img = new Image();
        img.src = logo;
        if (extraTextPdf.value !== null && extraTextPdf.value !== "") {
            doc.addImage(img, "jpg", 20, 0, 50, 50);
            doc.setFontSize(12)
            doc.text(extraTextPdf.value, 80, 15, { maxWidth: 100 })
        } else {
            doc.addImage(img, "jpg", 80, 0, 50, 50);
        }
        doc.text("все позиции:", 85, 50);
        doc.setFontSize(14);

        doc.text("ID", 10, 60);
        doc.text("наименование", 20, 60);
        doc.text("вес г/мл", 123, 60);
        doc.text("Цена", 148, 60);
        doc.text("Кол", 162, 60);
        doc.text("стоим", 175, 60);
        doc.text("__________________________________________________________________________________", 9, 61);
        doc.setFontSize(12);
        for (let i = 0; i < allDishes.length; i++) {
            if (i === 37) {
                doc.text("1/2", 185, 290)
                doc.addPage()
            }
            if (i < 37) {
                doc.text(JSON.stringify(i + 1), 10, 66 + 6 * i);
                doc.setFontSize(10)
                doc.text(allDishes[i].name.toLowerCase(), 16, 66 + 6 * i);
                doc.text(JSON.stringify(allDishes[i].weight), 123, 66 + 6 *i);
                doc.setFontSize(12);
                doc.text(JSON.stringify(allDishes[i].price), 147, 66 + 6 * i);
                doc.text(JSON.stringify(allDishes[i].count), 162, 66 + 6 * i);
                doc.text(JSON.stringify(allDishes[i].price * allDishes[i].count), 172, 66 + 6 * i);
                doc.text("_______________________________________________________________________________________________", 9, 67 + 6 * i);
                doc.setFontSize(19);
                doc.text("|   |                                                               |             |         |     |          |", 8, 66 + 6 * i);
                doc.setFontSize(12);
            } else {
                // doc.text(`${allDishes[i].name}    ${JSON.stringify(allDishes[i].price)} * ${JSON.stringify(allDishes[i].count)} = ${JSON.stringify(allDishes[i].price * allDishes[i].count)}`, 25, 15 + 4 * (i - 50))
                doc.text(JSON.stringify(i + 1), 10, 15 + 6 * (i - 37));
                doc.setFontSize(10)
                doc.text(allDishes[i].name.toLowerCase(), 16, 15 + 6 * (i - 37));
                doc.text(JSON.stringify(allDishes[i].weight), 123, 15 + 6 * (i - 37));
                doc.setFontSize(12)
                doc.text(JSON.stringify(allDishes[i].price), 147, 15 + 6 * (i - 37));
                doc.text(JSON.stringify(allDishes[i].count), 162, 15 + 6 * (i - 37));
                doc.text(JSON.stringify(allDishes[i].price * allDishes[i].count), 172, 15 + 6 * (i - 37));
                doc.text("_______________________________________________________________________________________________", 9, 16 + 6 * (i - 37));
                doc.setFontSize(19);
                doc.text("|   |                                                               |             |         |     |          |", 8, 15 + 6 * (i - 37));
                doc.setFontSize(12);
            }
        }
        doc.setFontSize(20);
        if (allDishes.length > 37) {
            doc.text(`Итого: ${JSON.stringify(totalPrice)}`, 120, 35 + 6 * (allDishes.length - 37));
        } else {
            doc.text(`Итого: ${JSON.stringify(totalPrice)}`, 120, 80 + 6 * allDishes.length)
        }
        doc.setFontSize(12)
        doc.text("Исполнитель________", 10, 275);
        doc.text("Заказчик________", 130, 275);
        if (allDishes.length > 49) {
            doc.setFontSize(9)
            doc.text("2/2", 185, 290)
        }
        doc.save(`${namePdf.value}.pdf`)
    }

    const removePositionFromOrder = (pos: Tposition) => {
        dispatch(deletePosFromOrder(pos))
    }

    const manyPositions = (pos: Tposition, count: number) => {
        dispatch(increment({pos, count}))
    }

    return (
        order
            ? (<div className={styles.page}>
                <h1 className={styles.header}>Заказ: {order.name}</h1>
                <div className={styles.dishesContainer}>
                    {order.dishes && order.dishes.length > 0 && order.dishes.map((menu: TMenu) => {
                        return <MenuContainer menu={menu} removedPos={true} incrementPos={incrementPosition} decrementPos={decrementPosition} handleClick={incrementPosition} removePosition={removePositionFromOrder} manyPositions={manyPositions}/>
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
                <label>
                    <p className={styles.labelText}>Название пдф-файла</p>
                    <input className={styles.input} placeholder="Название документа" value={namePdf.value} onBlur={e => namePdf.onBlur(e)} onChange={e => namePdf.onChange(e)} />
                    {(namePdf.isDirty && namePdf.isEmpty) && <p className="errorText">Поле не должно быть пустым</p>}
                </label>
                <label>
                    <p className={styles.labelText}>Текст примечания</p>
                    <input className={styles.input} placeholder="текст примечания" value={extraTextPdf.value} onBlur={e => extraTextPdf.onBlur(e)} onChange={e => extraTextPdf.onChange(e)} />
                </label>
                <button type="button" className={styles.button} disabled={!namePdf.inputValid} onClick={createAndSavePdf}>Сохранить документ</button>
            </div>
            )
            : null
    )
}

export default OrderPage;