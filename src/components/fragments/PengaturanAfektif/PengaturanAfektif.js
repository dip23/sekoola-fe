import React, { useState } from 'react';
import styles from './styles.module.css';

import { Button } from '../../elements';
import { FlatDoubleInput, FlatInputText } from '../../fields';
import Table from '../Table/Table';

function PengaturanAfektif() {
  const [aspek, setAspek] = useState('');
  const [rentangA, setRentangA] = useState('');
  const [rentangB, setRentangB] = useState('');
  const [rentangC, setRentangC] = useState('');
  const [rentangD, setRentangD] = useState('');
  const [loading, setLoading] = useState(false);

  const column = [{ heading: 'Aspek', value: 'aspek' }];
  // Temp Data, kalo ada API, dihapus

  const dataAspek = [
    { id: '1', aspek: 'Religius' },
    { id: '2', aspek: 'Jujur' },
    { id: '3', aspek: 'Toleransi' },
    { id: '4', aspek: 'Disiplin' },
    { id: '5', aspek: 'Kerja Keras' },
    { id: '6', aspek: 'Kreatif' },
    { id: '7', aspek: 'Mandiri' },
    { id: '8', aspek: 'Demokratis' },
    { id: '9', aspek: 'Rasa Ingin Tahu' },
    { id: '10', aspek: 'Semangat Kebangsaan' },
    { id: '11', aspek: 'Cinta Tanah Air' },
  ];
  // End of Temp Data

  return (
    <div className={styles.root}>
      <div className={styles.leftSide}>
        <h2>Aspek Penilaian</h2>
        <form>
          <FlatInputText
            name="aspek"
            label="Aspek"
            type="text"
            setParentTextValue={setAspek}
            placeholder="nama aspek"
            required
          />
          <Button type="submit" label="Tambah" color="yellow" smallBtn />
        </form>
        <hr />
        <h2>Rentang Penilaian</h2>
        <form>
          <FlatDoubleInput
            name="rentang-a"
            label="A"
            type="text"
            setParentTextValue={setRentangA}
            required
          />
          <FlatDoubleInput
            name="rentang-b"
            label="B"
            type="text"
            setParentTextValue={setRentangB}
            required
          />
          <FlatDoubleInput
            name="rentang-c"
            label="C"
            type="text"
            setParentTextValue={setRentangC}
            required
          />
          <FlatDoubleInput
            name="rentang-d"
            label="D"
            type="text"
            setParentTextValue={setRentangD}
            required
          />
          <Button type="submit" label="Simpan" color="yellow" smallBtn />
        </form>
      </div>
      <div className={styles.rightSide}>
        <Table
          editable
          column={column}
          orderedHead={true}
          data={dataAspek}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default PengaturanAfektif;
