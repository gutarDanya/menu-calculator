import React, { useState } from "react";
import styles from './ShifrPopup.module.css';
import { useAppSelector } from "../../services/store";
import copy from '../../Utils/images/copy.svg'

const ShifrPopup = () => {
  const [textOpened, setTextOpened] = useState(false)
  const stirngOfOrder = useAppSelector(state => state.MenuSlices.stringOfOrder);

  function copyToClipboard() {
    navigator.clipboard.writeText(stirngOfOrder)
    setTextOpened(true)
  }

  return (
    <div className={styles.cipherContainer}>
      <div className={styles.container}>
        <input className={styles.cipher} value={stirngOfOrder} />
        <button type="button" className={textOpened ? styles.copyButtonClicked : styles.copyButton} onClick={copyToClipboard}>
          <img src={copy} className={styles.copyIcon} />
        </button>
      </div>
      {textOpened ? <p className={styles.text}>Скопируйте эту и вставьте в сообщение администратору</p> : null}
    </div>
  )
}

export default ShifrPopup;