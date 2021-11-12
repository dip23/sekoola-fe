import React, { useState } from 'react';
import {
  ContainerPages,
  PengaturanAfektif,
  PengaturanKognitif,
  PengaturanPsikomotorik,
} from '../../components/fragments';

export default function AturNilai() {
  const [selectedTab, setSelectedTab] = useState({ activeTab: 1 });

  const listItem = [
    { tabTitle: 'Kognitif' },
    { tabTitle: 'Afektif' },
    // { tabTitle: 'Psikomotorik' },
  ];

  const ChildComponent = () => {
    switch (selectedTab.activeTab) {
      case 1:
        return <PengaturanKognitif />;
      case 2:
        return <PengaturanAfektif />;
      case 3:
        return <PengaturanPsikomotorik />;

      default:
        return <PengaturanKognitif />;
    }
  };

  return (
    <div>
      <ContainerPages
        title={'Pengaturan Nilai'}
        listItem={listItem}
        setSelectedParentTab={setSelectedTab}
      >
        <ChildComponent />
      </ContainerPages>
    </div>
  );
}
