import styles from './Modal.module.css';

export default function ModalWrapper({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay} >
      <div className={styles.modalContent}>
        <div className={styles.bin}
          onClick={onClose}
        >
          <img src="/assets/images/exit.png" alt="delete"/>
        </div>
        {children}
      </div>
    </div>
  );
}
