import React, { useState } from 'react';
import {
  ContainerPages,
  ManajemenTingkatan,
  ManajemenKelas,
  ManajemenSiswa,
  ManajemenMatpel,
  ManajemenGuru,
} from '../../components/fragments';

export default function ManajemenData() {
  const [selectedTab, setSelectedTab] = useState({ activeTab: 1 });

  const listItem = [
    { tabTitle: 'Tingkatan' },
    { tabTitle: 'Kelas' },
    { tabTitle: 'Siswa' },
    { tabTitle: 'Mata Pelajaran' },
    { tabTitle: 'Guru' },
  ];

  const ChildComponent = () => {
    switch (selectedTab.activeTab) {
      case 1:
        return <ManajemenTingkatan />;
      case 2:
        return <ManajemenKelas />;
      case 3:
        return <ManajemenSiswa />;
      case 4:
        return <ManajemenMatpel />;
      case 5:
        return <ManajemenGuru />;

      default:
        return <ManajemenTingkatan />;
    }
  };

  return (
    <div>
      <ContainerPages
        title="Manajemen Database"
        listItem={listItem}
        setSelectedParentTab={setSelectedTab}
      >
        <ChildComponent />
      </ContainerPages>
    </div>
  );
}
