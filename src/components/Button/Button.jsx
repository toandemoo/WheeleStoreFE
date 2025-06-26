import styles from './Button.module.css';

function Button({ text, handler }) {
  return (
    <button className={styles.button} onClick={handler}>
      {text}
    </button>
  );
}

export default Button;
