import React, { useEffect } from 'react';
import '../../App.css';
import MenuPage from '../MenuPage/MenuPage';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './App.module.css'
import Shirm from '../../components/Shirm/Shirm';
import Basket from '../Bascet/Basket';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getAllMenu } from '../../services/Slices/MenuSlices';
import { mainPositions } from '../../Utils/Data';
import OrdersPage from '../OrdersPage/OrdersPage';
import { getAllOrders } from '../../services/Slices/OrdersSlice';
import OrderPage from '../OrderPage/OrderPage';
import { checkSotrage } from '../../Utils/scripts';
import LoginPage from '../LoginPage/LoginPage';
import { getCookie } from '../../Utils/Cookie';
import Modal from '../../components/Modal/Modal';
import AddPositionPopup from '../addPositionPopup/AddPositionPopup';
import StartAppPage from '../StartAppPage/StartAppPage';
import ShifrPopup from '../ShifrPopup/ShifrPopup';
import SettingPage from '../SettingsPage/SettingsPage';

checkSotrage();

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const stirngOfOrder = useAppSelector(state => state.MenuSlices.stringOfOrder);

  const localOrders = localStorage.getItem("orders");
  const localMenu = localStorage.getItem("menu")

  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getAllOrders([]))
  }, [localOrders])

  const closePopup = () => {
    navigate(-1)
  }
  
  useEffect(() => {
    dispatch(getAllMenu(localMenu!));
  }, [])

  const orders = useAppSelector(state => state.OrdersSlice.orders);

  if (getCookie("logined") === "logined") {
    return (
      <div className={styles.root}>
        <Shirm />
        <main className={styles.main}>
          <Routes location={backgroundLocation || location}>
            <Route path='/:id' element={<MenuPage/>} />
            <Route path='/orders' element={<OrdersPage orders={orders} />} />
            <Route path="orders/:id" element={<OrderPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/bascket" element={<Basket />} />
            <Route path='/menu-calculator' element={<StartAppPage />} />
            <Route path="/settings" element={<SettingPage />} />
          </Routes>

          {backgroundLocation && <Routes>
            <Route path='basket/add-position' element={
              <Modal title='Добавить позицию' handleClose={closePopup}>
                <AddPositionPopup />
              </Modal>
            } />
          </Routes>}
        </main>
      </div>
    );
  } else {
    return (
      <div className={styles.root}>
        <Shirm />
        <main className={styles.main}>
          <Routes location={backgroundLocation || location}>
            <Route path='/' element={<MenuPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/bascket" element={<Basket />} />
            <Route path='/menu-calculator' element={<StartAppPage />} />
            <Route path="/settings" element={<SettingPage />} />
          </Routes>

          {backgroundLocation && <Routes>
            <Route path="/basket/shifr" element={<Modal title='строка заказа' handleClose={closePopup}>
              <ShifrPopup />
            </Modal>} />

            <Route path='basket/add-position' element={
              <Modal title='Добавить позицию' handleClose={closePopup}>
                <AddPositionPopup />
              </Modal>
            } />
          </Routes>}
        </main>
      </div>
    );
  }
}

export default App;
