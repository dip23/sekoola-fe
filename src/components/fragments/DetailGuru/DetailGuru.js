import React, { useState } from 'react';
import styles from './styles.module.css';

import {
  faEdit,
  faShareAlt,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ContainerPages, ModalAddMatpel, ModalDelete, ModalEdit, TableV2 } from '..';
import { Button, Modal } from '../../elements';

export default function DetailGuru(props) {
  const { data } = props;

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalShare, setShowModalShare] = useState(false);
  const [showModalMatpel, setShowModalMatpel] = useState(false);

  const buttonHeader = [
    { icon: faEdit, value: 'edit' },
    { icon: faTrashAlt, value: 'delete' },
    { icon: faShareAlt, value: 'share' },
  ];

  const column = [
    { heading: 'Mata Pelajaran', value: 'matpel' },
    { heading: 'Tingkatan', value: 'tingkatan' },
    { heading: 'Kelas', value: 'kelas' },
  ];

  const dataMatpelGuru = [
    { id: '1', matpel: 'Matematika', tingkatan: 'Kelas 1', kelas: 'Kelas 1A' },
    { id: '2', matpel: 'Matematika', tingkatan: 'Kelas 1', kelas: 'Kelas 1B' },
    { id: '3', matpel: 'Matematika', tingkatan: 'Kelas 6', kelas: 'Kelas 6C' },
    {
      id: '4',
      matpel: 'Bahasa Indonesia',
      tingkatan: 'Kelas 3',
      kelas: 'Kelas 3B',
    },
    {
      id: '5',
      matpel: 'Ilmu Pengetahuan Sosial',
      tingkatan: 'Kelas 4',
      kelas: 'Kelas 4A',
    },
    {
      id: '6',
      matpel: 'Ilmu Pengetahuan Sosial',
      tingkatan: 'Kelas 4',
      kelas: 'Kelas 4B',
    },
    {
      id: '7',
      matpel: 'Ilmu Pengetahuan Sosial',
      tingkatan: 'Kelas 4',
      kelas: 'Kelas 4C',
    },
    {
      id: '8',
      matpel: 'Ilmu Pengetahuan Alam',
      tingkatan: 'Kelas 3',
      kelas: 'Kelas 3A',
    },
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
          <p>{data && data.name}</p>
          <p>{data && data.profile.nip}</p>
          <p>{data && data.email}</p>
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
      <ContainerPages
        btnEdit
        handleClick={() => setShowModalMatpel(true)}
        title={'Mata Pelajaran Diampu'}
        className={styles.daftarNilai}
      >
        <TableV2 column={column} data={dataMatpelGuru} />
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
      <ModalAddMatpel
        onClose={() => setShowModalMatpel(false)}
        show={showModalMatpel}
        placeholder={data && data.name}
      />
    </div>
  );
}
