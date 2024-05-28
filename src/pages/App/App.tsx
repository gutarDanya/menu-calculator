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
import SettingsButtonsMenu from '../../components/SettingsButtonsMenu/SettingsButtonsMenu';
import SettingsButtonsSection from '../../components/SettingsButtonSection/SettingsButtonSections';
import SettingsButtonsPositions from '../../components/SettingsButtonsPositions/SettingsButtonsPositions';
import AddMenuPopup from '../AddMenuPopup/AddMenuPopup';
import AddSectionPopup from '../AddSectionPopup/AddSectionPopup';
import AddPositionToStoragePopup from '../AddPostionToStoragePopup/AddPostionToStoragePopup';
import PatchPositionPopup from '../PatchPositionPopup/PatchPositionPopup';

checkSotrage();

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const menu = useAppSelector(state => state.MenuSlices.menu);
  const orders = useAppSelector(state => state.OrdersSlice.orders);

  const localOrders = localStorage.getItem("orders");
  const localMenu = localStorage.getItem("menu")

  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getAllOrders(localOrders!))
  }, [])

  const closePopup = () => {
    navigate(-1)
  }

  useEffect(() => {
    dispatch(getAllMenu(localMenu!));
  }, [])

  if (getCookie("logined") === "logined") {
    return (
      <div className={styles.root}>
        <Shirm />
        <main className={styles.main}>
          <Routes location={backgroundLocation || location}>
            <Route path='/menu-calculator/:id' element={<MenuPage />} />
            <Route path='/menu-calculator/orders' element={<OrdersPage orders={orders} />} />
            <Route path="/menu-calculator/orders/:id" element={<OrderPage />} />
            <Route path="/menu-calculator/login" element={<LoginPage />} />
            <Route path="/menu-calculator/bascket" element={<Basket />} />
            <Route path='/menu-calculator' element={<StartAppPage />} />
            <Route path="/menu-calculator/settings" element={<SettingPage ><SettingsButtonsMenu /></SettingPage>} />
            <Route path='/menu-calculator/settings/:sectionId' element={<SettingPage><SettingsButtonsSection /></SettingPage>} />
            <Route path="/menu-calculator/settings/:sectionId/:id" element={<SettingPage><SettingsButtonsPositions /></SettingPage>} />
          </Routes>

          {backgroundLocation && <Routes>
            <Route path='/menu-calculator/basket/add-position' element={
              <Modal title='Добавить позицию' handleClose={closePopup}>
                <AddPositionPopup />
              </Modal>
            } />

            <Route path="/menu-calculator/settings/add-menu" element={
              <Modal title="новое меню" handleClose={closePopup}>
                <AddMenuPopup />
              </Modal>
            } />

            <Route path="/menu-calculator/settings/:sectionId/add-section" element={
              <Modal title="новая секция" handleClose={closePopup}>
                <AddSectionPopup />
              </Modal>
            } />

            <Route path="/menu-calculator/settings/:sectionId/:id/add-position" element={
              <Modal title="новая позиция" handleClose={closePopup}>
                <AddPositionToStoragePopup />
              </Modal>
            } />

            <Route path='/menu-calculator/settings/:sectionId/:id/patch-position' element={
              <Modal title="изменить позицию" handleClose={closePopup}>
                <PatchPositionPopup />
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
            <Route path='/menu-calculator/:id' element={<MenuPage />} />
            <Route path="/menu-calculator/login" element={<LoginPage />} />
            <Route path="/menu-calculator/bascket" element={<Basket />} />
            <Route path='/menu-calculator' element={<StartAppPage />} />
            <Route path="/menu-calculator/settings" element={<SettingPage ><SettingsButtonsMenu /></SettingPage>} />
            <Route path='/menu-calculator/settings/:sectionId' element={<SettingPage><SettingsButtonsSection /></SettingPage>} />
            <Route path="/menu-calculator/settings/:sectionId/:id" element={<SettingPage><SettingsButtonsPositions /></SettingPage>} />
          </Routes>

          {backgroundLocation && <Routes>
            <Route path="/menu-calculator/basket/shifr" element={<Modal title='строка заказа' handleClose={closePopup}>
              <ShifrPopup />
            </Modal>} />

            <Route path='/menu-calculator/basket/add-position' element={
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
