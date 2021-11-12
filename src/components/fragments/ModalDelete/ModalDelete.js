import React from 'react';
import styles from './styles.module.css';

import { Button, Modal } from '../../elements';

export default function ModalDelete(props) {
  // semua props wajib
  const { onClose, onConfirm, show, title, postLoading = false } = props;

  return (
    <Modal
      className={styles.modalDelete}
      smallModal
      title={title}
      onClose={postLoading === false ? onClose : null}
      show={show}
    >
      <div className={styles.containerButton}>
        <Button label="Ya" onClick={onConfirm} />
        <Button
          label="Tidak"
          onClick={postLoading === false ? onClose : null}
        />
      </div>
    </Modal>
  );
}
