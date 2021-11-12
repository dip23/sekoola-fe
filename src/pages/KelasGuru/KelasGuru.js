import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { FlatInputDropdown } from '../../components/fields';
import { ContainerPages, DetailNilai, TambahNilai } from '../../components/fragments';
import Table from '../../components/fragments/Table_V2/Table_V2';
import { routes } from '../../configs/routes';
import styles from './styles.module.css';

export default function KelasGuru() {
  const [selectedTab, setSelectedTab] = useState({ activeTab: 1 });
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const id = searchParams.get('matpel');

  const kelas = "Kelas 1A";
  const tabItem = [
    { tabTitle: 'Kognitif' },
  ];

  const ChildComponent = () => {

    switch (selectedTab.activeTab) {
      case 1:
        return <TableNilai />;
      default:
        return <TableNilai />;
    }
  };

  const handleClickAdd = () => {
    history.push(`${routes.KELAS_GURU()}/1?edit=true`)
  }

  if (location.search === `?matpel=${id}`) {
    return <DetailNilai />
  }

  if (location.search === `?edit=true`) {
    return <TambahNilai />
  }

  return (
    <div className={styles.root}>
      <ContainerPages
        title={kelas}
        listItem={tabItem}
        setSelectedParentTab={setSelectedTab}
        btnEdit
        handleClick={handleClickAdd}
      >
        <ChildComponent />
      </ContainerPages>
    </div>
  );
}

function TableNilai() {
  const [matpel, setMatpel] = useState(null);
  const history = useHistory();

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

  const handleSetDropdown = (data) => {
    setMatpel(data)
  };

  const handleClickDetail = (data) => {
    console.log(data)
    history.push(`${routes.KELAS_GURU()}/1?matpel=${data.id}`)
  };

  return (
    <>
      <FlatInputDropdown
        name="matpel"
        label="Mata Pelajaran"
        placeholder="Matematika"
        setParentOptionValue={handleSetDropdown}
      />
      <div className={styles.titleTable}>Daftar Nilai Keseluruhan </div>
      <Table
        column={column}
        data={dataMatpelGuru}
        detailClick
        handleClickDetail={handleClickDetail}
      />
    </>
  );
}
