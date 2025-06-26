import styles from './NotFound.module.css';

export const NotFound = () => {
  return (
    <div className={styles.notfound}>
      <h1>Oopsssss!. We have not found anything matched your search.</h1>
      <img src='../../../assets/images/404.svg' alt='notfoud' />
    </div>
  );
};
