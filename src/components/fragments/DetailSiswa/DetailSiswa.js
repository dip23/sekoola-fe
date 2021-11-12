import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

import {
  faEdit,
  faShareAlt,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ContainerPages, ModalDelete, ModalEdit, Table } from '..';
import { Button, Modal } from '../../elements';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { studentPageApi } from '../../../configs';

export default function DetailSiswa() {

  const [data, setData] = useState([]);
  const { idTingkatan } = useParams();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalShare, setShowModalShare] = useState(false);
  const jwtToken = useSelector((state) => state.auth.userData.token);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const id = parseInt(searchParams.get('siswa'));

  useEffect(() => {
    const source = axios.CancelToken.source();

    const loadData = async () => {
      try {
        const response = await axios.get(`${studentPageApi}/${idTingkatan}`, {
          headers: {
            'Content-Type': 'application/json',
            auth: jwtToken,
          },
          cancelToken: source.token,
        });
        const dataResponse = response.data.content.students;
        setData(dataResponse);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('fetch aborted.');
        } else {
          console.log(error.message);
          console.log(error.res);
        }
      }
    };
    loadData();

    // Cancel request
    return () => source.cancel();
  }, [])

  // useEffect(() => {
  //   const detailSiswa = data && data.filter((data) => data.id === id);
  //   setdetailDataSiswa(detailSiswa)
  // }, [data])

  const detailSiswa = data && data.filter((data) => data.id === id);

  console.log(detailSiswa)

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
        <p>{`Data Kelas & Siswa > Kelas 1 A > ${detailSiswa[0]?.name}`}</p>
      </div>
      <div className={styles.header}>
        <div>
          <p>{(detailSiswa[0]?.name) || `Siswa`}</p>
          <p>NISN : {(detailSiswa[0]?.NISN) || `NISN`}</p>
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
