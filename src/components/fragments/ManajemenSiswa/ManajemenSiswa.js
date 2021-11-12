import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { baseClassApi, baseStudentApi } from '../../../configs';
import { clearMessage, timedMessage } from '../../../actions';

import csvFile from '../../../assets/files/student_template.csv';
import { Alert, Button } from '../../elements';
import { FileInputBlock, FlatInputDropdown } from '../../fields';
import { useDispatch, useSelector } from 'react-redux';

function ManajemenSiswa() {
  const dispatch = useDispatch();
  const dataTingkatan = useSelector((state) => state.tingkatan.tingkatanData);
  const jwtToken = useSelector((state) => state.auth.userData.token);
  const message = useSelector((state) => state.alert.message);

  const [listKelas, setListKelas] = useState([]);
  const [tingkatanId, setTingkatanId] = useState(null);
  const [kelasId, setKelasId] = useState(null);
  // const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
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

  // const listKelas = [
  //   { id: 1, nama: 'Kelas 1A' },
  //   { id: 2, nama: 'Kelas 1B' },
  //   { id: 3, nama: 'Kelas 1C' },
  // ];
  // End of Temp Data

  const handleSubmit = (e) => {
    e.preventDefault();

    setPostLoading(true);

    const dataForm = new FormData();
    dataForm.append('classId', parseInt(kelasId));
    dataForm.append('studentCsv', file);

    axios({
      method: 'POST',
      url: `${baseStudentApi}/mass`,
      data: dataForm,
      headers: {
        'Content-Type': 'multipart/form-data',
        auth: jwtToken,
      },
    })
      .then((res) => {
        console.log(res);
        setPostLoading(false);
        setTingkatanId('none');
        setKelasId('none');
        dispatch(clearMessage());
        dispatch(timedMessage('success', 'Data siswa berhasil ditambahkan!'));
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err.response);
        console.log(err);
        setPostLoading(false);
        dispatch(clearMessage());
        if (err.message === 'Network Error')
          return dispatch(timedMessage('danger', err.message));
        dispatch(timedMessage('danger', 'Data siswa gagal ditambahkan!'));
      });
  };

  useEffect(() => {
    dispatch(clearMessage());
    // Axios Abort Controller
    const source = axios.CancelToken.source();

    const loadDataKelas = async () => {
      try {
        setLoading(true);
        setListKelas(null);
        const response = await axios.get(`${baseClassApi}/${tingkatanId}`, {
          headers: {
            'Content-Type': 'application/json',
            auth: jwtToken,
          },
          cancelToken: source.token,
        });
        const data = response.data.content.classes;
        setListKelas(data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('fetch aborted.');
        } else {
          console.log(error.message);
          console.log(error.res);
          setLoading(false);
        }
      }
    };
    if (tingkatanId) {
      loadDataKelas();
    }
    return () => source.cancel();
  }, [tingkatanId]);

  return (
    <div className={styles.root}>
      {message && <Alert type={message.type} message={message.text} />}
      {loading && !message && (
        <Alert type="warning" message="loading data..." />
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div className={styles.leftSide}>
            <FlatInputDropdown
              name="tingkatan"
              label="Tingkatan"
              options={dataTingkatan}
              placeholder="Pilih Tingkatan"
              setParentOptionValue={setTingkatanId}
              required
            />
            <FlatInputDropdown
              className={styles.secondInput}
              name="kelas"
              label="Kelas"
              options={listKelas}
              placeholder="Pilih Kelas"
              setParentOptionValue={setKelasId}
              disabled={listKelas ? false : true}
              required
            />
            <a download="" href={csvFile}>
              Unduh format file excel disini
            </a>
          </div>
          <div className={styles.rightSide}></div>
        </div>
        <div>
          <div className={styles.leftSide}>
            <FileInputBlock
              name="csvFile"
              title="Unggah Nama Siswa"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              // setParentFileName={setFileName}
              setParentFile={setFile}
              required
            />
            <Button
              type="submit"
              label="Unggah"
              smallBtn
              color="yellow"
              disabled={postLoading}
            />
          </div>
          <div className={styles.rightSide} />
        </div>
      </form>
    </div>
  );
}

export default ManajemenSiswa;
