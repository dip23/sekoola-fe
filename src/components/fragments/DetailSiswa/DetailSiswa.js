import React, { useState } from 'react';
import styles from './styles.module.css';

import {
  faEdit,
  faShareAlt,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ContainerPages, ModalDelete, ModalEdit, Table } from '..';
import { Button, Modal } from '../../elements';

export default function DetailSiswa(props) {
  const { data } = props;

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalShare, setShowModalShare] = useState(false);

  const column = [
    { heading: 'Mata Pelajaran', value: 'matpel' },
    { heading: 'Nilai Rata-rata', value: 'averageScore' },
  ];

  const dataDetailSiswa = [
    { id: 1, matpel: 'Matematika', averageScore: 90 },
    { id: 2, matpel: 'Bahasa Indonesia', averageScore: 80 },
    { id: 3, matpel: 'IPA', averageScore: 70 },
  ];

  const buttonHeader = [
    { icon: faEdit, value: 'edit' },
    { icon: faTrashAlt, value: 'delete' },
    { icon: faShareAlt, value: 'share' },
  ];

  const handleClick = (val) => {
    if (val.value === 'edit') {
      setShowModalEdit(true);
    } else if (val.value === 'delete') {
      setShowModalDelete(true);
    } else {
      setShowModalShare(true);
    }
  };

  return (
    <div className={styles.rootDetailSiswa}>
      <div className={styles.breadCrumb}>
        <p>{'Data Kelas & Siswa > Kelas 1 A > Difa Bagas'}</p>
      </div>
      <div className={styles.header}>
        <div>
          <p>{(data && data.name) || `Adipati Ma'ruf Alamsyah`}</p>
          <p>NISN : {(data && data.NISN) || `9983974127`}</p>
        </div>
        <div>
          {buttonHeader.map((i, idx) => (
            <Button
              className={styles.buttonHeader}
              color={'yellow'}
              key={idx}
              smallBtn={true}
              iconBtn={i.icon}
              onClick={() => handleClick(i)}
            />
          ))}
        </div>
      </div>
      <ContainerPages title={'Data Nilai Siswa'} className={styles.daftarNilai}>
        <div className={styles.rootDataNilaiSiswa}>
          <div />
          <Table column={column} data={dataDetailSiswa} />
        </div>
      </ContainerPages>
      <ModalEdit
        onClose={() => setShowModalEdit(false)}
        show={showModalEdit}
        title={'Ubah Data Siswa'}
      />
      <ModalDelete
        onClose={() => setShowModalDelete(false)}
        show={showModalDelete}
        title={'Hapus?'}
      />
      <Modal
        onClose={() => setShowModalShare(false)}
        show={showModalShare}
        title={'Modal Share'}
      >
        test Modal
      </Modal>
    </div>
  );
}
