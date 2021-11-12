import React from 'react';
import styles from './styles.module.css';

import spinnerSvg from '../../../assets/spinner.svg';

const LoadingSpinner = (props) => {
  const { className } = props;

  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <img src={spinnerSvg} alt=" " />
    </div>
  );
};

export default LoadingSpinner;
