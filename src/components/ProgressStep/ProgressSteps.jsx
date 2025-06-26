import React from 'react';
import styles from './ProgressSteps.module.css';

function ProgressSteps({ steps, currentStep }) {
  return (
    <div className={styles.progressContainer}>
      {steps.map((label, index) => (
        <div
          key={index}
          className={`${styles.step} ${index <= currentStep ? styles.active : ''}`}
        >
          <div className={styles.circle}>{index + 1}</div>
          <div className={styles.label}>{label}</div>
        </div>
      ))}
    </div>
  );
}

export default ProgressSteps;
