import React from 'react';
import { Button, Modal } from '../../elements';
import { FlatInputDropdown, InputField, TimePickerInput } from '../../fields';
import styles from './styles.module.css';

export default function ModalAddMatpel(props) {
  const {
    placeholder,
    onClose,
    show,
    optionTingkatan,
    optionKelas,
    optionMatpel,
    optionHari
  } = props;

  return (
    <Modal
      className={styles.modalMatpel}
      title="Tambah Mata Pelajaran Guru"
      onClose={onClose}
      show={show}
    >
      <form className={styles.formMatpel}>
        <InputField
          className={styles.InputField}
          disabled
          label="Nama Guru"
          smallField
          placeholder={placeholder}
        />
        <div>
          <FlatInputDropdown
            className={styles.dropDown}
            label="Tingkatan"
            options={optionTingkatan}
            placeholder="Kelas 1"
          />
          <FlatInputDropdown
            className={styles.dropDown}
            label="Nama Kelas"
            options={optionKelas}
            placeholder="1A"
          />
        </div>
        <FlatInputDropdown
          className={styles.dropDown}
          label="Mata Pelajaran"
          options={optionMatpel}
          placeholder="1A"
        />
        <FlatInputDropdown
          className={styles.dropDown}
          label="Hari"
          options={optionHari}
          placeholder="Pilih Hari"
        />
        <TimePickerInput
          className={styles.timeInput}
          label="Waktu"
          name="waktu"
        />
        <div className={styles.containerButton}>
          <Button
            smallBtn
            type="submit"
            color="yellow"
            label="Tambah"
            onClick={onClose}
          />
        </div>
      </form>
    </Modal>
  )
}
