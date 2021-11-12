import React, { useState } from 'react';
import { ContainerPages, ModalDelete, ModalEdit, Table } from '..';
import styles from './styles.module.css';

export default function DetailNilai() {
  const [showModalEdit, setshowModalEdit] = useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [dataEdit, setdataEdit] = useState({});
  const [dataDelete, setdataDelete] = useState({});

  const handleClickEdit = (data) => {
    setshowModalEdit(true);
    setdataEdit(data);
  };

  const handelClickDelete = (data) => {
    setshowModalDelete(true);
    setdataDelete(data);
  };

  const editInputGroup = [
    { label: 'Nama', value: 'name' },
    { label: 'Nilai', value: 'nilai' },
  ];

  const column = [
    { heading: 'Nama Siswa', value: 'name' },
    { heading: 'Nilai', value: 'nilai' },
  ];

  const dataSiswa = [
    { id: '1', name: 'Difa Bagas Maulana', nilai: 90 },
    { id: '2', name: 'Nazmi M. Abkary', nilai: 90 },
    { id: '3', name: "Adipati Ma'ruf Alamsyah", nilai: 90 },
    { id: '4', name: 'Rep', nilai: 90 },
    { id: '5', name: 'Batari', nilai: 90 },
    { id: '6', name: 'Bagas', nilai: 90 },
    { id: '7', name: 'Putra', nilai: 90 },
    { id: '8', name: 'Maulana', nilai: 90 },
    { id: '9', name: 'Abkary', nilai: 90 },
    { id: '10', name: 'Firmansyah', nilai: 90 },
  ];

  return (
    <div className={styles.root}>
      <ContainerPages title="Tugas Pertambahan">
        <p className={styles.title}>Data & Analisis</p>
        <div className={styles.containerData}>
          <div>
            <div className={styles.twoRow}>
              <div>
                <p>Nilai Rata-rata</p>
                <p>85</p>
              </div>
              <div>
                <p>Siswa di bawah Rata-rata</p>
                <p>3</p>
              </div>
            </div>
            <div className={styles.twoRow}>
              <div>
                <p>Nilai Tertinggi</p>
                <p>100</p>
              </div>
              <div>
                <p>Nilai Terendah</p>
                <p>65</p>
              </div>
            </div>
          </div>
          <div>
            <Table
              column={column}
              editable
              data={dataSiswa}
              onClickEdit={(rowData) => handleClickEdit(rowData)}
              onClickDelete={(rowData) => handelClickDelete(rowData)}
            />
          </div>
        </div>
      </ContainerPages>
      <ModalEdit
        data={dataEdit}
        onClose={() => setshowModalEdit(false)}
        show={showModalEdit}
        title={'Ubah Data Siswa'}
        inputGroup={editInputGroup}
      />
      <ModalDelete
        data={dataDelete}
        onClose={() => setshowModalDelete(false)}
        show={showModalDelete}
        title={'Hapus?'}
      />
    </div>
  )
}
