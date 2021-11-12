import React from 'react'
import { ContainerPages } from '../../components/fragments'

export default function DaftarKelas() {

  const listItem = [
    { tabTitle: 'Matematika' },
    { tabTitle: 'IPA' },
    { tabTitle: 'Sejarah' },
  ];

  return (
    <div>
      <ContainerPages
        title="Kelas"
        listView
        ListItem={listItem}
      />
    </div>
  )
}
