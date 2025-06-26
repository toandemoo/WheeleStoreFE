import React from 'react';
import styles from './PopUp.module.css';

const Popup = ({ message, onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <p style={{ whiteSpace: 'pre-line' }}>{message}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
