import React from 'react';
import styles from './styles.module.css';

import { Button, Modal } from '../../elements';
import { FlatInputCounter, InputField } from '../../fields';

export default function ModalAddKelas(props) {
  const { onClose, show, namaTingkat, onSubmit } = props;

  return (
    <Modal
      className={styles.modalKelas}
      title="Tambah Kelas"
      onClose={onClose}
      show={show}
    >
      <form onSubmit={(event) => onSubmit(event)}>
        <div>
          <InputField
            className={styles.inputModal}
            name="tingkatan"
            label="Tingkatan"
            value={namaTingkat}
            smallField
            disabled
          />
          {/* <FlatInputCounter
          className={styles.counterInput}
          label="Urutan"
          name="Urutan"
          setParentCounter={0}
          maxCounter={4}
          defaultValue={0}
        /> */}
          <InputField
            className={styles.inputModal}
            name="kelas"
            label="Nama Kelas"
            placeholder="cth. 1D"
            smallField
          />
        </div>
        <div className={styles.containerButton}>
          <Button smallBtn color="yellow" label="Simpan" />
        </div>
      </form>
    </Modal>
  );
}
