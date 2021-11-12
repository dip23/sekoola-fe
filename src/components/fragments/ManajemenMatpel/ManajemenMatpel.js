import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { baseCourseApi } from '../../../configs/api/endpoints';

import { Alert, Button } from '../../elements';
import { FlatInputDropdown, FlatInputText } from '../../fields';
import { clearMessage, timedMessage } from '../../../actions';

function ManajemenMatpel() {
  const jwtToken = useSelector((state) => state.auth.userData.token);
  const message = useSelector((state) => state.alert.message);
  const dataTingkatan = useSelector((state) => state.tingkatan.tingkatanData);
  const dispatch = useDispatch();

  const [tingkatanId, setTingkatanId] = useState(null);
  const [nama, setNama] = useState(null);
  const [postLoading, setPostLoading] = useState(false);

  // Temp Data, kalo ada API, dihapus
  // const tingkatanKelas = [
  //   { id: 1, nama: 'Kelas 1' },
  //   { id: 2, nama: 'Kelas 2' },
  //   { id: 3, nama: 'Kelas 3' },
  //   { id: 4, nama: 'Kelas 4' },
  //   { id: 5, nama: 'Kelas 5' },
  //   { id: 6, nama: 'Kelas 6' },
  // ];
  // End of Temp Data

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataForm = {
      name: nama,
      gradeId: parseInt(tingkatanId),
    };

    dataForm && setPostLoading(true);
    dataForm &&
      axios
        .post(baseCourseApi, JSON.stringify(dataForm), {
          headers: {
            'Content-Type': 'application/json',
            auth: jwtToken,
          },
        })
        .then((res) => {
          console.log('res', res);
          setPostLoading(false);
          dispatch(clearMessage());
          dispatch(timedMessage('success', 'Berhasil menambahkan data!'));
        })
        .catch((err) => {
          console.log(err.response);
          console.log(err.message);
          setPostLoading(false);
          dispatch(clearMessage());
          dispatch(timedMessage('danger', 'Gagal menambahkan data.'));
        });
  };

  useEffect(() => {
    dispatch(clearMessage());
    return () => {};
  }, []);

  return (
    <div className={styles.root}>
      {message && <Alert type={message.type} message={message.text} />}
      <form onSubmit={(e) => handleSubmit(e)}>
        <FlatInputDropdown
          name="tingkatan"
          label="Tingkatan"
          options={dataTingkatan}
          placeholder="Pilih Tingkatan"
          setParentOptionValue={setTingkatanId}
          required
        />
        <FlatInputText
          name="matpel"
          label="Nama Mata Pelajaran"
          type="text"
          setParentTextValue={setNama}
          placeholder="nama mata pelajaran"
          required
        />
        <Button
          type="submit"
          label="Tambah"
          color="yellow"
          smallBtn
          disabled={postLoading}
        />
      </form>
    </div>
  );
}

export default ManajemenMatpel;
