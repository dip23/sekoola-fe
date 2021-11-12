import React from 'react';
import styles from './styles.module.css';

const Alert = ({ type, message, boldText }) => {
  const classes = [
    styles.root,
    type === 'success' && styles.success,
    type === 'warning' && styles.warning,
    type === 'danger' && styles.danger,
  ].join(' ');

  const combinedMessage = boldText ? (
    <div className={classes}>
      <b>{boldText}</b>&nbsp;{message}
    </div>
  ) : (
    <div className={classes}>{message}</div>
  );

  return combinedMessage;
};

export default Alert;
