import React, { useState } from "react";
import styles from './ShifrPopup.module.css';
import { useAppSelector } from "../../services/store";
import copy from '../../Utils/images/copy.svg'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const ShifrPopup = () => {
  const [textOpened, setTextOpened] = useState(false)
  const stirngOfOrder = useAppSelector(state => state.MenuSlices.stringOfOrder);

  function copyToClipboard() {
    setTextOpened(true)
  }


  return (
    <div className={styles.cipherContainer}>
      <div className={styles.container}>
        <input className={styles.cipher} value={stirngOfOrder} />
        <CopyToClipboard text={stirngOfOrder} onCopy={copyToClipboard}>
          <img src={copy} className={textOpened ? styles.copyButtonClicked : styles.copyIcon} />
        </CopyToClipboard>
      </div>
      {textOpened
       ? <p className={styles.text}>строка скопирована, отправьте её адимнистратору</p>
        : <p className={styles.text}>скопируйте содержимое строки и отправьте администратору</p>}
    </div>
  )
}

export default ShifrPopup;