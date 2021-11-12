import React from 'react';
import { Button, Modal } from '../../elements';
import { FlatInputDropdown, InputField } from '../../fields';
import styles from './styles.module.css';

export default function ModalSiswa(props) {
  const { options, onClose, show, namaTingkat } = props;

  return (
    <Modal
      className={styles.modalSiswa}
      title="Tambah Siswa"
      onClose={onClose}
      show={show}
    >
      <form className={styles.formSiswa}>
        <div>
          <InputField
            className={styles.InputField}
            label="Tingkatan"
            smallField
            value={namaTingkat}
            disabled
          />
          <FlatInputDropdown
            className={styles.dropDownNama}
            label="Nama Kelas"
            options={options}
            placeholder=""
          />
        </div>
        <InputField
          className={styles.InputField}
          label="Nama"
          smallField
          placeholder="Nama"
        />
        <InputField
          className={styles.InputField}
          label="NISN"
          smallField
          placeholder="NISN"
        />
        <div className={styles.containerButton}>
          <Button
            smallBtn
            type="submit"
            color="yellow"
            label="Simpan"
            onClick={onClose}
          />
        </div>
      </form>
    </Modal>
  );
}
