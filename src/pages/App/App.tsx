import React from 'react';
import '../../App.css';
import MenuPage from '../MenuPage/MenuPage';
import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css'
import Shirm from '../../components/Shirm/Shirm';

function App() {
  return (
    <div className={styles.root}>
      <Shirm />
      <main className={styles.main}>
        <Routes>
          <Route path='/' element={<MenuPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
