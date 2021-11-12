import React from 'react';
import styles from './styles.module.css';

import { Button } from '..';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Toast(props) {
  const { show, title, onClose } = props;

  if (!show) {
    return null;
  }

  return (
    <div className={styles.rootToast}>
      <div>
        <div>
          <p>{title}</p>
          <Button
            iconBtn={faTimes}
            smallBtn
            color={'blue'}
            className={styles.buttonClose}
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}
