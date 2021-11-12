import React from 'react';
import { ContainerPages } from '..';
import { Button } from '../../elements';
import { FlatInputDropdown, FlatInputText } from '../../fields';
import styles from './styles.module.css';

export default function TambahNilai() {
  const listKategori = [
    { id: 1, nama: 'UAS' },
    { id: 2, nama: 'UTS' },
    { id: 3, nama: 'Tugas' },
  ];

  const listMatpel = [
    { id: 1, nama: 'Matematika' },
    { id: 2, nama: 'Bahasa Inggris' },
    { id: 3, nama: 'Bahasa Indonesia' },
  ];

  return (
    <div className={styles.root}>
      <ContainerPages title="Tambah Penilaian">
        <form className={styles.form}>
          <FlatInputText
            name="date"
            type="date"
            label="Tanggal Penilaian"
            placeholder="Tanggal"
          />
          <FlatInputDropdown
            name="category"
            label="Kategori Penilaian"
            options={listKategori}
            placeholder="Pilih Kategori Nilai"
          />
          <FlatInputDropdown
            name="matpel"
            label="Mata Pelajaran"
            options={listMatpel}
            placeholder="Pilih Mata Pelajaran"
          />
          <FlatInputText
            name="scoreName"
            type="text"
            label="Nama Penilaian"
            placeholder="Masukkan Nama Penilaian"
          />
          <Button
            type="submit"
            label="Tambah"
            color="yellow"
            smallBtn
          />
        </form>
      </ContainerPages>
    </div>
  )
}
