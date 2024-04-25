import React, {useEffect} from 'react';
import '../../App.css';
import MenuPage from '../MenuPage/MenuPage';
import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css'
import Shirm from '../../components/Shirm/Shirm';
import Basket from '../Bascet/Basket';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getAllMenu } from '../../services/Slices/MenuSlices';
import { positions } from '../../Utils/Data';
import OrdersPage from '../OrdersPage/OrdersPage';
import { getAllOrders } from '../../services/Slices/OrdersSlice';
import OrderPage from '../OrderPage/OrderPage';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllMenu(positions))
    dispatch(getAllOrders(positions))
  }, [])

  return (
    <div className={styles.root}>
      <Shirm />
      <main className={styles.main}>
        <Routes>
          <Route path='/' element={<MenuPage />} />
          <Route path='/orders' element={<OrdersPage />} />
          <Route path="orders/:id" element={<OrderPage />} />
          <Route path="/bascket" element={<Basket/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
