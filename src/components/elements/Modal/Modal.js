import React from 'react';
import styles from './styles.module.css';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '..';

export default function Modal(props) {
  const { children, className, onClose, show, smallModal, title } = props;

  const classes = [styles.rootModal, className].filter(Boolean).join(' ');
  const classHeader = [styles.modalHeader, smallModal && styles.centerHeader]
    .filter(Boolean)
    .join(' ');

  if (!show) {
    return null;
  }

  return (
    <div className={classes} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={classHeader}>
          <h4>{title}</h4>
          {!smallModal && (
            <Button
              iconBtn={faTimes}
              smallBtn={true}
              color={'blue'}
              className={styles.buttonClose}
              onClick={onClose}
            />
          )}
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
}
